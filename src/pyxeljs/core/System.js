import { MAX_SCREEN_SIZE, MAX_FRAME_SKIP_COUNT } from './constants.js'
import { PYXEL_ERROR } from './common.js'
import Input from './Input.js'
import Graphics from './Graphics.js'
import Window from './Window.js'
import Resource from './Resource.js'
import Audio from './Audio.js'

export default class System {
  constructor (
    width,
    height,
    caption,
    scale,
    palette_color,
    fps,
    border_width,
    border_color,
    quit_key
  ) {
    if (
      width < 1 ||
      width > MAX_SCREEN_SIZE ||
      height < 1 ||
      height > MAX_SCREEN_SIZE
    ) {
      PYXEL_ERROR('invalid screen size')
    }
    if (fps < 1) {
      PYXEL_ERROR('invalid fps')
    }
    this.width = width
    this.height = height
    Sk.importModule('pyxel').$d['width'] = Sk.ffi.remapToPy(width)
    Sk.importModule('pyxel').$d['height'] = Sk.ffi.remapToPy(height)
    this.graphics = new Graphics(width, height)
    this.audio = new Audio()
    this.resource = new Resource()
    this.window = new Window(
      width,
      height,
      scale,
      palette_color,
      border_width,
      border_color
    )
    this.input = new Input(this.window)
    this.palette_color = palette_color
    this.fps = fps
    this.quit_key = quit_key
    this.frame_count = 0
    this.one_frame_time = 1000 / fps
    this.next_update_time = Date.now()
    this.is_update_suspended = false
  }

  Width () {
    return this.width
  }
  Height () {
    return this.width
  }
  FrameCount () {
    return this.frame_count
  }

  async Run (update, draw) {
    this.next_update_time = Date.now() + this.one_frame_time
    this.UpdateFrame(update)
    this.DrawFrame(draw)
    Sk.interrupters = Sk.interrupters || []
    let interrupted = false
    Sk.interrupters.push(() => {
      interrupted = true
    })
    while (true) {
      const sleep_time = await this.WaitForUpdateTime()
      if (interrupted) throw new Sk.builtin.SystemExit()
      let update_frame_count
      if (this.is_update_suspended) {
        this.is_update_suspended = false
        update_frame_count = 1
        this.next_update_time = Date.now() + this.one_frame_time
      } else {
        update_frame_count =
          Math.min(
            Math.floor(-sleep_time / this.one_frame_time),
            MAX_FRAME_SKIP_COUNT
          ) + 1
        this.next_update_time += this.one_frame_time * update_frame_count
      }
      for (let i = 0; i < update_frame_count; i++) {
        this.frame_count++
        Sk.importModule('pyxel').$d['frame_count'] = Sk.ffi.remapToPy(
          this.frame_count
        )
        await this.UpdateFrame(update)
      }
      await this.DrawFrame(draw)
    }
  }

  Quit () {
    throw new Sk.builtins.SystemExit()
  }

  async WaitForUpdateTime () {
    // XXX we are doing a simpler algorithm here than in pyxel
    // Maybe pyxel does not trust SDL_Delay as much as we trust setTimeout?
    await this._sleep(this.next_update_time - Date.now())
    return this.next_update_time - Date.now()
  }

  _sleep (t) {
    return new Promise(resolve => Sk.setTimeout(resolve, t))
  }

  async UpdateFrame (update) {
    this.input.Update(this.window, this.frame_count)
    if (update) await update()
  }

  async DrawFrame (draw) {
    if (draw) await draw()
    this.DrawMouseCursor()
    this.window.Render(this.graphics.ScreenImage().data)
  }

  async FlipScreen() {
    await this.WaitForUpdateTime();
    this.next_update_time += this.one_frame_time;
  
    this.frame_count++;
    this.UpdateFrame(null);
    this.DrawFrame(null);
  }
  
  async ShowScreen() {
    while (true) {
      await this.FlipScreen();
    }
  }


  DrawMouseCursor () {
    //TODO
  }
}
