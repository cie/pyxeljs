import {
  TOTAL_IMAGE_BANK_COUNT,
  TILEMAP_BANK_COUNT,
  TILEMAP_BANK_WIDTH,
  TILEMAP_BANK_HEIGHT,
  TILEMAP_CHIP_WIDTH,
  TILEMAP_CHIP_HEIGHT,
  IMAGE_BANK_WIDTH,
  IMAGE_BANK_HEIGHT,
  IMAGE_BANK_FOR_SYSTEM,
  USER_IMAGE_BANK_COUNT,
  IMAGE_BANK_FOR_SCREEN,
  FONT_COLOR,
  FONT_WIDTH,
  FONT_HEIGHT,
  FONT_ROW_COUNT,
  FONT_X,
  FONT_Y,
  FONT_DATA,
  MIN_FONT_CODE,
  MAX_FONT_CODE,
  MOUSE_CURSOR_X,
  MOUSE_CURSOR_Y,
  MOUSE_CURSOR_DATA,
  COLOR_COUNT
} from './constants.js'
import Image from './Image.js'
import Rectangle from './Rectangle.js'
import Tilemap from './Tilemap.js'
import { PYXEL_ERROR } from './common.js'
export default class Graphics {
  constructor (width, height) {
    this.image_bank = []
    for (let i = 0; i < TOTAL_IMAGE_BANK_COUNT; i++) {
      this.image_bank[i] = new Image(IMAGE_BANK_WIDTH, IMAGE_BANK_HEIGHT)
    }
    this.tilemap_bank = []
    for (let i = 0; i < TILEMAP_BANK_COUNT; i++) {
      this.tilemap_bank[i] = new Tilemap(
        TILEMAP_BANK_WIDTH,
        TILEMAP_BANK_HEIGHT
      )
    }
    this.screen_width = width
    this.screen_height = height
    this.screen_data = this.image_bank[IMAGE_BANK_FOR_SCREEN].Data()

    this.SetupMouseCursor()
    this.SetupFont()

    this.ResetClipArea()
    this.ResetPalette()
    this.ClearScreen(0)
  }
  GetImageBank (image_index, system) {
    if (image_index < 0 || image_index >= TOTAL_IMAGE_BANK_COUNT) {
      PYXEL_ERROR('invalid image index')
    }

    if (image_index >= USER_IMAGE_BANK_COUNT && !system) {
      PYXEL_ERROR('access to image bank for system')
    }

    return this.image_bank[Sk.ffi.remapToJs(image_index)]
  }
  ResetClipArea () {
    this.clip_area = new Rectangle(0, 0, this.screen_width, this.screen_height)
  }
  SetClipArea (x, y, width, height) {
    this.clip_area = new Rectangle(
      0,
      0,
      this.screen_width,
      this.screen_height
    ).Intersect(new Rectangle(x, y, width, height))
  }
  ResetPalette () {
    this.palette_table = []

    for (let i = 0; i < COLOR_COUNT; i++) {
      this.palette_table[i] = i
    }
  }
  SetPalette (src_color, dst_color) {
    if (
      src_color < 0 ||
      src_color >= COLOR_COUNT ||
      dst_color < 0 ||
      dst_color >= COLOR_COUNT
    ) {
      PYXEL_ERROR('invalid color')
    }

    this.palette_table[src_color] = dst_color
  }

  ClearScreen (color) {
    const draw_color = this.GetDrawColor(color)

    for (let i = 0; i < this.screen_height; i++) {
      const dst_line = this.screen_data[i]

      for (let j = 0; j < this.screen_width; j++) {
        dst_line[j] = draw_color
      }
    }
  }

  DrawPoint (x, y, color) {
    this.SetPixel(x, y, this.GetDrawColor(color))
  }

