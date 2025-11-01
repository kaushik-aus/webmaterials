"use client";

import { useEffect, useRef } from "react";

/**
 * Full-viewport animated “Liquid Ether” background.
 * - WebGL shader creates marbled fluid patterns with orange accents (#FF6600).
 * - Graceful CSS fallback if WebGL is unavailable.
 * - Non-interactive: sits behind content via position: fixed; pointer-events: none.
 *
 * Props:
 *  - opacity: overall alpha (0.0 - 1.0), default 0.55
 *  - speed: animation speed multiplier, default 0.35
 *  - scale: spatial frequency of the pattern, default 1.2
 */
export default function LiquidEtherBackground({
  opacity = 0.55,
  speed = 0.35,
  scale = 1.2,
}: {
  opacity?: number;
  speed?: number;
  scale?: number;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const startTimeRef = useRef<number>(0);
  const uTimeRef = useRef<WebGLUniformLocation | null>(null);
  const uResRef = useRef<WebGLUniformLocation | null>(null);
  const uParamsRef = useRef<WebGLUniformLocation | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current!;
    const canvas = canvasRef.current!;
    // Try WebGL
    const gl = (canvas.getContext("webgl", {
      premultipliedAlpha: false,
      alpha: true,
    }) ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!gl) {
      // CSS fallback: layered radial gradients, blurred to suggest fluid swirls.
      canvas.style.display = "none";
      wrapper.classList.add("ether-fallback");
      return;
    }

    glRef.current = gl;

    // Resize helper
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.ceil(window.innerWidth * dpr);
      const h = Math.ceil(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);

    // Compile shaders
    const vert = `
      attribute vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const frag = `
      precision highp float;

      uniform vec2 u_res;
      uniform float u_time;
      // x: opacity, y: speed, z: scale
      uniform vec3 u_params;

      vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ; m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.6;
        mat2 R = mat2(0.80, 0.60, -0.60, 0.80);
        for(int i=0; i<5; i++){
          v += a * snoise(p);
          p = R * p * 2.0;
          a *= 0.5;
        }
        return v;
      }

      vec3 palette(float t){
        vec3 white = vec3(1.0);
        vec3 accent = vec3(1.0, 0.4, 0.0);   // ~ #FF6600
        vec3 peach  = vec3(1.0, 0.92, 0.86);
        vec3 blue   = vec3(0.86, 0.90, 0.97);
        vec3 c1 = mix(white, peach, smoothstep(0.0, 0.5, t));
        vec3 c2 = mix(accent, blue, smoothstep(0.3, 1.0, t));
        return mix(c1, c2, 0.35);
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / u_res.xy;
        vec2 p = (uv - 0.5);
        p.x *= u_res.x / u_res.y;
        float time = u_time * u_params.y;

        float angle = 0.05 * time;
        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        vec2 q = rot * p * (1.0 + 0.25*sin(time*0.2));
        float n = fbm(q * (1.0 + u_params.z * 0.8) + 0.15*time);
        float m = fbm(q * 2.0 - 0.5*time);
        float bands = sin((q.x + n*0.65 + m*0.35) * 6.2831 * (0.6 + u_params.z));
        float t = smoothstep(-1.0, 1.0, bands);

        vec3 col = palette(t);
        col = mix(vec3(1.0), col, 0.42);   // keep subtle
        gl_FragColor = vec4(col, u_params.x);
      }
    `;

    const createShader = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(s) || "Shader compile failed");
      }
      return s;
    };

    const vs = createShader(gl.VERTEX_SHADER, vert);
    const fs = createShader(gl.FRAGMENT_SHADER, frag);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
    }
    programRef.current = program;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPos);

    uTimeRef.current = gl.getUniformLocation(program, "u_time");
    uResRef.current = gl.getUniformLocation(program, "u_res");
    uParamsRef.current = gl.getUniformLocation(program, "u_params");

    startTimeRef.current = performance.now();

    const render = () => {
      const now = performance.now();
      const t = (now - startTimeRef.current) / 1000;

      gl.useProgram(program);
      gl.uniform1f(uTimeRef.current, t);
      gl.uniform2f(uResRef.current, canvas.width, canvas.height);
      gl.uniform3f(uParamsRef.current, opacity, speed, scale);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      rafRef.current && cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (programRef.current) gl.deleteProgram(programRef.current);
      const bound = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
      if (bound) gl.deleteBuffer(bound);
    };
  }, [opacity, speed, scale]);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <style jsx global>{`
        .ether-fallback {
          background: radial-gradient(
              1200px 800px at 10% 10%,
              rgba(255, 102, 0, 0.08),
              transparent 60%
            ),
            radial-gradient(
              1000px 900px at 80% 20%,
              rgba(255, 180, 120, 0.1),
              transparent 60%
            ),
            radial-gradient(
              900px 900px at 30% 80%,
              rgba(180, 190, 210, 0.1),
              transparent 60%
            ),
            radial-gradient(
              1200px 700px at 85% 85%,
              rgba(255, 102, 0, 0.06),
              transparent 60%
            ),
            #ffffff;
          filter: contrast(105%) saturate(105%) blur(0.2px);
          background-attachment: fixed;
        }
      `}</style>
    </div>
  );
}
