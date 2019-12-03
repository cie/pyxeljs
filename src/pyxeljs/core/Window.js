import { MAX_SCREEN_RATIO } from './constants.js'
export default class Window {
  constructor (
    screen_width,
    screen_height,
    screen_scale,
    palette_color,
    border_width,
    border_color
  ) {
    this.screen_width = screen_width
    this.screen_height = screen_height
    this.screen_scale = screen_scale
    this.palette_color = palette_color
    this.border_color = border_color
    this.is_fullscreen = false

    this.canvas = document.getElementById(Sk.canvas)
    if (!this.canvas) throw 'Could not find canvas element'
    this.canvas_container = document.getElementById(Sk.canvas_container)
    if (!this.canvas_container) throw 'Could not find canvas_container element'

    if (this.screen_scale <= 0) {
      this.screen_scale = Math.floor(
        Math.max(
          Math.min(
            (canvas_container.offsetWidth - border_width * 2.0) /
              this.screen_width,
            (canvas_container.offsetHeight - border_width * 2.0) /
              this.screen_height
          ) * MAX_SCREEN_RATIO,
          1.0
        )
      )
    }

    this.canvas_container.style.backgroundColor =
      '#' + border_color.toString(16)
    this.canvas.width = screen_width * this.screen_scale
    this.canvas.height = screen_height * this.screen_scale

    this.helperCanvas = document.createElement('canvas')
    this.helperCanvas.width = screen_width
    this.helperCanvas.height = screen_height
    // DEBUG:
    //this.canvas_container.appendChild(this.helperCanvas)
    this.ctx = this.canvas.getContext('2d')
    this.ctx.imageSmoothingEnabled = false
    this.helperCtx = this.helperCanvas.getContext('2d')

    // these are not needed - we do not create the window
    //const window_width =
    //this.screen_width * this.screen_scale + border_width * 2
    //const window_height =
    //this.screen_height * this.screen_scale + border_width * 2
  }

  Render (screen_data) {
    const { screen_width, screen_height, screen_scale } = this
    this.UpdateScreenTexture(screen_data)
    this.ctx.drawImage(
      this.helperCanvas,
      0,
      0,
      screen_width,
      screen_height,
      0,
      0,
      screen_width * screen_scale,
      screen_height * screen_scale
    )
  }

  UpdateScreenTexture (screen_data) {
    const imageData = this.helperCtx.getImageData(
      0,
      0,
      this.screen_width,
      this.screen_height
    )
    const { screen_width, screen_height, palette_color } = this
    const data = imageData.data
    for (let i = 0; i < screen_height; i++) {
      const index = screen_width * i * 4
      for (let j = 0; j < screen_width; j++) {
        const c = palette_color[screen_data[i][j]]
        data[index + j * 4 + 0] = c >> 16
        data[index + j * 4 + 1] = (c >> 8) & 0xff
        data[index + j * 4 + 2] = c & 0xff
        data[index + j * 4 + 3] = 0xff
      }
    }
    this.helperCtx.putImageData(imageData, 0, 0)
  }
}
