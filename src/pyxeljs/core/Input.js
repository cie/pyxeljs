'use strict'
import {
  KEY_COUNT,
  DOM_KEY_TABLE,
  MOUSE_LEFT_BUTTON
} from './constants.js'

export default class Input {
  constructor (window) {
    this.is_mouse_visible = false

    this.key_state = []
    for (let i = 0; i < KEY_COUNT; i++) {
      this.key_state[i] = 0
    }

    const screen_scale = window.ScreenScale()
    window.canvas_container.addEventListener('mousemove', event => {
      const canvas = window.canvas.getBoundingClientRect()
      const canvas_container = window.canvas_container.getBoundingClientRect()
      this._mouse_x = (event.clientX - canvas.left) / screen_scale
      this._mouse_y = (event.clientY - canvas.top) / screen_scale
    })
    window.canvas_container.addEventListener('keydown', event => {
      const i = DOM_KEY_TABLE.indexOf(event.code)
      if (~i) UpdateKeyState(i, true)
    })
    window.canvas_container.addEventListener('keyup', event => {
      const i = DOM_KEY_TABLE.indexOf(event.code)
      if (~i) UpdateKeyState(i, true)
    })
    window.canvas_container.addEventListener('mousedown', event => {
      if (event.button >= 0 && event.button <= 2) {
        UpdateKeyState(MOUSE_LEFT_BUTTON + event.button, true)
      }
    })
    window.canvas_container.addEventListener('mouseup', event => {
      if (event.button >= 0 && event.button <= 2) {
        UpdateKeyState(MOUSE_LEFT_BUTTON + event.button, false)
      }
    })
  }

  Update (window, frame_count) {
    this.frame_count = frame_count + 1 // change frame_count to start from 1

    Sk.importModule('pyxel').$d['mouse_x'] = Sk.ffi.remapToPy(this._mouse_x)
    Sk.importModule('pyxel').$d['mouse_y'] = Sk.ffi.remapToPy(this._mouse_y)

    if (this.is_mouse_visible) {
      window.canvas_container.style.cursor = ''
    } else {
      window.canvas_container.style.cursor = 'none'
    }
  }

  IsButtonOn (key) {
    if (key < 0 || key >= KEY_COUNT) {
      PYXEL_ERROR('invalid key')
    }

    return this.key_state[key] > 0
  }

  IsButtonPressed (key, hold_frame, period_frame) {
    if (key < 0 || key >= KEY_COUNT) {
      PYXEL_ERROR('invalid key')
    }

    const press_frame = this.key_state[key]

    if (press_frame == this.frame_count) {
      return true
    }

    if (press_frame <= 0 || period_frame <= 0) {
      return false
    }

    const elapsed_frame = this.frame_count - (press_frame + hold_frame)

    if (elapsed_frame >= 0 && elapsed_frame % period_frame == 0) {
      return true
    }

    return false
  }

  IsButtonReleased (key) {
    if (key < 0 || key >= KEY_COUNT) {
      PYXEL_ERROR('invalid key')
    }

    return this.key_state[key] == -this.frame_count
  }

  SetMouseVisible (is_visible) {
    this.is_mouse_visible = is_visible
  }
}
