<script setup lang="ts">
// Ambient background: hand-written WebGL fragment shader.
// Domain-warped fbm noise, dim copper glow drifting over warm charcoal,
// slight pointer parallax. Static single frame under prefers-reduced-motion.

const canvas = ref<HTMLCanvasElement | null>(null)

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_pointer;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  // halftone dot grid: dot size follows a slowly drifting noise field
  float s = 0.024 * min(u_res.x, u_res.y); // grid spacing in px
  vec2 g = gl_FragCoord.xy / s;
  vec2 id = floor(g);
  vec2 lu = fract(g) - 0.5;

  float t = u_time * 0.05;
  float n = fbm(id * 0.055 + vec2(t * 0.8, -t * 0.5));

  // gentle swell around the pointer
  vec2 pp = (u_pointer * 0.5 + 0.5) * u_res;
  float dp = length(gl_FragCoord.xy - pp) / min(u_res.x, u_res.y);
  float boost = exp(-dp * dp * 16.0) * 0.3;

  float v = clamp(n * 0.85 + boost, 0.0, 1.0);
  float r = mix(0.02, 0.34, v * v);

  float d = length(lu);
  float m = smoothstep(r, r - 0.09, d);

  // keep the field quiet behind the centered text column
  float cx = abs(gl_FragCoord.x / u_res.x - 0.5);
  float fade = mix(0.1, 1.0, smoothstep(0.18, 0.48, cx));

  // neutral near-black base, matches --bg
  vec3 base = vec3(0.072, 0.074, 0.078);
  vec3 ink = vec3(0.75, 0.78, 0.82);

  vec3 col = base + ink * m * (0.035 + 0.14 * v) * fade;

  gl_FragColor = vec4(col, 1.0);
}
`

onMounted(() => {
  const el = canvas.value
  if (!el) return
  const gl = el.getContext('webgl', { antialias: false, alpha: false })
  if (!gl) return

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const prog = gl.createProgram()!
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(prog, 'u_res')
  const uTime = gl.getUniformLocation(prog, 'u_time')
  const uPointer = gl.getUniformLocation(prog, 'u_pointer')

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  const resize = () => {
    el.width = Math.round(window.innerWidth * dpr)
    el.height = Math.round(window.innerHeight * dpr)
    gl.viewport(0, 0, el.width, el.height)
    gl.uniform2f(uRes, el.width, el.height)
  }
  resize()

  // start off-screen so the swell only appears once the pointer moves
  const pointer = { x: -3, y: -3, tx: -3, ty: -3 }
  const onMove = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
    pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1)
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let raf = 0
  let running = false
  const start = performance.now()

  const frame = () => {
    pointer.x += (pointer.tx - pointer.x) * 0.04
    pointer.y += (pointer.ty - pointer.y) * 0.04
    gl.uniform1f(uTime, (performance.now() - start) / 1000)
    gl.uniform2f(uPointer, pointer.x, pointer.y)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    if (running) raf = requestAnimationFrame(frame)
  }

  const play = () => {
    if (running || reduced) return
    running = true
    raf = requestAnimationFrame(frame)
  }
  const pause = () => {
    running = false
    cancelAnimationFrame(raf)
  }
  const onVisibility = () => (document.hidden ? pause() : play())

  if (reduced) {
    // one static frame, no loop
    gl.uniform1f(uTime, 40)
    gl.uniform2f(uPointer, -3, -3)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  } else {
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    play()
  }
  window.addEventListener('resize', resize)

  onBeforeUnmount(() => {
    pause()
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('visibilitychange', onVisibility)
  })
})
</script>

<template>
  <canvas ref="canvas" class="gl-bg" aria-hidden="true" />
</template>

<style scoped>
.gl-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  display: block;
}
</style>
