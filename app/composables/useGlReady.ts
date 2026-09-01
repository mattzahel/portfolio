// Shared ready flag: GlBackground flips it once it's drawn its first frame
// (or given up, e.g. no WebGL support); PageLoader waits on it. A ref rather
// than a window/DOM event so the two components can't race each other —
// whichever mounts first, the other just observes the current value.
const glReady = ref(false)

export function useGlReady() {
  return glReady
}
