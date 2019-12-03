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
  ResetPalette () {
    this.palette_table = []

    for (let i = 0; i < COLOR_COUNT; i++) {
      this.palette_table[i] = i
    }
  }
  ResetClipArea () {
    this.clip_area = new Rectangle(0, 0, this.screen_width, this.screen_height)
  }
  GetDrawColor (color) {
    return this.palette_table[color]
  }

  ClearScreen (col) {}
  ScreenImage () {
    return this.image_bank[IMAGE_BANK_FOR_SCREEN]
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
}
