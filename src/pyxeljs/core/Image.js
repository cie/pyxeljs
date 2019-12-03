import Rectangle from './Rectangle.js'
import CopyArea from './CopyArea.js'
import { COLOR_COUNT } from './constants.js'
import { PYXEL_ERROR } from './common.js'
export default class Image {
  constructor (width, height) {
    width = width | 0
    height = height | 0
    if (width < 1 || height < 1) {
      PYXEL_ERROR('invalid image size')
    }

    this.width = width
    this.height = height
    this.rect = new Rectangle(0, 0, width, height)

    const buffer = (this.buffer = new ArrayBuffer(width * height * 4))
    this.data = []
    for (let i = 0; i < height; i++) {
      this.data[i] = new Int32Array(buffer, i * width * 4, width)
    }
  }
  GetValue (x, y) {
    x = x | 0
    y = y | 0
    if (!this.rect.Includes(x, y)) {
      PYXEL_ERROR('access to outside image')
    }
    return this.data[y][x] | 0
  }
  SetValue (x, y, value) {
    x = x | 0
    y = y | 0
    value = value | 0
    if (!this.rect.Includes(x, y)) {
      return
    }

    if (value < 0 || value >= COLOR_COUNT) {
      PYXEL_ERROR('invalid value')
    }

    this.data[y][x] = value
  }

  SetData (x, y, image_string) {
    const width = image_string[0].length
    const height = image_string.length

    if (width < 1 || height < 1) {
      PYXEL_ERROR('invalid value size')
    }

    const image = new Image(width, height)
    const dst_data = image.data

    for (let i = 0; i < height; i++) {
      const str = image_string[i]
      const dst_line = dst_data[i]

      for (let j = 0; j < width; j++) {
        const value = Number.parseInt(str.substr(j, 1), 16)

        if (value < 0 || value >= COLOR_COUNT) {
          PYXEL_ERROR('invalid value')
        }

        dst_line[j] = value
      }
    }

    this.CopyImage(x, y, image, 0, 0, width, height)
  }

  async LoadImage (x, y, filename) {
    var image = new window.Image()
    await new Promise((resolve, reject) => {
      image.onload = function () {
        resolve()
      }
      image.onerror = function () {
        reject('Could not load image ' + filename)
      }
      image.src = filename
    })
    const width = image.width | 0
    const height = image.height | 0
    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)
    const imageData = ctx.getImageData(0, 0, width, height)
    const src_data = imageData.data

    const src_width = width * 4

    const dst_image = new Image(width, height)
    const dst_data = dst_image.data

    for (let i = 0; i < height; i++) {
      const src_index = src_width * i
      const dst_line = dst_data[i]

      for (let j = 0; j < width; j++) {
        const src_r = src_data[src_index + j * 4 + 0]
        const src_g = src_data[src_index + j * 4 + 1]
        const src_b = src_data[src_index + j * 4 + 2]

        let nearest_color = 0
        let nearest_color_dist = 2147483647

        for (let k = 0; k < COLOR_COUNT; k++) {
          const color = s_system.palette_color[k]
          const pal_r = (color >> 16) & 0xff
          const pal_g = (color >> 8) & 0xff
          const pal_b = color & 0xff
          const color_dist =
            Math.abs(src_r - pal_r) +
            Math.abs(src_g - pal_g) +
            Math.abs(src_b - pal_b)

          if (color_dist < nearest_color_dist) {
            nearest_color = k
            nearest_color_dist = color_dist
          }
        }

        dst_line[j] = nearest_color
      }
    }
    this.CopyImage(x, y, dst_image, 0, 0, width, height)
  }
  CopyImage (x, y, image, u, v, width, height) {
    x = x | 0
    y = y | 0
    u = u | 0
    width = width | 0
    height = height | 0
    const copy_area = this.rect.GetCopyArea(
      x,
      y,
      image.Rectangle(),
      u,
      v,
      width,
      height
    )

    if (copy_area.IsEmpty()) {
      return
    }

    const src_data = image.data
    const dst_data = this.data

    for (let i = 0; i < (copy_area.height | 0); i++) {
      const src_line = src_data[copy_area.v + i]
      const dst_line = dst_data[copy_area.y + i]

      for (let j = 0; j < (copy_area.width | 0); j++) {
        dst_line[copy_area.x + j] = src_line[copy_area.u + j]
      }
    }
  }
  Data () {
    return this.data
  }
  Rectangle () {
    return this.rect
  }
}
