import {
  createCanvas,
  createGlobalStyles,
  setCanvasSize,
  subscribeToWindowResizeChange,
} from './global'
import { Particle } from './components/Particle'

interface Options {
  backgroundColor?: string
  particleColor?: string | string[]
  particleSize?: number
  particleCount?: number
}

const initialize = (options: Options) => {
  const {
    backgroundColor,
    particleColor,
    particleSize = 5,
    particleCount = 50,
  } = options
  const canvas = createCanvas()
  const canvasContext2d = canvas.getContext('2d') as CanvasRenderingContext2D
  let particles: Particle[] = []

  setCanvasSize(canvas)
  subscribeToWindowResizeChange(canvas)
  createGlobalStyles({ backgroundColor })

  const particleOptions = {
    canvas,
    fillStyle: particleColor,
    particleSize,
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(particleOptions))
  }

  setInterval(() => {
    canvasContext2d.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(particle => {
      particle.drawParticle()
    })
  }, 10)
}

initialize({
  backgroundColor: '#1f222d',
  particleColor: 'white',
})
