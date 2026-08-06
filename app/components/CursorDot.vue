<script setup lang="ts">
import { gsap } from 'gsap'

// A single dot from the background grid, escaped: trails the pointer with a
// slight lag, inverts what it passes over, swells over interactive elements.
// Only replaces the cursor for fine pointers with motion allowed.

const dot = ref<HTMLDivElement | null>(null)
const trail = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const el = dot.value
  const trailBox = trail.value
  if (!el || !trailBox) return

  const fine = window.matchMedia('(pointer: fine)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduced) return

  document.documentElement.classList.add('has-custom-cursor')

  // 1:1 tracking; anything eased on position reads as lag
  const xSet = gsap.quickSetter(el, 'x', 'px')
  const ySet = gsap.quickSetter(el, 'y', 'px')
  let shown = false

  const isInteractive = (t: EventTarget | null) =>
    t instanceof Element && !!t.closest('a, button')

  // dots left behind: spawned by distance travelled, capped for safety
  let lastX = 0
  let lastY = 0
  let live = 0
  const SPACING = 22
  const MAX_LIVE = 60

  const spawn = (x: number, y: number) => {
    if (live >= MAX_LIVE) return
    live++
    const d = document.createElement('div')
    d.className = 'trail-dot'
    trailBox.appendChild(d)
    gsap.set(d, { x, y })
    gsap.fromTo(
      d,
      { scale: 1, opacity: 0.4 },
      {
        scale: 0.1,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          d.remove()
          live--
        },
      },
    )
  }

  const onMove = (e: PointerEvent) => {
    if (!shown) {
      shown = true
      lastX = e.clientX
      lastY = e.clientY
      gsap.to(el, { opacity: 1, duration: 0.2 })
    }
    xSet(e.clientX)
    ySet(e.clientY)

    const dx = e.clientX - lastX
    const dy = e.clientY - lastY
    if (dx * dx + dy * dy >= SPACING * SPACING) {
      lastX = e.clientX
      lastY = e.clientY
      spawn(e.clientX, e.clientY)
    }
  }
  // over clickable elements the solid dot grows, inverting what's under it
  const grow = (scale: number) =>
    gsap.to(el, { scale, duration: 0.3, ease: 'power3.out' })

  // relatedTarget guards prevent flicker when crossing children of one link
  const onOver = (e: PointerEvent) => {
    if (isInteractive(e.target) && !isInteractive(e.relatedTarget)) grow(2.6)
  }
  const onOut = (e: PointerEvent) => {
    if (isInteractive(e.target) && !isInteractive(e.relatedTarget)) grow(1)
  }
  const onDown = (e: PointerEvent) =>
    grow(isInteractive(e.target) ? 1.8 : 0.75)
  const onUp = (e: PointerEvent) =>
    grow(isInteractive(e.target) ? 2.6 : 1)
  const onLeave = () => {
    shown = false
    gsap.to(el, { opacity: 0, duration: 0.2 })
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerover', onOver, { passive: true })
  window.addEventListener('pointerout', onOut, { passive: true })
  window.addEventListener('pointerdown', onDown, { passive: true })
  window.addEventListener('pointerup', onUp, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)

  onBeforeUnmount(() => {
    document.documentElement.classList.remove('has-custom-cursor')
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerover', onOver)
    window.removeEventListener('pointerout', onOut)
    window.removeEventListener('pointerdown', onDown)
    window.removeEventListener('pointerup', onUp)
    document.documentElement.removeEventListener('pointerleave', onLeave)
  })
})
</script>

<template>
  <div aria-hidden="true">
    <div ref="trail" class="cursor-trail" />
    <div ref="dot" class="cursor-dot" />
  </div>
</template>

<style>
.cursor-dot {
  position: fixed;
  top: -5px;
  left: -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e9eaec;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
}

.cursor-trail {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
}

.trail-dot {
  position: absolute;
  top: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #82858c;
}
</style>
