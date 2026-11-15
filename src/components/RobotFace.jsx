import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Procedural Interactive 3D AI Agent Mascot ("Botty")
 * ‣ Based on procedural squircle geometry with tail-wagging vertex shader,
 *   smooth rim-lit gradient fragment shader, and blinking capsule eyes.
 * ‣ Compact size (~200px), responsive down to ~120px on mobile.
 * ‣ Fixed companion that flies smoothly alongside the cursor & scroll across sections.
 * ‣ pointer-events: none ensures ZERO obstruction or disturbance to any section.
 * ‣ Real-time 3D projected chat bubble with context-aware greetings and idle sleeping engine.
 */

// ==========================================
// 1. PROCEDURAL SHADERS
// ==========================================

const BOTTY_VERTEX = `
uniform float uTime;
varying vec3 vNormal;
varying float vHeight;
varying vec3 vViewDir;

void main() {
    vec3 pos = position;
    
    // Tail wagging animation (adjusted for the shorter tail)
    if (pos.y < -0.95) {
        float tailT = (abs(pos.y) - 0.95) / 0.6; 
        pos.x += sin(uTime * 5.0) * (tailT * tailT) * 0.12;
    }
    
    vNormal = normalize(normalMatrix * normalize(pos));
    vHeight = pos.y; 
    vec4 viewSpacePos = modelViewMatrix * vec4(pos, 1.0);
    vViewDir = normalize(-viewSpacePos.xyz);
    gl_Position = projectionMatrix * viewSpacePos;
}
`;

const BOTTY_FRAGMENT = `
uniform vec3 colorTop;
uniform vec3 colorBottom;
varying vec3 vNormal;
varying float vHeight;
varying vec3 vViewDir;

void main() {
    float h = clamp((vHeight + 1.15) / 2.3, 0.0, 1.0);
    vec3 col = mix(colorBottom, colorTop, smoothstep(0.15, 0.85, h));
    
    float rim = smoothstep(0.5, 1.0, 1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0));
    col += vec3(1.0) * rim * 0.45;
    
    gl_FragColor = vec4(col, 1.0);
}
`;

// ==========================================
// 2. PROCEDURAL BOTTY GEOMETRY GENERATOR
// ==========================================