  DrawLine (x1, y1, x2, y2, color) {
    const draw_color = this.GetDrawColor(color)

    if (x1 == x2 && y1 == y2) {
      this.SetPixel(x1, y1, draw_color)
      return
    }

    if (Math.abs(x1 - x2) > Math.abs(y1 - y2)) {
      let start_x, start_y
      let end_x, end_y

      if (x1 < x2) {
        start_x = x1
        start_y = y1
        end_x = x2
        end_y = y2
      } else {
        start_x = x2
        start_y = y2
        end_x = x1
        end_y = y1
      }

      let length = end_x - start_x + 1
      let alpha = (end_y - start_y) / (end_x - start_x)

      for (let i = 0; i < length; i++) {
        this.SetPixel(start_x + i, start_y + alpha * i + 0.5, draw_color)
      }
    } else {
      let start_x, start_y
      let end_x, end_y

      if (y1 < y2) {
        start_x = x1
        start_y = y1
        end_x = x2
        end_y = y2
      } else {
        start_x = x2
        start_y = y2
        end_x = x1
        end_y = y1
      }

      let length = end_y - start_y + 1
      let alpha = (end_x - start_x) / (end_y - start_y)

      for (let i = 0; i < length; i++) {
        this.SetPixel(start_x + alpha * i + 0.5, start_y + i, draw_color)
      }
    }
  }

  DrawRectangle (x, y, width, height, color) {
    const draw_color = this.GetDrawColor(color)
    const draw_rect = new Rectangle(x, y, width, height).Intersect(
      this.clip_area
    )

    if (draw_rect.IsEmpty()) {
      return
    }

    const left = draw_rect.Left()
    const top = draw_rect.Top()
    const right = draw_rect.Right()
    const bottom = draw_rect.Bottom()

    for (let i = top; i <= bottom; i++) {
      const dst_line = this.screen_data[i]

      for (let j = left; j <= right; j++) {
        dst_line[j] = draw_color
      }
    }
  }

  DrawRectangleBorder (x, y, width, height, color) {
    const draw_color = this.GetDrawColor(color)
    const draw_rect = new Rectangle(x, y, width, height)

    if (draw_rect.Intersect(this.clip_area).IsEmpty()) {
      return
    }

    const left = draw_rect.Left()
    const top = draw_rect.Top()
    const right = draw_rect.Right()
    const bottom = draw_rect.Bottom()

    for (let i = left; i <= right; i++) {
      this.SetPixel(i, top, draw_color)
      this.SetPixel(i, bottom, draw_color)
    }

    for (let i = top; i <= bottom; i++) {
      this.SetPixel(left, i, draw_color)
      this.SetPixel(right, i, draw_color)
    }
  }

  DrawCircle (x, y, radius, color) {
    draw_color = this.GetDrawColor(color)

    if (radius == 0) {
      this.SetPixel(x, y, draw_color)
      return
    }

    const sq_radius = radius * radius

    for (let dx = 0; dx <= radius; dx++) {
      let dy = Math.sqrt(sq_radius - dx * dx) + 0.5

      if (dx > dy) {
        continue
      }

      for (let i = -dy; i <= dy; i++) {
        this.SetPixel(x - dx, y + i, draw_color)
        this.SetPixel(x + dx, y + i, draw_color)
        this.SetPixel(x + i, y - dx, draw_color)
        this.SetPixel(x + i, y + dx, draw_color)
      }
    }
  }

  DrawCircleBorder (x, y, radius, color) {
    const draw_color = this.GetDrawColor(color)

    if (radius == 0) {
      this.SetPixel(x, y, draw_color)
      return
    }

    const sq_radius = radius * radius

    for (let dx = 0; dx <= radius; dx++) {
      const dy = Math.sqrt(sq_radius - dx * dx) + 0.5

      if (dx > dy) {
        continue
      }

      this.SetPixel(x - dx, y - dy, draw_color)
      this.SetPixel(x + dx, y - dy, draw_color)
      this.SetPixel(x - dx, y + dy, draw_color)
      this.SetPixel(x + dx, y + dy, draw_color)

      this.SetPixel(x - dy, y - dx, draw_color)
      this.SetPixel(x + dy, y - dx, draw_color)
      this.SetPixel(x - dy, y + dx, draw_color)
      this.SetPixel(x + dy, y + dx, draw_color)
    }
  }

