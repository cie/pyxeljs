import CopyArea from './CopyArea.js'
export default class Rectangle {
  constructor (left = 0, top = 0, width = 0, height = 0) {
    left = left | 0
    top = top | 0
    width = width | 0
    height = height | 0
    this.left = left
    this.top = top
    this.width = Math.max(width, 0)
    this.height = Math.max(height, 0)
    this.right = left + width - 1
    this.bottom = top + height - 1
  }

  Left () {
    return this.left
  }
  Top () {
    return this.top
  }
  Right () {
    return this.right
  }
  Bottom () {
    return this.bottom
  }
  Width () {
    return this.width
  }
  Height () {
    return this.height
  }

  IsEmpty () {
    return this.width == 0 || this.height == 0
  }
  Includes (x, y) {
    return (
      x >= this.left && x <= this.right && y >= this.top && y <= this.bottom
    )
  }

  Intersect (rect) {
    const left = Math.max(this.left, rect.left | 0)
    const top = Math.max(this.top, rect.top | 0)
    const right = Math.min(this.right, rect.right | 0)
    const bottom = Math.min(this.bottom, rect.bottom | 0)
    const width = right - left + 1
    const height = bottom - top + 1

    if (width > 0 && height > 0) {
      return new Rectangle(left, top, width, height)
    } else {
      return new Rectangle()
    }
  }

  GetCopyArea (x, y, src, u, v, width, height, flip_x, flip_y) {
    const left_cut = Math.max(src.left - u, this.left - x, 0)
    const right_cut = Math.max(
      u + width - 1 - src.right,
      x + width - 1 - this.right,
      0
    )
    const top_cut = Math.max(src.top - v, this.top - y, 0)
    const bottom_cut = Math.max(
      v + height - 1 - src.bottom,
      y + height - 1 - this.bottom,
      0
    )

    return new CopyArea(
      u + (flip_x ? right_cut : left_cut),
      v + (flip_y ? bottom_cut : top_cut),
      x + left_cut,
      y + top_cut,
      Math.max(width - left_cut - right_cut, 0),
      Math.max(height - top_cut - bottom_cut, 0)
    )
  }
}
