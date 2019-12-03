export default class CopyArea {
  constructor (u, v, x, y, width, height) {
    this.u = u | 0
    this.v = v | 0
    this.x = x | 0
    this.y = y | 0
    this.width = width | 0
    this.height = height | 0
  }

  IsEmpty () {
    return this.width == 0 || this.height == 0
  }
}
