"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

/**
 * Props for the LiquidEtherBackground component
 */
interface LiquidEtherBackgroundProps {
  /** Mouse force multiplier (default: 6.0) */
  mouseForce?: number;
  /** Cursor size in pixels (default: 200) */
  cursorSize?: number;
  /** Fluid viscosity (default: 0.9) */
  viscosity?: number;
  /** Simulation resolution divisor (default: 4) */
  resolution?: number;
  /** Color palette for the fluid (default: orange/peach theme) */
  colors?: string[];
  /** Overall opacity (default: 0.55) */
  opacity?: number;
  /** Animation speed multiplier (default: 0.35) */
  speed?: number;
  /** Spatial scale (default: 1.2) */
  scale?: number;
  /** Enable auto-demo mode (default: true) */
  autoDemo?: boolean;
  /** Auto-demo force strength (default: 3.0) */
  autoDemoForce?: number;
  /** Auto-demo movement speed (default: 0.5) */
  autoDemoSpeed?: number;
}

/**
 * Comprehensive Three.js-based fluid simulation background component
 * with interactive controls, auto-demo mode, and optimizations
 */
export default function LiquidEtherBackground({
  mouseForce = 6.0,
  cursorSize = 200,
  viscosity = 0.9,
  resolution = 4,
  colors = ["#FF6600", "#FFAA66", "#FFEECC", "#FFFFFF"],
  opacity = 0.55,
  speed = 0.35,
  scale = 1.2,
  autoDemo = true,
  autoDemoForce = 3.0,
  autoDemoSpeed = 0.5,
}: LiquidEtherBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, isDown: false });
  const autoPosRef = useRef({ x: 0.5, y: 0.5, angle: 0 });
  const lastInteractionRef = useRef<number>(0);
  const visibleRef = useRef<boolean>(true);
  const timeRef = useRef<number>(0);

  // Frame buffer objects for simulation
  const velocityRef = useRef<{
    read: THREE.WebGLRenderTarget | null;
    write: THREE.WebGLRenderTarget | null;
  }>({ read: null, write: null });
  const divergenceRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const pressureRef = useRef<{
    read: THREE.WebGLRenderTarget | null;
    write: THREE.WebGLRenderTarget | null;
  }>({ read: null, write: null });
  const dyeRef = useRef<{
    read: THREE.WebGLRenderTarget | null;
    write: THREE.WebGLRenderTarget | null;
  }>({ read: null, write: null });

  // Shader materials
  const materialsRef = useRef<{
    advection?: THREE.ShaderMaterial;
    externalForce?: THREE.ShaderMaterial;
    viscous?: THREE.ShaderMaterial;
    divergence?: THREE.ShaderMaterial;
    poisson?: THREE.ShaderMaterial;
    pressure?: THREE.ShaderMaterial;
    display?: THREE.ShaderMaterial;
  }>({});

  // Helper quad mesh
  const quadRef = useRef<THREE.Mesh | null>(null);

  /**
   * Create double-buffered render targets for simulation
   */
  const createDoubleFBO = useCallback((width: number, height: number) => {
    const options = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    };

    return {
      read: new THREE.WebGLRenderTarget(width, height, options),
      write: new THREE.WebGLRenderTarget(width, height, options),
    };
  }, []);

  /**
   * Create single render target
   */
  const createFBO = useCallback((width: number, height: number) => {
    return new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });
  }, []);

  /**
   * Swap read/write buffers
   */
  const swap = (buffer: { read: THREE.WebGLRenderTarget | null; write: THREE.WebGLRenderTarget | null }) => {
    const temp = buffer.read;
    buffer.read = buffer.write;
    buffer.write = temp;
  };

  /**
   * Initialize all shader materials
   */
  const initShaders = useCallback(() => {
    // Base vertex shader used by all passes
    const baseVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Advection shader - transports velocity and dye along velocity field
    const advectionShader = `
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 uTexelSize;
      uniform float uDeltaTime;
      uniform float uDissipation;
      varying vec2 vUv;

      void main() {
        vec2 coord = vUv - uDeltaTime * texture2D(uVelocity, vUv).xy * uTexelSize;
        gl_FragColor = uDissipation * texture2D(uSource, coord);
      }
    `;

    // External force shader - applies mouse/touch forces
    const externalForceShader = `
      uniform sampler2D uVelocity;
      uniform vec2 uForce;
      uniform vec2 uCenter;
      uniform float uRadius;
      varying vec2 vUv;

      void main() {
        vec2 force = uForce;
        float dist = distance(vUv, uCenter);
        float influence = 1.0 - smoothstep(0.0, uRadius, dist);
        vec4 vel = texture2D(uVelocity, vUv);
        gl_FragColor = vel + vec4(force * influence, 0.0, 0.0);
      }
    `;

    // Viscous diffusion shader
    const viscousShader = `
      uniform sampler2D uVelocity;
      uniform vec2 uTexelSize;
      uniform float uViscosity;
      varying vec2 vUv;

      void main() {
        vec2 offset = uTexelSize;
        vec4 left = texture2D(uVelocity, vUv - vec2(offset.x, 0.0));
        vec4 right = texture2D(uVelocity, vUv + vec2(offset.x, 0.0));
        vec4 bottom = texture2D(uVelocity, vUv - vec2(0.0, offset.y));
        vec4 top = texture2D(uVelocity, vUv + vec2(0.0, offset.y));
        vec4 center = texture2D(uVelocity, vUv);
        
        gl_FragColor = (left + right + bottom + top + uViscosity * center) / (4.0 + uViscosity);
      }
    `;

    // Divergence shader - computes velocity field divergence
    const divergenceShader = `
      uniform sampler2D uVelocity;
      uniform vec2 uTexelSize;
      varying vec2 vUv;

      void main() {
        vec2 offset = uTexelSize;
        float left = texture2D(uVelocity, vUv - vec2(offset.x, 0.0)).x;
        float right = texture2D(uVelocity, vUv + vec2(offset.x, 0.0)).x;
        float bottom = texture2D(uVelocity, vUv - vec2(0.0, offset.y)).y;
        float top = texture2D(uVelocity, vUv + vec2(0.0, offset.y)).y;
        
        float div = 0.5 * (right - left + top - bottom);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    // Poisson pressure solver shader
    const poissonShader = `
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      uniform vec2 uTexelSize;
      varying vec2 vUv;

      void main() {
        vec2 offset = uTexelSize;
        float left = texture2D(uPressure, vUv - vec2(offset.x, 0.0)).x;
        float right = texture2D(uPressure, vUv + vec2(offset.x, 0.0)).x;
        float bottom = texture2D(uPressure, vUv - vec2(0.0, offset.y)).x;
        float top = texture2D(uPressure, vUv + vec2(0.0, offset.y)).x;
        float divergence = texture2D(uDivergence, vUv).x;
        
        float pressure = (left + right + bottom + top - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    // Pressure gradient subtraction shader
    const pressureShader = `
      uniform sampler2D uVelocity;
      uniform sampler2D uPressure;
      uniform vec2 uTexelSize;
      varying vec2 vUv;

      void main() {
        vec2 offset = uTexelSize;
        float left = texture2D(uPressure, vUv - vec2(offset.x, 0.0)).x;
        float right = texture2D(uPressure, vUv + vec2(offset.x, 0.0)).x;
        float bottom = texture2D(uPressure, vUv - vec2(0.0, offset.y)).x;
        float top = texture2D(uPressure, vUv + vec2(0.0, offset.y)).x;
        
        vec2 gradient = vec2(right - left, top - bottom) * 0.5;
        vec4 velocity = texture2D(uVelocity, vUv);
        gl_FragColor = vec4(velocity.xy - gradient, 0.0, 1.0);
      }
    `;

    // Display shader - renders final fluid with colors
    const displayShader = `
      uniform sampler2D uDye;
      uniform float uOpacity;
      varying vec2 vUv;

      vec3 palette(float t) {
        vec3 a = vec3(1.0, 0.8, 0.6);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(1.0, 0.4, 0.0);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec4 dye = texture2D(uDye, vUv);
        float intensity = length(dye.xy);
        vec3 color = palette(intensity * 0.5);
        gl_FragColor = vec4(color, uOpacity);
      }
    `;

    // Create materials
    materialsRef.current.advection = new THREE.ShaderMaterial({
      vertexShader: baseVertexShader,
      fragmentShader: advectionShader,
      uniforms: {
        uVelocity: { value: null },
        uSource: { value: null },
        uTexelSize: { value: new THREE.Vector2() },
        uDeltaTime: { value: 0 },
        uDissipation: { value: 0.98 },
      },
    });

    materialsRef.current.externalForce = new THREE.ShaderMaterial({
      vertexShader: baseVertexShader,
      fragmentShader: externalForceShader,
      uniforms: {
        uVelocity: { value: null },
        uForce: { value: new THREE.Vector2() },
        uCenter: { value: new THREE.Vector2() },
        uRadius: { value: 0.1 },
      },
    });

    materialsRef.current.viscous = new THREE.ShaderMaterial({
      vertexShader: baseVertexShader,
      fragmentShader: viscousShader,
      uniforms: {
        uVelocity: { value: null },
        uTexelSize: { value: new THREE.Vector2() },
        uViscosity: { value: 10.0 },
      },
    });

    materialsRef.current.divergence = new THREE.ShaderMaterial({
      vertexShader: baseVertexShader,
      fragmentShader: divergenceShader,
      uniforms: {
        uVelocity: { value: null },
        uTexelSize: { value: new THREE.Vector2() },
      },
    });

    materialsRef.current.poisson = new THREE.ShaderMaterial({
      vertexShader: baseVertexShader,
      fragmentShader: poissonShader,
      uniforms: {
        uPressure: { value: null },
        uDivergence: { value: null },
        uTexelSize: { value: new THREE.Vector2() },
      },
    });

    materialsRef.current.pressure = new THREE.ShaderMaterial({
      vertexShader: baseVertexShader,
      fragmentShader: pressureShader,
      uniforms: {
        uVelocity: { value: null },
        uPressure: { value: null },
        uTexelSize: { value: new THREE.Vector2() },
      },
    });

    materialsRef.current.display = new THREE.ShaderMaterial({
      vertexShader: baseVertexShader,
      fragmentShader: displayShader,
      uniforms: {
        uDye: { value: null },
        uOpacity: { value: opacity },
      },
      transparent: true,
      blending: THREE.NormalBlending,
    });
  }, [opacity]);

  /**
   * Apply a force at a position
   */
  const applyForce = useCallback((x: number, y: number, dx: number, dy: number, force: number) => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    if (!velocityRef.current.read || !velocityRef.current.write) return;
    if (!materialsRef.current.externalForce || !quadRef.current) return;

    const material = materialsRef.current.externalForce;
    material.uniforms.uVelocity.value = velocityRef.current.read.texture;
    material.uniforms.uCenter.value.set(x, y);
    material.uniforms.uForce.value.set(dx * force, dy * force);
    material.uniforms.uRadius.value = cursorSize / Math.max(
      velocityRef.current.read.width,
      velocityRef.current.read.height
    );

    quadRef.current.material = material;
    rendererRef.current.setRenderTarget(velocityRef.current.write);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    swap(velocityRef.current);
  }, [cursorSize]);

  /**
   * Main simulation step
   */
  const simulate = useCallback((deltaTime: number) => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    if (!velocityRef.current.read || !velocityRef.current.write) return;
    if (!divergenceRef.current || !pressureRef.current.read || !pressureRef.current.write) return;
    if (!dyeRef.current.read || !dyeRef.current.write) return;
    if (!quadRef.current) return;

    const texelWidth = 1.0 / velocityRef.current.read.width;
    const texelHeight = 1.0 / velocityRef.current.read.height;

    // Advect velocity
    if (materialsRef.current.advection) {
      const material = materialsRef.current.advection;
      material.uniforms.uVelocity.value = velocityRef.current.read.texture;
      material.uniforms.uSource.value = velocityRef.current.read.texture;
      material.uniforms.uTexelSize.value.set(texelWidth, texelHeight);
      material.uniforms.uDeltaTime.value = deltaTime * speed;
      material.uniforms.uDissipation.value = viscosity;

      quadRef.current.material = material;
      rendererRef.current.setRenderTarget(velocityRef.current.write);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      swap(velocityRef.current);
    }

    // Viscous diffusion
    if (materialsRef.current.viscous) {
      for (let i = 0; i < 20; i++) {
        const material = materialsRef.current.viscous;
        material.uniforms.uVelocity.value = velocityRef.current.read.texture;
        material.uniforms.uTexelSize.value.set(texelWidth, texelHeight);
        material.uniforms.uViscosity.value = 10.0;

        quadRef.current.material = material;
        rendererRef.current.setRenderTarget(velocityRef.current.write);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        swap(velocityRef.current);
      }
    }

    // Compute divergence
    if (materialsRef.current.divergence) {
      const material = materialsRef.current.divergence;
      material.uniforms.uVelocity.value = velocityRef.current.read.texture;
      material.uniforms.uTexelSize.value.set(texelWidth, texelHeight);

      quadRef.current.material = material;
      rendererRef.current.setRenderTarget(divergenceRef.current);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    // Clear pressure
    rendererRef.current.setRenderTarget(pressureRef.current.read);
    rendererRef.current.clear();

    // Solve pressure (Poisson equation iterations)
    if (materialsRef.current.poisson) {
      for (let i = 0; i < 20; i++) {
        const material = materialsRef.current.poisson;
        material.uniforms.uPressure.value = pressureRef.current.read.texture;
        material.uniforms.uDivergence.value = divergenceRef.current.texture;
        material.uniforms.uTexelSize.value.set(texelWidth, texelHeight);

        quadRef.current.material = material;
        rendererRef.current.setRenderTarget(pressureRef.current.write);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        swap(pressureRef.current);
      }
    }

    // Subtract pressure gradient
    if (materialsRef.current.pressure) {
      const material = materialsRef.current.pressure;
      material.uniforms.uVelocity.value = velocityRef.current.read.texture;
      material.uniforms.uPressure.value = pressureRef.current.read.texture;
      material.uniforms.uTexelSize.value.set(texelWidth, texelHeight);

      quadRef.current.material = material;
      rendererRef.current.setRenderTarget(velocityRef.current.write);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      swap(velocityRef.current);
    }

    // Advect dye
    if (materialsRef.current.advection) {
      const material = materialsRef.current.advection;
      material.uniforms.uVelocity.value = velocityRef.current.read.texture;
      material.uniforms.uSource.value = dyeRef.current.read.texture;
      material.uniforms.uTexelSize.value.set(texelWidth, texelHeight);
      material.uniforms.uDeltaTime.value = deltaTime * speed;
      material.uniforms.uDissipation.value = 0.99;

      quadRef.current.material = material;
      rendererRef.current.setRenderTarget(dyeRef.current.write);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      swap(dyeRef.current);
    }
  }, [speed, viscosity]);

  /**
   * Handle resize
   */
  const handleResize = useCallback(() => {
    if (!canvasRef.current || !rendererRef.current || !cameraRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvasRef.current.width = width * dpr;
    canvasRef.current.height = height * dpr;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;

    rendererRef.current.setSize(width, height);
    rendererRef.current.setPixelRatio(dpr);

    // Update camera
    cameraRef.current.left = -width / 2;
    cameraRef.current.right = width / 2;
    cameraRef.current.top = height / 2;
    cameraRef.current.bottom = -height / 2;
    cameraRef.current.updateProjectionMatrix();

    // Recreate FBOs with new resolution
    const simWidth = Math.floor(width / resolution);
    const simHeight = Math.floor(height / resolution);

    // Dispose old FBOs
    velocityRef.current.read?.dispose();
    velocityRef.current.write?.dispose();
    pressureRef.current.read?.dispose();
    pressureRef.current.write?.dispose();
    dyeRef.current.read?.dispose();
    dyeRef.current.write?.dispose();
    divergenceRef.current?.dispose();

    // Create new FBOs
    velocityRef.current = createDoubleFBO(simWidth, simHeight);
    pressureRef.current = createDoubleFBO(simWidth, simHeight);
    dyeRef.current = createDoubleFBO(simWidth, simHeight);
    divergenceRef.current = createFBO(simWidth, simHeight);
  }, [resolution, createDoubleFBO, createFBO]);

  /**
   * Handle mouse/touch move
   */
  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = 1.0 - (clientY - rect.top) / rect.height;

    const dx = x - mouseRef.current.prevX;
    const dy = y - mouseRef.current.prevY;

    if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
      applyForce(x, y, dx, dy, mouseForce);
      lastInteractionRef.current = Date.now();
    }

    mouseRef.current.prevX = x;
    mouseRef.current.prevY = y;
    mouseRef.current.x = x;
    mouseRef.current.y = y;
  }, [applyForce, mouseForce]);

  /**
   * Animation loop
   */
  const animate = useCallback(() => {
    if (!visibleRef.current) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const now = performance.now();
    const deltaTime = Math.min((now - timeRef.current) / 1000, 0.016);
    timeRef.current = now;

    // Auto-demo mode
    if (autoDemo && Date.now() - lastInteractionRef.current > 2000) {
      autoPosRef.current.angle += autoDemoSpeed * deltaTime;
      const x = 0.5 + 0.3 * Math.cos(autoPosRef.current.angle);
      const y = 0.5 + 0.3 * Math.sin(autoPosRef.current.angle * 1.3);
      const dx = 0.3 * Math.cos(autoPosRef.current.angle + Math.PI / 2) * deltaTime;
      const dy = 0.3 * Math.sin(autoPosRef.current.angle * 1.3 + Math.PI / 2) * deltaTime;

      applyForce(x, y, dx, dy, autoDemoForce);
    }

    // Run simulation
    simulate(deltaTime);

    // Render to screen
    if (rendererRef.current && sceneRef.current && cameraRef.current && quadRef.current) {
      if (materialsRef.current.display && dyeRef.current.read) {
        const material = materialsRef.current.display;
        material.uniforms.uDye.value = dyeRef.current.read.texture;
        material.uniforms.uOpacity.value = opacity;

        quadRef.current.material = material;
        rendererRef.current.setRenderTarget(null);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [autoDemo, autoDemoForce, autoDemoSpeed, applyForce, simulate, opacity]);

  /**
   * Initialize Three.js and simulation
   */
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Initialize camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create fullscreen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry);
    scene.add(mesh);
    quadRef.current = mesh;

    // Initialize shaders
    initShaders();

    // Initial resize
    handleResize();

    // Set up event listeners
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Visibility observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Start animation
    timeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      observer.disconnect();

      // Dispose all resources
      velocityRef.current.read?.dispose();
      velocityRef.current.write?.dispose();
      pressureRef.current.read?.dispose();
      pressureRef.current.write?.dispose();
      dyeRef.current.read?.dispose();
      dyeRef.current.write?.dispose();
      divergenceRef.current?.dispose();

      Object.values(materialsRef.current).forEach((mat) => mat?.dispose());
      quadRef.current?.geometry.dispose();

      renderer.dispose();
    };
  }, [initShaders, handleResize, handleMove, animate]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
      style={{ isolation: "isolate" }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ pointerEvents: "auto" }}
      />
    </div>
  );
}
