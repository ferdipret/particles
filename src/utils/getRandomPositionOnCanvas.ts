import { StartingCoords } from '../types'

export function getRandomXYPosition(canvas: HTMLCanvasElement): StartingCoords {
  return [
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
  ]
}