const getBottyGeo = () => {
  const geo = new THREE.SphereGeometry(1, 128, 128);
  const pos = geo.attributes.position;
  const vec = new THREE.Vector3();
  const blend = 0.55;
  // Tail azimuth to the right side (from camera view)
  const tail_az = Math.PI / 2 - 0.65;
  const tail_el = Math.PI - 0.35;

  for (let i = 0; i < pos.count; i++) {
    vec.fromBufferAttribute(pos, i);
    let az = Math.atan2(vec.z, vec.x);
    let el = Math.acos(vec.y);

    // Make Squircle base
    let l4 = Math.pow(
      Math.pow(Math.abs(vec.x), 4) +
        Math.pow(Math.abs(vec.y), 4) +
        Math.pow(Math.abs(vec.z), 4),
      0.25
    );
    let r = 1.0 / (l4 * blend + 1.0 * (1.0 - blend));

    vec.multiplyScalar(r);
    vec.x *= 1.2;
    vec.y *= 1.05;
    vec.z *= 0.85;

    // Procedurally pull out the tail (shorter and pointing right)
    let dl = Math.sqrt(
      Math.pow((az - tail_az) * Math.sin(el) * 1.2, 2) +
        Math.pow(el - tail_el, 2)
    );
    if (dl < 0.5) {
      let t = 1.0 - dl / 0.5;
      let pull = Math.pow(t, 2.0) * 0.45;
      vec.x += pull * Math.cos(tail_az) * 1.5;
      vec.y -= pull * 1.0;
      vec.z += pull * Math.sin(tail_az) * 0.2;
    }

    pos.setXYZ(i, vec.x, vec.y, vec.z);
  }
  geo.computeVertexNormals();
  return geo;
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================

const RobotFace = () => {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const bubbleRef = useRef(null);
  const textNodeRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const mount = mountRef.current;
    if (!container || !mount) return;

    let width = mount.clientWidth || 200;
    let height = mount.clientHeight || 200;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(2, 5, 5);
    scene.add(dirLight);

    // 3. Mascot Group
    const petGroup = new THREE.Group();
    scene.add(petGroup);

    // Procedural Squircle Body
    const bodyGeo = getBottyGeo();
    const sharedUniforms = {
      colorTop: { value: new THREE.Color("#00E5FF") }, // Cyan top
      colorBottom: { value: new THREE.Color("#0066FF") }, // Vibrant blue base
      uTime: { value: 0.0 },
    };

    const bodyMat = new THREE.ShaderMaterial({
      vertexShader: BOTTY_VERTEX,
      fragmentShader: BOTTY_FRAGMENT,
      uniforms: sharedUniforms,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    petGroup.add(bodyMesh);

    // Face & Capsule Eyes
    const faceGroup = new THREE.Group();
    petGroup.add(faceGroup);

    const eyeGeo = new THREE.CapsuleGeometry(0.14, 0.38, 32, 32);
    const eyeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FFFFFF"),
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.35, 0.05, 0.82);
    leftEye.userData.origScaleY = 1.0;
    faceGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.35, 0.05, 0.82);
    rightEye.userData.origScaleY = 1.0;
    faceGroup.add(rightEye);

    const eyes = [leftEye, rightEye];

    // Subtle floating halo ring
    const haloGeo = new THREE.TorusGeometry(1.4, 0.015, 12, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.35,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2.3;
    petGroup.add(haloMesh);

    // -------------------------------------------------------------
    // FLIGHT & TRACKING ENGINE
    // -------------------------------------------------------------
    const flight = {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
      mouseX: window.innerWidth * 0.75,
      mouseY: window.innerHeight * 0.45,
      lastMouseTime: performance.now(),
      isMouseMoved: false,
    };

    // Calculate initial resting position in Hero
    const computeRestPosition = () => {
      const anchor = document.getElementById("hero-robot-anchor");
      const cWidth = mount.clientWidth || 200;
      const cHeight = mount.clientHeight || 200;

      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        return {
          x: rect.left + (rect.width - cWidth) / 2,
          y: rect.top + (rect.height - cHeight) / 2,
        };
      }
      return {
        x: window.innerWidth * 0.72 - cWidth / 2,
        y: window.innerHeight * 0.45 - cHeight / 2,
      };
    };

    const initialPos = computeRestPosition();
    flight.currentX = initialPos.x;
    flight.currentY = initialPos.y;
    flight.targetX = initialPos.x;
    flight.targetY = initialPos.y;

    const onPointerMove = (e) => {
      flight.isMouseMoved = true;
      flight.mouseX = e.clientX;
      flight.mouseY = e.clientY;
      flight.lastMouseTime = performance.now();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Responsive Canvas Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(mount);

    // Contextual speech messages based on active section
    const getContextualText = (scrollY) => {
      const vh = window.innerHeight;
      if (scrollY < vh * 0.6) return "Hi, I'm Vaibhav's AI bot! 👋";
      if (scrollY < vh * 1.6) return "Exploring Experience 💼";
      if (scrollY < vh * 2.6) return "Tech Stack & Skills ⚡";
      if (scrollY < vh * 3.6) return "Featured Projects 🚀";
      if (scrollY < vh * 4.6) return "Published Research 📄";
      return "Let's build together! 📬";
    };

    // -------------------------------------------------------------
    // ANIMATION LOOP (60 FPS)
    // -------------------------------------------------------------
    let animationFrameId;
    const tempV = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;
      const now = performance.now();
      const currentScroll = window.scrollY;

      const cWidth = mount.clientWidth || 200;
      const cHeight = mount.clientHeight || 200;

      // 1. Idle Detection & Sleeping Engine
      const isIdle = now - flight.lastMouseTime > 3200;

      // Update Chat Bubble Text
      if (textNodeRef.current) {
        const targetText = isIdle ? "Zzz... 💤" : getContextualText(currentScroll);
        if (textNodeRef.current.innerText !== targetText) {
          textNodeRef.current.innerText = targetText;
        }
      }

      // 2. Smooth Organic Blinking & Sleeping
      let targetScaleY = 1.0;
      if (isIdle) {
        targetScaleY = 0.1; // Sleeping slits
      } else {
        if (time % 4.2 < 0.15 || time % 7.2 > 7.05) {
          targetScaleY = 0.1; // Quick natural blink
        }
      }

      eyes.forEach((eye) => {
        if (eye.userData.origScaleY !== undefined) {
          eye.scale.y += (eye.userData.origScaleY * targetScaleY - eye.scale.y) * 0.2;
        }
      });

      // Update shader time for tail-wagging
      sharedUniforms.uTime.value = time;
      haloMesh.rotation.z = time * 0.6;

      // 3. Breathing Mechanics & Floating Levitation
      const wobbleSpeed = 2.0;
      const breathY = 1.0 + Math.sin(time * wobbleSpeed) * (isIdle ? 0.035 : 0.02);
      const breathXZ = 1.0 - Math.sin(time * wobbleSpeed) * (isIdle ? 0.02 : 0.01);
      petGroup.scale.set(breathXZ, breathY, breathXZ);

      const floatOffset = Math.sin(time * wobbleSpeed * 0.8) * 0.08;

      // 4. Companion Flight Across Sections
      const isMobile = window.innerWidth <= 768;
      const isInHero = currentScroll < window.innerHeight * 0.35 && !flight.isMouseMoved;

      if (isInHero) {
        // Resting position in the Hero section
        const rest = computeRestPosition();
        flight.targetX = rest.x;
        flight.targetY = rest.y;
      } else {
        if (isMobile) {
          // Compact floating position at right edge on mobile
          flight.targetX = window.innerWidth - cWidth - 8;
          flight.targetY = window.innerHeight * 0.65 - cHeight / 2;
        } else {
          // Floats alongside the cursor without covering reading content
          const offsetX = flight.mouseX > window.innerWidth / 2 ? -cWidth * 0.55 : cWidth * 0.55;
          const offsetY = -cHeight * 0.25;

          let desiredX = flight.mouseX - cWidth / 2 + offsetX;
          let desiredY = flight.mouseY - cHeight / 2 + offsetY;

          // Clamp safely to viewport
          desiredX = THREE.MathUtils.clamp(desiredX, 10, window.innerWidth - cWidth - 10);
          desiredY = THREE.MathUtils.clamp(desiredY, 10, window.innerHeight - cHeight - 10);

          flight.targetX = desiredX;
          flight.targetY = desiredY;
        }
      }

      // Smooth flight lerp
      flight.currentX += (flight.targetX - flight.currentX) * 0.06;
      flight.currentY += (flight.targetY - flight.currentY) * 0.06;

      container.style.transform = `translate3d(${flight.currentX.toFixed(2)}px, ${flight.currentY.toFixed(2)}px, 0)`;

      // 5. Look-at Gaze & Banking Physics
      const headCenterX = flight.currentX + cWidth / 2;
      const headCenterY = flight.currentY + cHeight / 2;

      let normMouseX = (flight.mouseX - headCenterX) / (window.innerWidth / 2);
      let normMouseY = -((flight.mouseY - headCenterY) / (window.innerHeight / 2));

      let targetRotY = normMouseX * 0.55;
      let targetRotX = -normMouseY * 0.38;

      if (isIdle) {
        targetRotY = Math.sin(time * 0.5) * 0.2;
        targetRotX = Math.cos(time * 0.4) * 0.1;
      }

      const velocityX = flight.targetX - flight.currentX;
      const targetRotZ = -velocityX * 0.0018; // Banks into turns

      petGroup.position.y = floatOffset;
      petGroup.rotation.y += (targetRotY - petGroup.rotation.y) * 0.1;
      petGroup.rotation.x += (targetRotX - petGroup.rotation.x) * 0.1;
      petGroup.rotation.z += (targetRotZ - petGroup.rotation.z) * 0.1;

      // 6. Project 3D Speech Bubble Position to 2D Screen
      if (bubbleRef.current) {
        tempV.copy(petGroup.position);
        tempV.x += 0.45;
        tempV.y += 1.35;
        tempV.project(camera);

        const px = (tempV.x * 0.5 + 0.5) * cWidth;
        const py = (tempV.y * -0.5 + 0.5) * cHeight;
        bubbleRef.current.style.transform = `translate3d(-50%, -100%, 0) translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0)`;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();

      petGroup.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
      haloGeo.dispose();
      haloMat.dispose();
      bodyGeo.dispose();
      bodyMat.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <aside
      ref={containerRef}
      className="flying-agent-viewport"
      aria-hidden="true"
    >
      <div ref={mountRef} className="flying-agent-mount">
        {/* Real-time 3D projected chat bubble */}
        <div ref={bubbleRef} className="mascot-chat-bubble-wrapper">
          <div className="mascot-chat-bubble">
            <span ref={textNodeRef}>Hi, I'm Vaibhav's AI bot! 👋</span>
            <div className="mascot-bubble-tail" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RobotFace;