  DrawTriangle (x1, y1, x2, y2, x3, y3, color) {
    const draw_color = this.GetDrawColor(color)

    let t
    // rank as y3 > y2 > y1
    if (y1 > y2) {
      t = y2
      y2 = y1
      y1 = t
      t = x2
      x2 = x1
      x1 = t
    }
    if (y1 > y3) {
      t = y3
      y3 = y1
      y1 = t
      t = x3
      x3 = x1
      x1 = t
    }
    if (y2 > y3) {
      t = y3
      y3 = y2
      y2 = t
      t = x3
      x3 = x2
      x2 = t
    }
    // slide bottom-up from y1 to y3
    const alpha12 = y2 == y1 ? 0 : (x2 - x1) / (y2 - y1)
    const alpha13 = y3 == y1 ? 0 : (x3 - x1) / (y3 - y1)
    const alpha23 = y3 == y2 ? 0 : (x3 - x2) / (y3 - y2)
    const x_intersection = x1 + alpha13 * (y2 - y1) + 0.5
    const y_slider = y1
    for (; y_slider <= y2; y_slider++) {
      let x_slider, x_end

      if (x_intersection < x2) {
        x_slider = x_intersection + alpha13 * (y_slider - y2) + 0.5
        x_end = x2 + alpha12 * (y_slider - y2) + 0.5
      } else {
        x_slider = x2 + alpha12 * (y_slider - y2) + 0.5
        x_end = x_intersection + alpha13 * (y_slider - y2) + 0.5
      }

      for (; x_slider <= x_end; x_slider++) {
        this.SetPixel(x_slider, y_slider, draw_color)
      }
    }
    for (; y_slider <= y3; y_slider++) {
      let x_slider, x_end

      if (x_intersection < x2) {
        x_slider = x_intersection + alpha13 * (y_slider - y2) + 0.5
        x_end = x2 + alpha23 * (y_slider - y2) + 0.5
      } else {
        x_slider = x2 + alpha23 * (y_slider - y2) + 0.5
        x_end = x_intersection + alpha13 * (y_slider - y2) + 0.5
      }

      for (; x_slider <= x_end; x_slider++) {
        this.SetPixel(x_slider, y_slider, draw_color)
      }
    }
  }

  DrawTriangleBorder (x1, y1, x2, y2, x3, y3, color) {
    DrawLine(x1, y1, x2, y2, color)
    DrawLine(x1, y1, x3, y3, color)
    DrawLine(x2, y2, x3, y3, color)
  }

  DrawImage (x, y, image_index, u, v, width, height, color_key) {
    const image = this.GetImageBank(image_index, true)

    if (color_key != -1 && (color_key < 0 || color_key >= COLOR_COUNT)) {
      PYXEL_ERROR('invalid color')
    }

    const copy_area = this.clip_area.GetCopyArea(
      x,
      y,
      image.Rectangle(),
      u,
      v,
      Math.abs(width),
      Math.abs(height),
      width < 0,
      height < 0
    )

    if (copy_area.IsEmpty()) {
      return
    }

    const src_data = image.Data()
    const dst_data = this.screen_data

    let sign_x, sign_y
    let offset_x, offset_y

    if (width < 0) {
      sign_x = -1
      offset_x = copy_area.width - 1
    } else {
      sign_x = 1
      offset_x = 0
    }

    if (height < 0) {
      sign_y = -1
      offset_y = copy_area.height - 1
    } else {
      sign_y = 1
      offset_y = 0
    }

    for (let i = 0; i < copy_area.height; i++) {
      const src_line = src_data[copy_area.v + sign_y * i + offset_y]
      const dst_line = dst_data[copy_area.y + i]

      for (let j = 0; j < copy_area.width; j++) {
        const src_color = src_line[copy_area.u + sign_x * j + offset_x]

        if (src_color != color_key) {
          dst_line[copy_area.x + j] = this.palette_table[src_color]
        }
      }
    }
  }
  DrawTilemap (x, y, tilemap_index, u, v, width, height, color_key) {
    const tilemap = GetTilemapBank(tilemap_index)
    const image_index = tilemap.ImageIndex()

    const left = this.clip_area.Left() / TILEMAP_CHIP_WIDTH
    const top = this.clip_area.Top() / TILEMAP_CHIP_WIDTH
    const right =
      (this.clip_area.Right() + TILEMAP_CHIP_WIDTH - 1) / TILEMAP_CHIP_WIDTH
    const bottom =
      (this.clip_area.Bottom() + TILEMAP_CHIP_HEIGHT - 1) / TILEMAP_CHIP_HEIGHT
    const dst_rect = Rectangle(left, top, right - left + 1, bottom - top + 1)

    const copy_area = dst_rect.GetCopyArea(
      x / TILEMAP_CHIP_WIDTH,
      y / TILEMAP_CHIP_HEIGHT,
      tilemap.Rectangle(),
      u,
      v,
      width,
      height
    )

    if (copy_area.IsEmpty()) {
      return
    }

    const src_data = tilemap.Data()

    copy_area.x = copy_area.x * TILEMAP_CHIP_WIDTH + (x % TILEMAP_CHIP_WIDTH)
    copy_area.y = copy_area.y * TILEMAP_CHIP_HEIGHT + (y % TILEMAP_CHIP_HEIGHT)

    for (let i = 0; i < copy_area.height; i++) {
      const src_line = src_data[copy_area.v + i]
      const dst_y = copy_area.y + TILEMAP_CHIP_HEIGHT * i

      for (let j = 0; j < copy_area.width; j++) {
        const chip = src_line[copy_area.u + j]
        const cu =
          (chip % (IMAGE_BANK_WIDTH / TILEMAP_CHIP_WIDTH)) * TILEMAP_CHIP_WIDTH
        const cv =
          (chip / (IMAGE_BANK_HEIGHT / TILEMAP_CHIP_HEIGHT)) *
          TILEMAP_CHIP_HEIGHT

        DrawImage(
          copy_area.x + TILEMAP_CHIP_WIDTH * j,
          dst_y,
          image_index,
          cu,
          cv,
          TILEMAP_CHIP_WIDTH,
          TILEMAP_CHIP_HEIGHT,
          color_key
        )
      }
    }
  }

