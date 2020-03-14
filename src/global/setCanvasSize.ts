/**
 * Create function that will set the canvas {height, width} equal to the
 * document {height, width}
 */
export function setCanvasSize(canvas: HTMLCanvasElement) {
  const height = window.innerHeight
  const width = window.innerWidth

  canvas.width = width
  canvas.height = height
}

export function subscribeToWindowResizeChange(canvas: HTMLCanvasElement) {
  window.addEventListener('resize', () => setCanvasSize(canvas))
}
