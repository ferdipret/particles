import { numericTuple, getRandomXYPosition } from '../utils'
import { Point, StartingCoords, Arc } from '../types'

interface ParticleOptions {
  canvas: HTMLCanvasElement
  particleSize?: number
  fillStyle?: string | string[]
}

function getSpeed() {
  const direction = Math.random() > 0.5 ? 1 : -1
  const minimumSpeed = 0.01
  const speed = 1 * Math.random()

  return speed > minimumSpeed ? speed * direction : minimumSpeed * direction
}

class Particle {
  canvas: HTMLCanvasElement
  canvasContext2d: CanvasRenderingContext2D
  state: { point: Point }
  setState: (state: any) => any
  xPosUpdate = getSpeed()
  yPosUpdate = getSpeed()

  constructor({
    canvas,
    particleSize = 5,
    fillStyle: initialFillStyle = 'black',
  }: ParticleOptions) {
    const [x, y] = getRandomXYPosition(canvas)
    const randomParticleSize =
      Math.floor(Math.random() * particleSize * 100) / 100
    const particleSizeToUse =
      randomParticleSize >= 0.5 ? randomParticleSize : 0.5
    const fillStyle =
      initialFillStyle && typeof initialFillStyle === 'string'
        ? initialFillStyle
        : initialFillStyle[Math.floor(Math.random() * initialFillStyle.length)]

    this.canvas = canvas
    this.canvasContext2d = canvas.getContext('2d') as CanvasRenderingContext2D

    this.state = {
      point: {
        fillStyle,
        arc: numericTuple<Arc>(
          x,
          y,
          particleSizeToUse,
          0 * Math.PI,
          2 * Math.PI
        ),
      },
    }

    this.setState = (state: any) => (this.state = state)
  }

  public drawParticle() {
    this.drawAndUpdatePosition()
  }

  private drawAndUpdatePosition() {
    const { canvasContext2d, canvas } = this
    const { point } = this.state

    const [x, y] = point.arc
    const canvasXStart = 0
    const canvasXEnd = canvas.width
    const canvasYStart = 0
    const canvasYEnd = canvas.height

    const isParticleXPosNotValid = x < canvasXStart || x > canvasXEnd
    const isParticleYPosNotValid = y < canvasYStart || y > canvasYEnd

    if (isParticleXPosNotValid) {
      this.xPosUpdate = this.xPosUpdate * -1
    }

    if (isParticleYPosNotValid) {
      this.yPosUpdate = this.yPosUpdate * -1
    }

    canvasContext2d.fillStyle = point.fillStyle
    canvasContext2d.beginPath()
    canvasContext2d.arc(...point.arc)
    canvasContext2d.fill()

    const [radius, startAngle, endAngle] = point.arc.slice(2)

    this.setState({
      point: {
        ...point,
        arc: numericTuple<Arc>(
          x + this.xPosUpdate,
          y + this.yPosUpdate,
          radius,
          startAngle,
          endAngle
        ),
      },
    })
  }
}

export { Particle }