  DrawText (x, y, text, color) {
    const draw_color = this.GetDrawColor(color)
    const cur_color = this.palette_table[FONT_COLOR]
    this.palette_table[FONT_COLOR] = draw_color

    const left = x

    for (let i = 0; i < text.length; ++i) {
      const ch = text.codePointAt(i)
      if (ch == 10) {
        // new line
        x = left
        y += FONT_HEIGHT
        continue
      }

      if (ch == 32) {
        // space
        x += FONT_WIDTH
        continue
      }

      if (ch < MIN_FONT_CODE || ch > MAX_FONT_CODE) {
        continue
      }

      const code = ch - MIN_FONT_CODE
      const u = (code % FONT_ROW_COUNT) * FONT_WIDTH
      const v = Math.floor(code / FONT_ROW_COUNT) * FONT_HEIGHT

      this.DrawImage(
        x,
        y,
        IMAGE_BANK_FOR_SYSTEM,
        FONT_X + u,
        FONT_Y + v,
        FONT_WIDTH,
        FONT_HEIGHT,
        0
      )

      x += FONT_WIDTH
    }

    this.palette_table[FONT_COLOR] = cur_color
  }

  SetupMouseCursor () {
    this.image_bank[IMAGE_BANK_FOR_SYSTEM].SetData(
      MOUSE_CURSOR_X,
      MOUSE_CURSOR_Y,
      MOUSE_CURSOR_DATA
    )
  }

  SetupFont () {
    const FONT_COUNT = FONT_DATA.length
    const dst_data = this.image_bank[IMAGE_BANK_FOR_SYSTEM].Data()

    for (let i = 0; i < FONT_COUNT; i++) {
      const row = Math.floor(i / FONT_ROW_COUNT)
      const col = i % FONT_ROW_COUNT
      let font = FONT_DATA[i]

      for (let j = 0; j < FONT_HEIGHT; j++) {
        const dst_line = dst_data[FONT_Y + FONT_HEIGHT * row + j]

        for (let k = 0; k < FONT_WIDTH; k++) {
          dst_line[FONT_X + FONT_WIDTH * col + k] =
            font & 0x800000 ? FONT_COLOR : 0
          font <<= 1
        }
      }
    }
  }

  GetDrawColor (color) {
    return this.palette_table[color]
  }
  ScreenImage () {
    return this.image_bank[IMAGE_BANK_FOR_SCREEN]
  }
  SetPixel(x, y, draw_color) {
    x = Math.floor(x)
    y = Math.floor(y)
    if (this.clip_area.Includes(x, y)) {
      this.screen_data[y][x] = draw_color;
    }
  }
}
