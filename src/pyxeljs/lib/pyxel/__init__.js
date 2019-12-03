'use strict'
import {
  VERSION,
  COLOR_COUNT,
  COLOR_BLACK,
  COLOR_NAVY,
  COLOR_PERPLE,
  COLOR_GREEN,
  COLOR_BROWN,
  COLOR_DARKGRAY,
  COLOR_LIGHTGRAY,
  COLOR_WHITE,
  COLOR_RED,
  COLOR_ORANGE,
  COLOR_YELLOW,
  COLOR_LIME,
  COLOR_CYAN,
  COLOR_STEELBLUE,
  COLOR_PINK,
  COLOR_PEACH,
  FONT_WIDTH,
  FONT_HEIGHT,
  FONT_DATA,
  USER_IMAGE_BANK_COUNT,
  MAX_SCREEN_SIZE,
  TOTAL_IMAGE_BANK_COUNT,
  IMAGE_BANK_FOR_SYSTEM,
  IMAGE_BANK_FOR_SCREEN,
  IMAGE_BANK_WIDTH,
  IMAGE_BANK_HEIGHT,
  TILEMAP_BANK_COUNT,
  USER_SOUND_BANK_COUNT,
  SOUND_BANK_FOR_SYSTEM,
  MUSIC_BANK_COUNT,
  MUSIC_CHANNEL_COUNT,
  RESOURCE_FILE_EXTENSION,
  DEFAULT_CAPTION,
  DEFAULT_SCALE,
  DEFAULT_PALETTE,
  DEFAULT_FPS,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_BORDER_COLOR,
  KEY_SPACE,
  KEY_QUOTE,
  KEY_COMMA,
  KEY_MINUS,
  KEY_PERIOD,
  KEY_SLASH,
  KEY_0,
  KEY_1,
  KEY_2,
  KEY_3,
  KEY_4,
  KEY_5,
  KEY_6,
  KEY_7,
  KEY_8,
  KEY_9,
  KEY_SEMICOLON,
  KEY_EQUAL,
  KEY_A,
  KEY_B,
  KEY_C,
  KEY_D,
  KEY_E,
  KEY_F,
  KEY_G,
  KEY_H,
  KEY_I,
  KEY_J,
  KEY_K,
  KEY_L,
  KEY_M,
  KEY_N,
  KEY_O,
  KEY_P,
  KEY_Q,
  KEY_R,
  KEY_S,
  KEY_T,
  KEY_U,
  KEY_V,
  KEY_W,
  KEY_X,
  KEY_Y,
  KEY_Z,
  KEY_LEFT_BRACKET,
  KEY_BACKSLASH,
  KEY_RIGHT_BRACKET,
  KEY_BACKQUOTE,
  KEY_ESCAPE,
  KEY_ENTER,
  KEY_TAB,
  KEY_BACKSPACE,
  KEY_INSERT,
  KEY_DELETE,
  KEY_RIGHT,
  KEY_LEFT,
  KEY_DOWN,
  KEY_UP,
  KEY_PAGE_UP,
  KEY_PAGE_DOWN,
  KEY_HOME,
  KEY_END,
  KEY_CAPS_LOCK,
  KEY_SCROLL_LOCK,
  KEY_NUM_LOCK,
  KEY_PRINT_SCREEN,
  KEY_PAUSE,
  KEY_F1,
  KEY_F2,
  KEY_F3,
  KEY_F4,
  KEY_F5,
  KEY_F6,
  KEY_F7,
  KEY_F8,
  KEY_F9,
  KEY_F10,
  KEY_F11,
  KEY_F12,
  KEY_KP_0,
  KEY_KP_1,
  KEY_KP_2,
  KEY_KP_3,
  KEY_KP_4,
  KEY_KP_5,
  KEY_KP_6,
  KEY_KP_7,
  KEY_KP_8,
  KEY_KP_9,
  KEY_KP_DECIMAL,
  KEY_KP_DIVIDE,
  KEY_KP_MULTIPLY,
  KEY_KP_SUBTRACT,
  KEY_KP_ADD,
  KEY_KP_ENTER,
  KEY_KP_EQUAL,
  KEY_LEFT_SHIFT,
  KEY_LEFT_CONTROL,
  KEY_LEFT_ALT,
  KEY_LEFT_SUPER,
  KEY_RIGHT_SHIFT,
  KEY_RIGHT_CONTROL,
  KEY_RIGHT_ALT,
  KEY_RIGHT_SUPER,
  KEY_MENU,
  KEY_SHIFT,
  KEY_CONTROL,
  KEY_ALT,
  KEY_SUPER,
  MOUSE_LEFT_BUTTON,
  MOUSE_MIDDLE_BUTTON,
  MOUSE_RIGHT_BUTTON,
  GAMEPAD_1_A,
  GAMEPAD_1_B,
  GAMEPAD_1_X,
  GAMEPAD_1_Y,
  GAMEPAD_1_LEFT_SHOULDER,
  GAMEPAD_1_RIGHT_SHOULDER,
  GAMEPAD_1_SELECT,
  GAMEPAD_1_START,
  GAMEPAD_1_UP,
  GAMEPAD_1_RIGHT,
  GAMEPAD_1_DOWN,
  GAMEPAD_1_LEFT,
  GAMEPAD_2_A,
  GAMEPAD_2_B,
  GAMEPAD_2_X,
  GAMEPAD_2_Y,
  GAMEPAD_2_LEFT_SHOULDER,
  GAMEPAD_2_RIGHT_SHOULDER,
  GAMEPAD_2_SELECT,
  GAMEPAD_2_START,
  GAMEPAD_2_UP,
  GAMEPAD_2_RIGHT,
  GAMEPAD_2_DOWN,
  GAMEPAD_2_LEFT
} from '../../core/constants.js'

