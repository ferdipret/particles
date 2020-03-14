export type StartingCoords = [number, number]
export type Arc = [number, number, number, number, number]

export interface Point {
  readonly fillStyle: string
  readonly arc: Arc
}
