<script setup lang="ts">
// A small website screenshot that follows the cursor while hovering a
// project link with a data-preview attribute. Position updates are plain
// inline transforms — the CSS transition on .project-preview does the
// "chase" easing, no GSAP/rAF loop needed. Fine pointers with motion
// allowed only, same gate as CursorDot.

const box = ref<HTMLDivElement | null>(null)
const img = ref<HTMLImageElement | null>(null)

const OFFSET_X = 20
const WIDTH = 240 // keep in sync with .project-preview width in main.css

onMounted(() => {
  const boxEl = box.value
  const imgEl = img.value
  if (!boxEl || !imgEl) return

  const fine = window.matchMedia('(pointer: fine)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduced) return

  const targetOf = (t: EventTarget | null) =>
    t instanceof Element ? t.closest<HTMLElement>('.projects .name[data-preview]') : null

  const place = (x: number, y: number, snap = false) => {
    const cx = Math.min(x + OFFSET_X, window.innerWidth - WIDTH - 16)
    if (snap) boxEl.style.transition = 'none'
    boxEl.style.transform = `translate(${cx}px, ${y}px) translateY(-50%)`
    if (snap) {
      void boxEl.offsetHeight // force the jump to apply before re-enabling the transition
      boxEl.style.transition = ''
    }
  }

  const onMove = (e: PointerEvent) => {
    if (boxEl.classList.contains('is-active')) place(e.clientX, e.clientY)
  }

  const onOver = (e: PointerEvent) => {
    const el = targetOf(e.target)
    if (!el || el === targetOf(e.relatedTarget)) return
    imgEl.src = el.dataset.preview!
    place(e.clientX, e.clientY, true)
    boxEl.classList.add('is-active')
  }

  const onOut = (e: PointerEvent) => {
    const el = targetOf(e.target)
    if (!el || el === targetOf(e.relatedTarget)) return
    boxEl.classList.remove('is-active')
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerover', onOver, { passive: true })
  window.addEventListener('pointerout', onOut, { passive: true })

  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerover', onOver)
    window.removeEventListener('pointerout', onOut)
  })
})
</script>

<template>
  <div ref="box" class="project-preview" aria-hidden="true">
    <img ref="img" alt="project preview" loading="lazy" decoding="async" fetchpriority="low" />
  </div>
</template>
