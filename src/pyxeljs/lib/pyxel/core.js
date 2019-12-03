import System from '../../core/System.js'
window.pyxel = {
  System
}

Sk.builtinFiles.files['src/lib/pyxel/core.js'] = `
var $builtinmodule = ${function (name) {
  var mod = {}

  mod.width_getter = new Sk.builtin.func(function () {
    return Sk.ffi.remapToPy(s_system.Width())
  })

  mod.height_getter = new Sk.builtin.func(function () {
    return Sk.ffi.remapToPy(s_system.Height())
  })

  mod.frame_count_getter = new Sk.builtin.func(function () {
    return Sk.ffi.remapToPy(s_system.FrameCount())
  })

  mod.init = new Sk.builtin.func(function (
    width,
    height,
    caption,
    scale,
    palette,
    fps,
    border_width,
    border_color,
    quit_key
  ) {
    s_system = new pyxel.System(
      Sk.ffi.remapToJs(width),
      Sk.ffi.remapToJs(height),
      Sk.ffi.remapToJs(caption),
      Sk.ffi.remapToJs(scale),
      Sk.ffi.remapToJs(palette),
      Sk.ffi.remapToJs(fps),
      Sk.ffi.remapToJs(border_width),
      Sk.ffi.remapToJs(border_color),
      Sk.ffi.remapToJs(quit_key)
    )
    s_graphics = s_system.graphics
    s_audio = s_system.audio
    s_input = s_system.input
    s_resource = s_system.resource
  })
  mod.run = new Sk.builtin.func(function (update, draw) {
    return Sk.misceval.promiseToSuspension(
      s_system.Run(
        () => Sk.misceval.asyncToPromise(() => Sk.misceval.callsim(update)),
        () => Sk.misceval.asyncToPromise(() => Sk.misceval.callsim(draw))
      )
    )
  })

  mod.quit = new Sk.builtin.func(function () {
    s_system.Quit()
  })

  mod.flip = new Sk.builtin.func(function () {
    s_system.FlipScreen()
  })

  mod.show = new Sk.builtin.func(function () {
    s_system.ShowScreen()
  })

  mod._drop_file_getter = new Sk.builtin.func(function (str, str_length) {
    strncpy(str, s_system.DropFile().c_str(), str_length)
  })

  mod._caption = new Sk.builtin.func(function (caption) {
    s_system.SetCaption(Sk.ffi.remapToJs(caption))
  })

  //
  // Resource
  //
  mod.save = new Sk.builtin.func(function (filename) {
    s_resource.SaveAsset(Sk.ffi.remapToJs(filename))
  })

  mod.load = new Sk.builtin.func(function (
    filename,
    image,
    tilemap,
    sound,
    music
  ) {
    s_resource.LoadAsset(
      Sk.ffi.remapToJs(filename),
      Sk.ffi.remapToJs(image),
      Sk.ffi.remapToJs(tilemap),
      Sk.ffi.remapToJs(sound),
      Sk.ffi.remapToJs(music)
    )
  })

  //
  // Input
  //
  mod.mouse_x_getter = new Sk.builtin.func(function () {
    return Sk.ffi.remapToPy(s_input.MouseX())
  })

  mod.mouse_y_getter = new Sk.builtin.func(function () {
    return Sk.ffi.remapToPy(s_input.MouseY())
  })

  mod.btn = new Sk.builtin.func(function (key) {
    return Sk.ffi.remapToPy(s_input.IsButtonOn(Sk.ffi.remapToJs(key)))
  })

  mod.btnp = new Sk.builtin.func(function (key, hold, period) {
    return Sk.ffi.remapToPy(
      s_input.IsButtonPressed(
        Sk.ffi.remapToJs(key),
        Sk.ffi.remapToJs(hold),
        Sk.ffi.remapToJs(period)
      )
    )
  })

  mod.btnr = new Sk.builtin.func(function (key) {
    return Sk.ffi.remapToPy(s_input.IsButtonReleased(Sk.ffi.remapToJs(key)))
  })

  mod.mouse = new Sk.builtin.func(function (visible) {
    s_input.SetMouseVisible(Sk.ffi.remapToJs(visible))
  })

  //
  // Graphics
  //
  mod.image = new Sk.builtin.func(function (img, system) {
    return s_graphics.GetImageBank(
      Sk.ffi.remapToJs(img),
      Sk.ffi.remapToJs(system)
    )
  })

  mod.tilemap = new Sk.builtin.func(function (tm) {
    return s_graphics.GetTilemapBank(Sk.ffi.remapToJs(tm))
  })

  mod.clip0 = new Sk.builtin.func(function () {
    s_graphics.ResetClipArea()
  })

  mod.clip = new Sk.builtin.func(function (x, y, w, h) {
    s_graphics.SetClipArea(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      Sk.ffi.remapToJs(w),
      Sk.ffi.remapToJs(h)
    )
  })

  mod.pal0 = new Sk.builtin.func(function () {
    s_graphics.ResetPalette()
  })

  mod.pal = new Sk.builtin.func(function (col1, col2) {
    s_graphics.SetPalette(Sk.ffi.remapToJs(col1), Sk.ffi.remapToJs(col2))
  })

  mod.cls = new Sk.builtin.func(function (col) {
    s_graphics.ClearScreen(Sk.ffi.remapToJs(col))
  })

  mod.pix = new Sk.builtin.func(function (x, y, col) {
    s_graphics.DrawPoint(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      Sk.ffi.remapToJs(col)
    )
  })

  mod.line = new Sk.builtin.func(function (x1, y1, x2, y2, col) {
    s_graphics.DrawLine(
      Sk.ffi.remapToJs(x1),
      Sk.ffi.remapToJs(y1),
      Sk.ffi.remapToJs(x2),
      Sk.ffi.remapToJs(y2),
      Sk.ffi.remapToJs(col)
    )
  })

  mod.rect = new Sk.builtin.func(function (x, y, w, h, col) {
    s_graphics.DrawRectangle(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      Sk.ffi.remapToJs(w),
      Sk.ffi.remapToJs(h),
      Sk.ffi.remapToJs(col)
    )
  })

  mod.rectb = new Sk.builtin.func(function (x, y, w, h, col) {
    s_graphics.DrawRectangleBorder(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      Sk.ffi.remapToJs(w),
      Sk.ffi.remapToJs(h),
      Sk.ffi.remapToJs(col)
    )
  })

  mod.circ = new Sk.builtin.func(function (x, y, r, col) {
    s_graphics.DrawCircle(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      Sk.ffi.remapToJs(r),
      Sk.ffi.remapToJs(col)
    )
  })

  mod.circb = new Sk.builtin.func(function (x, y, r, col) {
    s_graphics.DrawCircleBorder(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      Sk.ffi.remapToJs(r),
      Sk.ffi.remapToJs(col)
    )
  })

  mod.tri = new Sk.builtin.func(function (x1, y1, x2, y2, x3, y3, col) {
    s_graphics.DrawTriangle(
      Sk.ffi.remapToJs(x1),
      Sk.ffi.remapToJs(y1),
      Sk.ffi.remapToJs(x2),
      Sk.ffi.remapToJs(y2),
      Sk.ffi.remapToJs(x3),
      Sk.ffi.remapToJs(y3),
      Sk.ffi.remapToJs(col)
    )
  })

  mod.trib = new Sk.builtin.func(function (x1, y1, x2, y2, x3, y3, col) {
    s_graphics.DrawTriangleBorder(
      Sk.ffi.remapToJs(x1),
      Sk.ffi.remapToJs(y1),
      Sk.ffi.remapToJs(x2),
      Sk.ffi.remapToJs(y2),
      Sk.ffi.remapToJs(x3),
      Sk.ffi.remapToJs(y3),
      Sk.ffi.remapToJs(col)
    )
  })

  mod.blt = new Sk.builtin.func(function (x, y, img, u, v, w, h, colkey) {
    s_graphics.DrawImage(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      Sk.ffi.remapToJs(img),
      Sk.ffi.remapToJs(u),
      Sk.ffi.remapToJs(v),
      Sk.ffi.remapToJs(w),
      Sk.ffi.remapToJs(h),
      Sk.ffi.remapToJs(colkey)
    )
  })

  mod.bltm = new Sk.builtin.func(function (x, y, tm, u, v, w, h, colkey) {
    s_graphics.DrawTilemap(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      Sk.ffi.remapToJs(tm),
      Sk.ffi.remapToJs(u),
      Sk.ffi.remapToJs(v),
      Sk.ffi.remapToJs(w),
      Sk.ffi.remapToJs(h),
      Sk.ffi.remapToJs(colkey)
    )
  })

  mod.text = new Sk.builtin.func(function (x, y, s, col) {
    s_graphics.DrawText(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      Sk.ffi.remapToJs(s),
      Sk.ffi.remapToJs(col)
    )
  })

  //
  // Audio
  //
  mod.sound = new Sk.builtin.func(function (snd, system) {
    return s_audio.GetSoundBank(Sk.ffi.remapToJs(snd), Sk.ffi.remapToJs(system))
  })

  mod.music = new Sk.builtin.func(function (msc) {
    return s_audio.GetMusicBank(Sk.ffi.remapToJs(msc))
  })

  mod.play_pos = new Sk.builtin.func(function (ch) {
    return Sk.ffi.remapToPy(s_audio.GetPlayPos(Sk.ffi.remapToJs(ch)))
  })

  mod.play1 = new Sk.builtin.func(function (ch, snd, loop) {
    s_audio.PlaySound(
      Sk.ffi.remapToJs(ch),
      Sk.ffi.remapToJs(snd),
      Sk.ffi.remapToJs(loop)
    )
  })

  mod.play = new Sk.builtin.func(function (ch, snd, snd_length, loop) {
    const sound_index_list = new SoundIndexList()
    const length = Sk.ffi.remapToJs(snd_length)
    for (let i = 0; i < length; i++) {
      sound_index_list.push_back(snd[i])
    }

    s_audio.PlaySound(
      Sk.ffi.remapToJs(ch),
      Sk.ffi.remapToJs(sound_index_list),
      Sk.ffi.remapToJs(loop)
    )
  })

  mod.playm = new Sk.builtin.func(function (msc, loop) {
    s_audio.PlayMusic(Sk.ffi.remapToJs(msc), Sk.ffi.remapToJs(loop))
  })

  mod.stop = new Sk.builtin.func(function (ch) {
    s_audio.StopPlaying(Sk.ffi.remapToJs(ch))
  })

  //
  // Image class
  //
  mod.image_width_getter = new Sk.builtin.func(function (IMAGE) {
    return Sk.ffi.remapToPy(IMAGE.Width())
  })

  mod.image_height_getter = new Sk.builtin.func(function (IMAGE) {
    return Sk.ffi.remapToPy(IMAGE.Height())
  })

  mod.image_data_getter = new Sk.builtin.func(function (IMAGE) {
    return Sk.ffi.remapToPy(IMAGE.Data())
  })

  mod.image_get = new Sk.builtin.func(function (IMAGE, x, y) {
    return Sk.ffi.remapToPy(
      IMAGE.GetValue(Sk.ffi.remapToJs(x), Sk.ffi.remapToJs(y))
    )
  })

  mod.image_set1 = new Sk.builtin.func(function (IMAGE, x, y, data) {
    IMAGE.SetValue(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      Sk.ffi.remapToJs(data)
    )
  })

  mod.image_set = new Sk.builtin.func(function (
    IMAGE,
    x,
    y,
    data,
    data_length
  ) {
    const image_string = new ImageString()
    data_length = Sk.ffi.remapToJs(data_length)
    data = Sk.ffi.remapToJs(data)
    for (let i = 0; i < data_length; i++) {
      image_string.push_back(data[i])
    }

    IMAGE.SetData(Sk.ffi.remapToJs(x), Sk.ffi.remapToJs(y), image_string)
  })

  mod.image_load = new Sk.builtin.func(function (IMAGE, x, y, filename) {
    return new Sk.misceval.promiseToSuspension(
      IMAGE.LoadImage(
        Sk.ffi.remapToJs(x),
        Sk.ffi.remapToJs(y),
        Sk.ffi.remapToJs(filename)
      ).then(x => Sk.ffi.remapToPy(x))
    )
  })

  mod.image_copy = new Sk.builtin.func(function (IMAGE, x, y, img, u, v, w, h) {
    IMAGE.CopyImage(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      s_graphics.GetImageBank(Sk.ffi.remapToJs(img), true),
      Sk.ffi.remapToJs(u),
      Sk.ffi.remapToJs(v),
      Sk.ffi.remapToJs(w),
      Sk.ffi.remapToJs(h)
    )
  })

  //
  // Tilemap class
  //
  mod.tilemap_width_getter = new Sk.builtin.func(function (TILEMAP) {
    return Sk.ffi.remapToPy(TILEMAP.Width())
  })

  mod.tilemap_height_getter = new Sk.builtin.func(function (TILEMAP) {
    return Sk.ffi.remapToPy(TILEMAP.Height())
  })

  mod.tilemap_data_getter = new Sk.builtin.func(function (TILEMAP) {
    return Sk.ffi.remapToPy(TILEMAP.Data())
  })

  mod.tilemap_refimg_getter = new Sk.builtin.func(function (TILEMAP) {
    return Sk.ffi.remapToPy(TILEMAP.ImageIndex())
  })

  mod.tilemap_refimg_setter = new Sk.builtin.func(function (TILEMAP, refimg) {
    TILEMAP.ImageIndex(Sk.ffi.remapToJs(refimg))
  })

  mod.tilemap_get = new Sk.builtin.func(function (TILEMAP, x, y) {
    return Sk.ffi.remapToPy(
      TILEMAP.GetValue(Sk.ffi.remapToJs(x), Sk.ffi.remapToJs(y))
    )
  })

  mod.tilemap_set1 = new Sk.builtin.func(function (TILEMAP, x, y, data) {
    TILEMAP.SetValue(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      Sk.ffi.remapToJs(data)
    )
  })

  mod.tilemap_set = new Sk.builtin.func(function (
    TILEMAP,
    x,
    y,
    data,
    data_length
  ) {
    const tilemap_string = new TilemapString()
    data_length = Sk.ffi.remapToJs(data_length)
    data = Sk.ffi.remapToJs(data)
    for (let i = 0; i < data_length; i++) {
      tilemap_string.push_back(data[i])
    }

    TILEMAP.SetData(Sk.ffi.remapToJs(x), Sk.ffi.remapToJs(y), tilemap_string)
  })

  mod.tilemap_copy = new Sk.builtin.func(function (
    TILEMAP,
    x,
    y,
    tm,
    u,
    v,
    w,
    h
  ) {
    TILEMAP.CopyTilemap(
      Sk.ffi.remapToJs(x),
      Sk.ffi.remapToJs(y),
      s_graphics.GetTilemapBank(Sk.ffi.remapToJs(tm)),
      Sk.ffi.remapToJs(u),
      Sk.ffi.remapToJs(v),
      Sk.ffi.remapToJs(w),
      Sk.ffi.remapToJs(h)
    )
  })

  //
  // Sound class
  //
  mod.sound_note_getter = new Sk.builtin.func(function (SOUND) {
    return Sk.ffi.remapToPy(SOUND.Note().data())
  })

  mod.sound_note_length_getter = new Sk.builtin.func(function (SOUND) {
    return Sk.ffi.remapToPy(SOUND.Note().size())
  })

  mod.sound_note_length_setter = new Sk.builtin.func(function (SOUND, length) {
    SOUND.Note().resize(Sk.ffi.remapToJs(length))
  })

  mod.sound_tone_getter = new Sk.builtin.func(function (SOUND) {
    return Sk.ffi.remapToPy(SOUND.Tone().data())
  })

  mod.sound_tone_length_getter = new Sk.builtin.func(function (SOUND) {
    return Sk.ffi.remapToPy(SOUND.Tone().size())
  })

  mod.sound_tone_length_setter = new Sk.builtin.func(function (SOUND, length) {
    SOUND.Tone().resize(Sk.ffi.remapToJs(length))
  })

  mod.sound_volume_getter = new Sk.builtin.func(function (SOUND) {
    return Sk.ffi.remapToPy(SOUND.Volume().data())
  })

  mod.sound_volume_length_getter = new Sk.builtin.func(function (SOUND) {
    return Sk.ffi.remapToPy(SOUND.Volume().size())
  })

  mod.sound_volume_length_setter = new Sk.builtin.func(function (
    SOUND,
    length
  ) {
    SOUND.Volume().resize(Sk.ffi.remapToJs(length))
  })

  mod.sound_effect_getter = new Sk.builtin.func(function (SOUND) {
    return Sk.ffi.remapToPy(SOUND.Effect().data())
  })

  mod.sound_effect_length_getter = new Sk.builtin.func(function (SOUND) {
    return Sk.ffi.remapToPy(SOUND.Effect().size())
  })

  mod.sound_effect_length_setter = new Sk.builtin.func(function (
    SOUND,
    length
  ) {
    SOUND.Effect().resize(Sk.ffi.remapToJs(length))
  })

  mod.sound_speed_getter = new Sk.builtin.func(function (SOUND) {
    return Sk.ffi.remapToPy(SOUND.Speed())
  })

  mod.sound_speed_setter = new Sk.builtin.func(function (SOUND, speed) {
    SOUND.Speed(Sk.ffi.remapToJs(speed))
  })

  mod.sound_set = new Sk.builtin.func(function (
    SOUND,
    note,
    tone,
    volume,
    effect,
    speed
  ) {
    SOUND.Set(
      Sk.ffi.remapToJs(note),
      Sk.ffi.remapToJs(tone),
      Sk.ffi.remapToJs(volume),
      Sk.ffi.remapToJs(effect),
      Sk.ffi.remapToJs(speed)
    )
  })

  mod.sound_set_note = new Sk.builtin.func(function (SOUND, note) {
    SOUND.SetNote(Sk.ffi.remapToJs(note))
  })

  mod.sound_set_tone = new Sk.builtin.func(function (SOUND, tone) {
    SOUND.SetTone(Sk.ffi.remapToJs(tone))
  })

  mod.sound_set_volume = new Sk.builtin.func(function (SOUND, volume) {
    SOUND.SetVolume(Sk.ffi.remapToJs(volume))
  })

  mod.sound_set_effect = new Sk.builtin.func(function (SOUND, effect) {
    SOUND.SetEffect(Sk.ffi.remapToJs(effect))
  })

  //
  // Music class
  //
  mod.music_ch0_getter = new Sk.builtin.func(function (MUSIC) {
    return Sk.ffi.remapToPy(MUSIC.Channel0().data())
  })

  mod.music_ch0_length_getter = new Sk.builtin.func(function (MUSIC) {
    return Sk.ffi.remapToPy(MUSIC.Channel0().size())
  })

  mod.music_ch0_length_setter = new Sk.builtin.func(function (MUSIC, length) {
    MUSIC.Channel0().resize(Sk.ffi.remapToJs(length))
  })

  mod.music_ch1_getter = new Sk.builtin.func(function (MUSIC) {
    return Sk.ffi.remapToPy(MUSIC.Channel1().data())
  })

  mod.music_ch1_length_getter = new Sk.builtin.func(function (MUSIC) {
    return Sk.ffi.remapToPy(MUSIC.Channel1().size())
  })

  mod.music_ch1_length_setter = new Sk.builtin.func(function (MUSIC, length) {
    MUSIC.Channel1().resize(Sk.ffi.remapToJs(length))
  })

  mod.music_ch2_getter = new Sk.builtin.func(function (MUSIC) {
    return Sk.ffi.remapToPy(MUSIC.Channel2().data())
  })

  mod.music_ch2_length_getter = new Sk.builtin.func(function (MUSIC) {
    return Sk.ffi.remapToPy(MUSIC.Channel2().size())
  })

  mod.music_ch2_length_setter = new Sk.builtin.func(function (MUSIC, length) {
    MUSIC.Channel2().resize(Sk.ffi.remapToJs(length))
  })

  mod.music_ch3_getter = new Sk.builtin.func(function (MUSIC) {
    return Sk.ffi.remapToPy(MUSIC.Channel3().data())
  })

  mod.music_ch3_length_getter = new Sk.builtin.func(function (MUSIC) {
    return Sk.ffi.remapToPy(MUSIC.Channel3().size())
  })

  mod.music_ch3_length_setter = new Sk.builtin.func(function (MUSIC, length) {
    MUSIC.Channel3().resize(Sk.ffi.remapToJs(length))
  })

  mod.music_set = new Sk.builtin.func(function (
    MUSIC,
    ch0,
    ch0_length,
    ch1,
    ch1_length,
    ch2,
    ch2_length,
    ch3,
    ch3_length
  ) {
    const sound_index_list0 = new SoundIndexList()
    for (let i = 0; i < ch0_length; i++) {
      sound_index_list0.push_back(ch0[i])
    }

    const sound_index_list1 = new SoundIndexList()
    for (let i = 0; i < ch1_length; i++) {
      sound_index_list1.push_back(ch1[i])
    }

    const sound_index_list2 = new SoundIndexList()
    for (let i = 0; i < ch2_length; i++) {
      sound_index_list2.push_back(ch2[i])
    }

    const sound_index_list3 = new SoundIndexList()
    for (let i = 0; i < ch3_length; i++) {
      sound_index_list3.push_back(ch3[i])
    }

    MUSIC.Set(
      sound_index_list0,
      sound_index_list1,
      sound_index_list2,
      sound_index_list3
    )
  })

  mod.btnp = new Sk.builtin.func(function (key, hold, period) {
    return Sk.ffi.remapToPy(
      s_input.IsButtonPressed(
        Sk.ffi.remapToJs(key),
        Sk.ffi.remapToJs(hold),
        Sk.ffi.remapToJs(period)
      )
    )
  })
  return mod
}}
`
