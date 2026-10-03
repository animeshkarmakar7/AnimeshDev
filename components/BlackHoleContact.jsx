"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const VERTEX = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const SCENE = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform float uElev;
uniform float uHorizon;
uniform float uShadow;
uniform float uOutScale;

#define STEPS 300
#define CAM_DIST 26.0
#define R_IN 3.0
#define R_OUT 22.0

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    s += a * vnoise(p);
    p = p * 2.03 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return s;
}
vec3 ramp(float t) {
  vec3 c0 = vec3(0.16, 0.05, 0.60);
  vec3 c1 = vec3(0.42, 0.24, 1.00);
  vec3 c2 = vec3(0.80, 0.66, 1.00);
  vec3 c3 = vec3(1.00, 1.00, 1.00);
  vec3 c = mix(c0, c1, smoothstep(0.00, 0.30, t));
  c = mix(c, c2, smoothstep(0.28, 0.65, t));
  c = mix(c, c3, smoothstep(0.60, 1.15, t));
  return c;
}
void main() {
  vec2 p = (vUv - vec2(0.5, uHorizon)) * vec2(uRes.x / uRes.y, 1.0);
  float s = sin(uElev), c = cos(uElev);
  vec3 camPos = CAM_DIST * vec3(0.0, s, c);
  vec3 fwd = vec3(0.0, -s, -c);
  vec3 right = vec3(1.0, 0.0, 0.0);
  vec3 up = vec3(0.0, c, -s);
  float k = (2.598 / CAM_DIST) / uShadow;
  vec3 vel = normalize(fwd + (p.x * right + p.y * up) * k);
  vec3 pos = camPos;
  vec3 hv = cross(pos, vel);
  float h2 = dot(hv, hv);
  vec3 col = vec3(0.0);
  float T = 1.0;

  for (int i = 0; i < STEPS; i++) {
    float r2 = dot(pos, pos);
    float r = sqrt(r2);
    if (r < 1.0) {
      vec2 pn = p / uShadow;
      float core = exp(-max(pn.y, 0.0) * 1.1) * (1.0 - 0.7 * smoothstep(0.2, 1.0, length(pn)));
      col += T * vec3(0.40, 0.20, 1.0) * core * 1.1;
      T = 0.0;
      break;
    }
    if (r > 45.0 && dot(pos, vel) > 0.0) break;

    float dt = clamp(0.07 * (r - 0.85), 0.025, 1.0);
    vec3 prev = pos;
    float r5 = r2 * r2 * r;
    vel = normalize(vel - 1.5 * h2 * pos / r5 * dt);
    pos += vel * dt;

    if (prev.y * pos.y < 0.0) {
      vec3 hit = mix(prev, pos, prev.y / (prev.y - pos.y));
      float rr = length(hit.xz);
      if (rr > R_IN && rr < R_OUT) {
        float ang = atan(hit.z, hit.x);
        float omega = 2.2 / (rr * sqrt(rr));
        float a = ang - omega * uTime;
        vec2 np = vec2(rr * 0.9 + 2.0 * cos(a), 2.0 * sin(a));
        float turb = fbm(np);
        float fine = fbm(np * 3.1 + 7.0);
        float bands = 0.93 + 0.07 * sin(rr * 9.0 + turb * 4.0);

        float prof = pow(R_IN / rr, 1.25);
        float edgeIn = smoothstep(R_IN, R_IN + 0.5, rr);
        float edgeOut = 1.0 - smoothstep(9.0, R_OUT, rr);
        float I = prof * edgeIn * edgeOut * (0.7 + 0.8 * turb) * bands * (0.9 + 0.2 * fine);

        float beta = sqrt(1.0 / (2.0 * (rr - 1.0)));
        vec3 vd = normalize(vec3(-hit.z, 0.0, hit.x)) * beta;
        float gam = 1.0 / sqrt(1.0 - beta * beta);
        float D = 1.0 / (gam * (1.0 - dot(vd, -vel)));
        float g = D * sqrt(1.0 - 1.0 / rr);
        float boost = pow(g, 1.4);

        col += T * ramp(I * g * 1.1) * I * boost * 5.0;
        T *= 1.0 - clamp(I * 0.9, 0.0, 0.92);
      }
    }
  }

  gl_FragColor = vec4(col * uOutScale, 1.0);
}
`;

const COPY = `
precision highp float;
varying vec2 vUv;
uniform sampler2D tInput;
uniform float uThreshold;
void main() {
  vec3 c = texture2D(tInput, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  c *= max(l - uThreshold, 0.0) / max(l, 1e-4);
  gl_FragColor = vec4(c, 1.0);
}
`;

const BLUR = `
precision highp float;
varying vec2 vUv;
uniform sampler2D tInput;
uniform vec2 uDir;
void main() {
  vec3 c = texture2D(tInput, vUv).rgb * 0.2270270270;
  c += texture2D(tInput, vUv + uDir * 1.3846153846).rgb * 0.3162162162;
  c += texture2D(tInput, vUv - uDir * 1.3846153846).rgb * 0.3162162162;
  c += texture2D(tInput, vUv + uDir * 3.2307692308).rgb * 0.0702702703;
  c += texture2D(tInput, vUv - uDir * 3.2307692308).rgb * 0.0702702703;
  gl_FragColor = vec4(c, 1.0);
}
`;

const FINAL = `
precision highp float;
varying vec2 vUv;
uniform sampler2D tScene;
uniform sampler2D tB0;
uniform sampler2D tB1;
uniform sampler2D tB2;
uniform sampler2D tB3;
uniform float uHorizon;
uniform float uAspect;
uniform float uExposure;
uniform float uBloom;
uniform float uFade;
uniform float uInvScale;
uniform float uTime;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
vec3 bloomAt(vec2 uv) {
  return texture2D(tB0, uv).rgb * 0.50
       + texture2D(tB1, uv).rgb * 0.60
       + texture2D(tB2, uv).rgb * 0.80
       + texture2D(tB3, uv).rgb * 1.10;
}
void main() {
  vec2 uv = vUv;
  float d = uHorizon - uv.y;
  vec3 hdr;

  if (d <= 0.0) {
    hdr = (texture2D(tScene, uv).rgb + bloomAt(uv) * uBloom) * uInvScale;
  } else {
    vec3 acc = vec3(0.0);
    float wsum = 0.0;
    for (int k = -3; k <= 3; k++) {
      float fk = float(k);
      float w = exp(-fk * fk * 0.18);
      vec2 m = vec2(uv.x, clamp(uHorizon + d + fk * d * 0.10, 0.0, 1.0));
      acc += (texture2D(tScene, m).rgb * 0.35 + bloomAt(m) * uBloom) * w;
      wsum += w;
    }
    float fade = exp(-d * 7.5);
    hdr = acc / wsum * uInvScale * fade * 0.85;
  }

  vec2 q = (uv - vec2(0.5, uHorizon)) * vec2(uAspect, 1.0);
  q *= vec2(0.8, 1.5);
  float haze = exp(-dot(q, q) * 6.0);
  float below = mix(1.0, exp(-max(d, 0.0) * 6.0), step(0.0, d));
  hdr += vec3(0.30, 0.12, 0.85) * haze * 0.10 * below;

  vec3 c = vec3(1.0) - exp(-hdr * uExposure * uFade);
  c = pow(c, vec3(0.92));
  c += (hash(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) / 255.0;
  gl_FragColor = vec4(c, 1.0);
}
`;

let threeLoad;

function loadThree() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.THREE) return Promise.resolve(window.THREE);
  if (!threeLoad) {
    threeLoad = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-three-r128="true"]');
      if (existing) {
        existing.addEventListener("load", () => resolve(window.THREE), { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.async = true;
      script.dataset.threeR128 = "true";
      script.onload = () => resolve(window.THREE);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return threeLoad;
}

function BlackHoleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    loadThree().then((THREE) => {
      if (!THREE || disposed || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const hero = canvas.parentElement;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        });
      } catch {
        hero?.classList.add("no-webgl");
        return;
      }

      const hdrOK =
        renderer.capabilities.isWebGL2 &&
        (renderer.extensions.has("EXT_color_buffer_float") ||
          renderer.extensions.has("EXT_color_buffer_half_float"));

      const rtType = hdrOK ? THREE.HalfFloatType : THREE.UnsignedByteType;
      const outScale = hdrOK ? 1.0 : 0.25;

      const mk = (fragmentShader, uniforms) =>
        new THREE.ShaderMaterial({
          vertexShader: VERTEX,
          fragmentShader,
          uniforms,
          depthTest: false,
          depthWrite: false,
        });

      const makeRT = (w, h) =>
        new THREE.WebGLRenderTarget(w, h, {
          type: rtType,
          format: THREE.RGBAFormat,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          depthBuffer: false,
          stencilBuffer: false,
        });

      const sceneUniforms = {
        uRes: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uElev: { value: 0.04 },
        uHorizon: { value: 0.25 },
        uShadow: { value: 0.18 },
        uOutScale: { value: outScale },
      };

      const matScene = mk(SCENE, sceneUniforms);
      const matCopy = mk(COPY, {
        tInput: { value: null },
        uThreshold: { value: 0.0 },
      });
      const matBlur = mk(BLUR, {
        tInput: { value: null },
        uDir: { value: new THREE.Vector2() },
      });

      const rtScene = makeRT(4, 4);
      const levels = [0, 1, 2, 3].map(() => ({
        a: makeRT(4, 4),
        b: makeRT(4, 4),
        texel: new THREE.Vector2(),
      }));

      const finalUniforms = {
        tScene: { value: rtScene.texture },
        tB0: { value: levels[0].a.texture },
        tB1: { value: levels[1].a.texture },
        tB2: { value: levels[2].a.texture },
        tB3: { value: levels[3].a.texture },
        uHorizon: { value: 0.25 },
        uAspect: { value: 1.6 },
        uExposure: { value: 1.25 },
        uBloom: { value: 0.9 },
        uFade: { value: 0 },
        uInvScale: { value: 1.0 / outScale },
        uTime: { value: 0 },
      };

      const matFinal = mk(FINAL, finalUniforms);
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), matScene);
      quad.frustumCulled = false;

      const scene = new THREE.Scene();
      scene.add(quad);
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const pass = (mat, target) => {
        quad.material = mat;
        renderer.setRenderTarget(target);
        renderer.render(scene, camera);
      };

      let quality = Math.min(window.devicePixelRatio || 1, 1.5) * 0.85;
      let qualityChecked = false;
      let resizeObserver;

      const requestRender = () => {
        if (!reduced) return;
        requestAnimationFrame(() => render(4.0, el));
      };

      function resize() {
        const w = hero.clientWidth;
        const h = hero.clientHeight;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(w, h, false);

        const sw = Math.max(64, Math.round(w * quality));
        const sh = Math.max(64, Math.round(h * quality));
        rtScene.setSize(sw, sh);
        levels.forEach((l, i) => {
          const lw = Math.max(8, sw >> (i + 1));
          const lh = Math.max(8, sh >> (i + 1));
          l.a.setSize(lw, lh);
          l.b.setSize(lw, lh);
          l.texel.set(1 / lw, 1 / lh);
        });

        const cols = hero.querySelector(".cols");
        const horizon = Math.min(0.5, Math.max(0.2, ((cols?.offsetHeight ?? 220) + 56) / h));
        const shadow = Math.min(0.2, 0.27 * w / h);
        sceneUniforms.uRes.value.set(sw, sh);
        sceneUniforms.uHorizon.value = horizon;
        sceneUniforms.uShadow.value = shadow;
        requestRender();
      }

      const BASE_EL = 0.04;
      let el = BASE_EL;
      let targetEl = BASE_EL;
      const onPointerMove = (event) => {
        const py = Math.min(1, Math.max(0, event.clientY / window.innerHeight));
        targetEl = 0.012 + (1 - py) * 0.15;
        requestRender();
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });

      function render(t, elev) {
        sceneUniforms.uTime.value = t;
        finalUniforms.uTime.value = t;
        sceneUniforms.uElev.value = elev;

        pass(matScene, rtScene);

        matCopy.uniforms.tInput.value = rtScene.texture;
        matCopy.uniforms.uThreshold.value = 0.6;
        pass(matCopy, levels[0].a);

        for (let i = 0; i < levels.length; i++) {
          const l = levels[i];
          if (i > 0) {
            matCopy.uniforms.tInput.value = levels[i - 1].a.texture;
            matCopy.uniforms.uThreshold.value = 0.0;
            pass(matCopy, l.a);
          }
          matBlur.uniforms.tInput.value = l.a.texture;
          matBlur.uniforms.uDir.value.set(l.texel.x, 0);
          pass(matBlur, l.b);
          matBlur.uniforms.tInput.value = l.b.texture;
          matBlur.uniforms.uDir.value.set(0, l.texel.y);
          pass(matBlur, l.a);
        }

        pass(matFinal, null);
      }

      const start = performance.now();
      let last = start;
      let frames = 0;
      let acc = 0;
      let animationFrame;

      function frame(now) {
        animationFrame = requestAnimationFrame(frame);
        const t = (now - start) / 1000;
        const p = Math.min(1, Math.max(0, (t - 0.2) / 3.5));
        const eased = 1 - Math.pow(1 - p, 3);
        el += (targetEl - el) * 0.06;
        finalUniforms.uFade.value = Math.min(1, t / 1.6);
        render(t, el + (1 - eased) * 0.22);

        frames++;
        if (!qualityChecked && frames > 30 && frames <= 90) {
          acc += now - last;
          if (frames === 90) {
            if (acc / 60 > 28 && quality > 0.45) {
              quality *= 0.8;
              resize();
            }
            qualityChecked = true;
          }
        }
        last = now;
      }

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(hero);
      resize();

      if (reduced) {
        finalUniforms.uFade.value = 1;
        render(4.0, el);
      } else {
        animationFrame = requestAnimationFrame(frame);
      }

      cleanup = () => {
        cancelAnimationFrame(animationFrame);
        resizeObserver?.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        rtScene.dispose();
        levels.forEach((l) => {
          l.a.dispose();
          l.b.dispose();
        });
        matScene.dispose();
        matCopy.dispose();
        matBlur.dispose();
        matFinal.dispose();
        quad.geometry.dispose();
        renderer.dispose();
      };
    }).catch(() => {
      canvasRef.current?.parentElement?.classList.add("no-webgl");
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} id="gl" aria-hidden="true" />;
}

export default function BlackHoleContact() {
  return (
    <section id="contact" className="blackhole-reference-contact">
      <div className="blackhole-reference-hero">
        <BlackHoleCanvas />

        <footer className="blackhole-reference-cols cols">
          <div className="brand-col">
            <p className="brand">Animesh</p>
            <p className="tagline">Building production-ready AI systems with data, retrieval, and a little curiosity.</p>
          </div>

          <nav aria-label="Quick links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#stack">Skills</a></li>
            </ul>
          </nav>

          <div>
            <h3>Get in Touch</h3>
            <ul>
              <li><a href="mailto:animeshkarmakar710@gmail.com">animeshkarmakar710@gmail.com</a></li>
              <li><a href="https://github.com/animeshkarmakar7" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="#">India</a></li>
            </ul>
          </div>

          <div>
            <h3>Connect</h3>
            <ul>
              <li><a href="https://github.com/animeshkarmakar7" target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a></li>
              <li><a href="https://linkedin.com/in/animeshkarmakar" target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a></li>
              <li><a href="mailto:animeshkarmakar710@gmail.com"><Mail size={18}/> Email</a></li>
            </ul>
          </div>
        </footer>
      </div>

      <div className="blackhole-bottom">
        <span>AI &amp; DATA SCIENCE / AI ENGINEER</span>
        <span>2026</span>
        <a href="#home">BACK TO TOP <ArrowUpRight size={13}/></a>
      </div>
    </section>
  );
}