Sk.builtinFiles.files['src/lib/pyxel/__init__.py'] = `
import sys
from . import core

VERSION = "${VERSION}"
COLOR_COUNT = ${COLOR_COUNT}
COLOR_BLACK = ${COLOR_BLACK}
COLOR_NAVY = ${COLOR_NAVY}
COLOR_PERPLE = ${COLOR_PERPLE}
COLOR_GREEN = ${COLOR_GREEN}
COLOR_BROWN = ${COLOR_BROWN}
COLOR_DARKGRAY = ${COLOR_DARKGRAY}
COLOR_LIGHTGRAY = ${COLOR_LIGHTGRAY}
COLOR_WHITE = ${COLOR_WHITE}
COLOR_RED = ${COLOR_RED}
COLOR_ORANGE = ${COLOR_ORANGE}
COLOR_YELLOW = ${COLOR_YELLOW}
COLOR_LIME = ${COLOR_LIME}
COLOR_CYAN = ${COLOR_CYAN}
COLOR_STEELBLUE = ${COLOR_STEELBLUE}
COLOR_PINK = ${COLOR_PINK}
COLOR_PEACH = ${COLOR_PEACH}
FONT_WIDTH = ${FONT_WIDTH}
FONT_HEIGHT = ${FONT_HEIGHT}
FONT_DATA = ${JSON.stringify(FONT_DATA)}
USER_IMAGE_BANK_COUNT = ${USER_IMAGE_BANK_COUNT}
MAX_SCREEN_SIZE = ${MAX_SCREEN_SIZE}
TOTAL_IMAGE_BANK_COUNT = ${TOTAL_IMAGE_BANK_COUNT}
IMAGE_BANK_FOR_SYSTEM = ${IMAGE_BANK_FOR_SYSTEM}
IMAGE_BANK_FOR_SCREEN = ${IMAGE_BANK_FOR_SCREEN}
IMAGE_BANK_WIDTH = ${IMAGE_BANK_WIDTH}
IMAGE_BANK_HEIGHT = ${IMAGE_BANK_HEIGHT}
TILEMAP_BANK_COUNT = ${TILEMAP_BANK_COUNT}
USER_SOUND_BANK_COUNT = ${USER_SOUND_BANK_COUNT}
SOUND_BANK_FOR_SYSTEM = ${SOUND_BANK_FOR_SYSTEM}
MUSIC_BANK_COUNT = ${MUSIC_BANK_COUNT}
MUSIC_CHANNEL_COUNT = ${MUSIC_CHANNEL_COUNT}
RESOURCE_FILE_EXTENSION = ${JSON.stringify(RESOURCE_FILE_EXTENSION)}

DEFAULT_CAPTION = ${JSON.stringify(RESOURCE_FILE_EXTENSION)}
DEFAULT_SCALE = ${DEFAULT_SCALE}
DEFAULT_PALETTE = ${JSON.stringify(DEFAULT_PALETTE)}
DEFAULT_FPS = ${DEFAULT_FPS}
DEFAULT_BORDER_WIDTH = ${DEFAULT_BORDER_WIDTH}
DEFAULT_BORDER_COLOR = ${DEFAULT_BORDER_COLOR}

KEY_SPACE = ${KEY_SPACE}
KEY_QUOTE = ${KEY_QUOTE}
KEY_COMMA = ${KEY_COMMA}
KEY_MINUS = ${KEY_MINUS}
KEY_PERIOD = ${KEY_PERIOD}
KEY_SLASH = ${KEY_SLASH}
KEY_0 = ${KEY_0}
KEY_1 = ${KEY_1}
KEY_2 = ${KEY_2}
KEY_3 = ${KEY_3}
KEY_4 = ${KEY_4}
KEY_5 = ${KEY_5}
KEY_6 = ${KEY_6}
KEY_7 = ${KEY_7}
KEY_8 = ${KEY_8}
KEY_9 = ${KEY_9}
KEY_SEMICOLON = ${KEY_SEMICOLON}
KEY_EQUAL = ${KEY_EQUAL}
KEY_A = ${KEY_A}
KEY_B = ${KEY_B}
KEY_C = ${KEY_C}
KEY_D = ${KEY_D}
KEY_E = ${KEY_E}
KEY_F = ${KEY_F}
KEY_G = ${KEY_G}
KEY_H = ${KEY_H}
KEY_I = ${KEY_I}
KEY_J = ${KEY_J}
KEY_K = ${KEY_K}
KEY_L = ${KEY_L}
KEY_M = ${KEY_M}
KEY_N = ${KEY_N}
KEY_O = ${KEY_O}
KEY_P = ${KEY_P}
KEY_Q = ${KEY_Q}
KEY_R = ${KEY_R}
KEY_S = ${KEY_S}
KEY_T = ${KEY_T}
KEY_U = ${KEY_U}
KEY_V = ${KEY_V}
KEY_W = ${KEY_W}
KEY_X = ${KEY_X}
KEY_Y = ${KEY_Y}
KEY_Z = ${KEY_Z}
KEY_LEFT_BRACKET = ${KEY_LEFT_BRACKET}
KEY_BACKSLASH = ${KEY_BACKSLASH}
KEY_RIGHT_BRACKET = ${KEY_RIGHT_BRACKET}
KEY_BACKQUOTE = ${KEY_BACKQUOTE}
KEY_ESCAPE = ${KEY_ESCAPE}
KEY_ENTER = ${KEY_ENTER}
KEY_TAB = ${KEY_TAB}
KEY_BACKSPACE = ${KEY_BACKSPACE}
KEY_INSERT = ${KEY_INSERT}
KEY_DELETE = ${KEY_DELETE}
KEY_RIGHT = ${KEY_RIGHT}
KEY_LEFT = ${KEY_LEFT}
KEY_DOWN = ${KEY_DOWN}
KEY_UP = ${KEY_UP}
KEY_PAGE_UP = ${KEY_PAGE_UP}
KEY_PAGE_DOWN = ${KEY_PAGE_DOWN}
KEY_HOME = ${KEY_HOME}
KEY_END = ${KEY_END}
KEY_CAPS_LOCK = ${KEY_CAPS_LOCK}
KEY_SCROLL_LOCK = ${KEY_SCROLL_LOCK}
KEY_NUM_LOCK = ${KEY_NUM_LOCK}
KEY_PRINT_SCREEN = ${KEY_PRINT_SCREEN}
KEY_PAUSE = ${KEY_PAUSE}
KEY_F1 = ${KEY_F1}
KEY_F2 = ${KEY_F2}
KEY_F3 = ${KEY_F3}
KEY_F4 = ${KEY_F4}
KEY_F5 = ${KEY_F5}
KEY_F6 = ${KEY_F6}
KEY_F7 = ${KEY_F7}
KEY_F8 = ${KEY_F8}
KEY_F9 = ${KEY_F9}
KEY_F10 = ${KEY_F10}
KEY_F11 = ${KEY_F11}
KEY_F12 = ${KEY_F12}
KEY_KP_0 = ${KEY_KP_0}
KEY_KP_1 = ${KEY_KP_1}
KEY_KP_2 = ${KEY_KP_2}
KEY_KP_3 = ${KEY_KP_3}
KEY_KP_4 = ${KEY_KP_4}
KEY_KP_5 = ${KEY_KP_5}
KEY_KP_6 = ${KEY_KP_6}
KEY_KP_7 = ${KEY_KP_7}
KEY_KP_8 = ${KEY_KP_8}
KEY_KP_9 = ${KEY_KP_9}
KEY_KP_DECIMAL = ${KEY_KP_DECIMAL}
KEY_KP_DIVIDE = ${KEY_KP_DIVIDE}
KEY_KP_MULTIPLY = ${KEY_KP_MULTIPLY}
KEY_KP_SUBTRACT = ${KEY_KP_SUBTRACT}
KEY_KP_ADD = ${KEY_KP_ADD}
KEY_KP_ENTER = ${KEY_KP_ENTER}
KEY_KP_EQUAL = ${KEY_KP_EQUAL}
KEY_LEFT_SHIFT = ${KEY_LEFT_SHIFT}
KEY_LEFT_CONTROL = ${KEY_LEFT_CONTROL}
KEY_LEFT_ALT = ${KEY_LEFT_ALT}
KEY_LEFT_SUPER = ${KEY_LEFT_SUPER}
KEY_RIGHT_SHIFT = ${KEY_RIGHT_SHIFT}
KEY_RIGHT_CONTROL = ${KEY_RIGHT_CONTROL}
KEY_RIGHT_ALT = ${KEY_RIGHT_ALT}
KEY_RIGHT_SUPER = ${KEY_RIGHT_SUPER}
KEY_MENU = ${KEY_MENU}
KEY_SHIFT = ${KEY_SHIFT}
KEY_CONTROL = ${KEY_CONTROL}
KEY_ALT = ${KEY_ALT}
KEY_SUPER = ${KEY_SUPER}
MOUSE_LEFT_BUTTON = ${MOUSE_LEFT_BUTTON}
MOUSE_MIDDLE_BUTTON = ${MOUSE_MIDDLE_BUTTON}
MOUSE_RIGHT_BUTTON = ${MOUSE_RIGHT_BUTTON}
GAMEPAD_1_A = ${GAMEPAD_1_A}
GAMEPAD_1_B = ${GAMEPAD_1_B}
GAMEPAD_1_X = ${GAMEPAD_1_X}
GAMEPAD_1_Y = ${GAMEPAD_1_Y}
GAMEPAD_1_LEFT_SHOULDER = ${GAMEPAD_1_LEFT_SHOULDER}
GAMEPAD_1_RIGHT_SHOULDER = ${GAMEPAD_1_RIGHT_SHOULDER}
GAMEPAD_1_SELECT = ${GAMEPAD_1_SELECT}
GAMEPAD_1_START = ${GAMEPAD_1_START}
GAMEPAD_1_UP = ${GAMEPAD_1_UP}
GAMEPAD_1_RIGHT = ${GAMEPAD_1_RIGHT}
GAMEPAD_1_DOWN = ${GAMEPAD_1_DOWN}
GAMEPAD_1_LEFT = ${GAMEPAD_1_LEFT}
GAMEPAD_2_A = ${GAMEPAD_2_A}
GAMEPAD_2_B = ${GAMEPAD_2_B}
GAMEPAD_2_X = ${GAMEPAD_2_X}
GAMEPAD_2_Y = ${GAMEPAD_2_Y}
GAMEPAD_2_LEFT_SHOULDER = ${GAMEPAD_2_LEFT_SHOULDER}
GAMEPAD_2_RIGHT_SHOULDER = ${GAMEPAD_2_RIGHT_SHOULDER}
GAMEPAD_2_SELECT = ${GAMEPAD_2_SELECT}
GAMEPAD_2_START = ${GAMEPAD_2_START}
GAMEPAD_2_UP = ${GAMEPAD_2_UP}
GAMEPAD_2_RIGHT = ${GAMEPAD_2_RIGHT}
GAMEPAD_2_DOWN = ${GAMEPAD_2_DOWN}
GAMEPAD_2_LEFT = ${GAMEPAD_2_LEFT}

DEFAULT_QUIT_KEY = KEY_ESCAPE
#"
#
# Image class
#
class Image:
    def __init__(self, obj):
        self._obj = obj
        self._data = core.image_data_getter(self._obj)

    @property
    def width(self):
        return core.image_width_getter(self._obj)

    @property
    def height(self):
        return core.image_height_getter(self._obj)

    @property
    def data(self):
        return self._data

    def get(self, x, y):
        return core.image_get(self._obj, int(x), int(y))

    def set(self, x, y, data):
        if type(data) is int:
            core.image_set1(self._obj, int(x), int(y), int(data))
        else:
            data_count = len(data)
            c_data = (c_char_p * data_count)()

            for i in range(data_count):
                c_str = create_string_buffer(data[i])
                c_data[i] = cast(c_str, c_char_p)

            core.image_set(self._obj, int(x), int(y), c_data, data_count)

    def load(self, x, y, filename):
        core.image_load(self._obj, int(x), int(y), filename)

    def copy(self, x, y, img, u, v, w, h):
        core.image_copy(
            self._obj, int(x), int(y), int(img), int(u), int(v), int(w), int(h)
        )


#
# Tilemap class
#
class Tilemap:
    def __init__(self, obj):
        self._obj = obj
        self._data = core.image_data_getter(self._obj)

    @property
    def width(self):
        return core.tilemap_width_getter(self._obj)

    @property
    def height(self):
        return core.tilemap_height_getter(self._obj)

    @property
    def data(self):
        return self._data

    @property
    def refimg(self):
        return core.tilemap_refimg_getter(self._obj)

    @refimg.setter
    def refimg(self, img):
        return core.tilemap_refimg_setter(self._obj, int(img))

    def get(self, x, y):
        return core.tilemap_get(self._obj, int(x), int(y))

    def set(self, x, y, data):
        if type(data) is int:
            core.tilemap_set1(self._obj, int(x), int(y), int(data))
        else:
            data_count = len(data)
            c_data = (c_char_p * data_count)()

            for i in range(data_count):
                c_str = create_string_buffer(data[i])
                c_data[i] = cast(c_str, c_char_p)

            core.tilemap_set(self._obj, int(x), int(y), c_data, data_count)

    def copy(self, x, y, tm, u, v, w, h):
        core.tilemap_copy(
            self._obj, int(x), int(y), int(tm), int(u), int(v), int(w), int(h)
        )


#
# Sound class
#
class Sound:
    def __init__(self, c_obj):
        self._c_obj = c_obj
        self._note = _CListInterface(
            c_obj,
            core.sound_note_getter,
            core.sound_note_length_getter,
            core.sound_note_length_setter,
        )
        self._tone = _CListInterface(
            c_obj,
            core.sound_tone_getter,
            core.sound_tone_length_getter,
            core.sound_tone_length_setter,
        )
        self._volume = _CListInterface(
            c_obj,
            core.sound_volume_getter,
            core.sound_volume_length_getter,
            core.sound_volume_length_setter,
        )
        self._effect = _CListInterface(
            c_obj,
            core.sound_effect_getter,
            core.sound_effect_length_getter,
            core.sound_effect_length_setter,
        )

    @property
    def note(self):
        return self._note

    @property
    def tone(self):
        return self._tone

    @property
    def volume(self):
        return self._volume

    @property
    def effect(self):
        return self._effect

    @property
    def speed(self):
        return core.sound_speed_getter(self._c_obj)

    @speed.setter
    def speed(self, speed):
        core.sound_speed_setter(self._c_obj, speed)

    def set(self, note, tone, volume, effect, speed):
        core.sound_set(
            self._c_obj,
            note,
            tone,
            volume,
            effect,
            speed,
        )

    def set_note(self, note):
        core.sound_set_note(note)

    def set_tone(self, tone):
        core.sound_set_tone(tone)

    def set_volume(self, volume):
        core.sound_set_volume(volume)

    def set_effect(self, effect):
        core.sound_set_effect(effect)


#
# Music class
#
class Music:
    def __init__(self, c_obj):
        self._c_obj = c_obj
        self._ch0 = _CListInterface(
            c_obj,
            core.music_ch0_getter,
            core.music_ch0_length_getter,
            core.music_ch0_length_setter,
        )
        self._ch1 = _CListInterface(
            c_obj,
            core.music_ch1_getter,
            core.music_ch1_length_getter,
            core.music_ch1_length_setter,
        )
        self._ch2 = _CListInterface(
            c_obj,
            core.music_ch2_getter,
            core.music_ch2_length_getter,
            core.music_ch2_length_setter,
        )
        self._ch3 = _CListInterface(
            c_obj,
            core.music_ch3_getter,
            core.music_ch3_length_getter,
            core.music_ch3_length_setter,
        )

    @property
    def ch0(self):
        return self._ch0

    @property
    def ch1(self):
        return self._ch1

    @property
    def ch2(self):
        return self._ch2

    @property
    def ch3(self):
        return self._ch3

    def set(
        self, ch0, ch1, ch2, ch3
    ):
        length0 = len(ch0)
        length1 = len(ch1)
        length2 = len(ch2)
        length3 = len(ch3)

        #core.music_set(
            #self._c_obj,
            #(c_int32 * length0)(*ch0),
            #length0,
            #(c_int32 * length1)(*ch1),
            #length1,
            #(c_int32 * length2)(*ch2),
            #length2,
            #(c_int32 * length3)(*ch3),
            #length3,
        #)

    def set_ch0(self, ch0):
        length = len(ch0)
        #core.music_set(self._c_obj, (c_int32 * length)(*ch0), length)

    def set_ch1(self, ch1):
        length = len(ch1)
        #core.music_set(self._c_obj, (c_int32 * length)(*ch1), length)

    def set_ch2(self, ch2):
        length = len(ch2)
        #core.music_set(self._c_obj, (c_int32 * length)(*ch2), length)

    def set_ch3(self, ch3):
        length = len(ch3)
        #core.music_set(self._c_obj, (c_int32 * length)(*ch3), length)


#
# System
#
width = 0
height = 0
frame_count = 0
_drop_file = ""


def init(
    width,
    height,
    caption = DEFAULT_CAPTION,
    scale = DEFAULT_SCALE,
    palette = DEFAULT_PALETTE,
    fps = DEFAULT_FPS,
    border_width = DEFAULT_BORDER_WIDTH,
    border_color = DEFAULT_BORDER_COLOR,
    quit_key = DEFAULT_QUIT_KEY
):
    _image_bank.clear()
    _tilemap_bank.clear()
    _sound_bank.clear()
    _music_bank.clear()

    core.init(
        int(width),
        int(height),
        caption,
        int(scale),
        palette, # c_int32
        int(fps),
        int(border_width),
        int(border_color),
        str(quit_key),
    )


def run(update, draw):
    core.run(update, draw)


def quit():
    core.quit()


def flip():
    core.flip()


def show():
    core.show()


def _caption(caption):
    core._caption(caption)


#
# Resource
#
def save(filename):
    dirname = os.path.dirname(
        inspect.currentframe().f_back.f_code.co_filename
    )
    filename = os.path.join(dirname, filename)

    core.save(filename)


def load(
    filename,
    image = True,
    tilemap = True,
    sound = True,
    music = True,
):
    caller = inspect.currentframe().f_back.f_code.co_filename
    dirname = (
        getattr(sys, "_MEIPASS", os.path.abspath(os.path.dirname(caller)))
        if hasattr(sys, "_MEIPASS")
        else os.path.dirname(caller)
    )
    filename = os.path.abspath(os.path.join(dirname, filename))

    core.load(filename, image, tilemap, sound, music)


#
# Input
#
mouse_x = 0
mouse_y = 0


@property
def mouse_x(mod):
    return mod.core.mouse_x_getter()


@property
def mouse_y(mod):
    return mod.core.mouse_y_getter()


def btn(key):
    return core.btn(int(key))


def btnp(key, hold = 0, period = 0):
    return core.btnp(int(key), int(hold), int(period))


def btnr(key):
    return core.btnr(int(key))


def mouse(visible):
    core.mouse(int(visible))


#
# Graphics
#
_image_bank = {}
_tilemap_bank = {}


def image(img, system = False):
    obj = core.image(int(img), int(system))

    if img not in _image_bank:
        _image_bank[img] = Image(obj)

    return _image_bank[img]


def tilemap(tm):
    if tm not in _tilemap_bank:
        _tilemap_bank[tm] = Tilemap(core.tilemap(int(tm)))

    return _tilemap_bank[tm]


def clip(
    x = None,
    y = None,
    w = None,
    h = None,
):
    if x is None:
        core.clip0()
    else:
        core.clip(int(x), int(y), int(w), int(h))


def pal(col1 = None, col2 = None):
    if col1 is None:
        core.pal0()
    else:
        core.pal(int(col1), int(col2))


def cls(col):
    core.cls(int(col))


def pix(x, y, col):
    core.pix(int(x), int(y), int(col))


def line(x1, y1, x2, y2, col):
    core.line(int(x1), int(y1), int(x2), int(y2), int(col))


def rect(x, y, w, h, col):
    core.rect(int(x), int(y), int(w), int(h), int(col))


def rectb(x, y, w, h, col):
    core.rectb(int(x), int(y), int(w), int(h), int(col))


def circ(x, y, r, col):
    core.circ(int(x), int(y), int(r), int(col))


def circb(x, y, r, col):
    core.circb(int(x), int(y), int(r), int(col))


def tri(x1, y1, x2, y2, x3, y3, col):
    core.tri(int(x1), int(y1), int(x2), int(y2), int(x3), int(y3), int(col))


def trib(x1, y1, x2, y2, x3, y3, col):
    core.trib(int(x1), int(y1), int(x2), int(y2), int(x3), int(y3), int(col))


def blt(
    x, y, img, u, v, w, h, colkey = -1
):
    core.blt(int(x), int(y), int(img), int(u), int(v), int(w), int(h), int(colkey))


def bltm(
    x, y, tm, u, v, w, h, colkey = -1
):
    core.bltm(int(x), int(y), int(tm), int(u), int(v), int(w), int(h), int(colkey))


def text(x, y, s, col):
    core.text(int(x), int(y), s, int(col))


#
# Audio
#
_sound_bank = {}
_music_bank = {}


def sound(snd, system = False):
    obj = core.sound(int(snd), int(system))

    if snd not in _sound_bank:
        _sound_bank[snd] = Sound(obj)

    return _sound_bank[snd]


def music(msc):
    if msc not in _music_bank:
        _music_bank[msc] = Music(core.music(int(msc)))

    return _music_bank[msc]


def play_pos(ch):
    return core.play_pos(int(ch))


def play(ch, snd, loop = False):
    if isinstance(snd, list):
        snd_count = len(snd)
        #core.play(int(ch), (c_int32 * snd_count)(*snd), int(snd_count), int(loop))
    else:
        core.play1(int(ch), int(snd), int(loop))


def playm(msc, loop = False):
    core.playm(int(msc), int(loop))


def stop(ch = -1):
    core.stop(int(ch))

`
