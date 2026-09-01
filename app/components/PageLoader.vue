<script setup lang="ts">
// Quiet loading gate: a flat overlay, the same color as the canvas
// background underneath, that holds briefly then fades into the real page
// once fonts and the shader are ready. CSS only shows it under html.anim
// (stamped pre-paint, see nuxt.config.ts), so a no-JS or reduced-motion
// visitor never sees it — the page is just there.

const loader = ref<HTMLDivElement | null>(null)

// fonts + shader are self-hosted/preloaded and are usually ready within a
// frame; without this floor the fade would never actually be visible
const MIN_VISIBLE_MS = 180

function whenTrue(flag: ReturnType<typeof useGlReady>) {
  if (flag.value) return Promise.resolve()
  return new Promise<void>((resolve) => {
    const stop = watch(flag, (v) => {
      if (v) {
        stop()
        resolve()
      }
    })
  })
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const ready = Promise.all([
    whenTrue(useGlReady()),
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, MIN_VISIBLE_MS)),
  ])
  // safety net: never sit behind the gate if a signal never fires
  // (a stalled font fetch, WebGL unsupported)
  const safety = new Promise((resolve) => setTimeout(resolve, 1500))

  Promise.race([ready, safety]).then(() => loader.value?.classList.add('is-hidden'))
})
</script>

<template>
  <div ref="loader" class="page-loader" aria-hidden="true" />
</template>
