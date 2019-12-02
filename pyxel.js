'use strict'
const VERSION = '1.2.10',
  COLOR_COUNT = 16,
  COLOR_BLACK = 0,
  COLOR_NAVY = 1,
  COLOR_PERPLE = 2,
  COLOR_GREEN = 3,
  COLOR_BROWN = 4,
  COLOR_DARKGRAY = 5,
  COLOR_LIGHTGRAY = 6,
  COLOR_WHITE = 7,
  COLOR_RED = 8,
  COLOR_ORANGE = 9,
  COLOR_YELLOW = 10,
  COLOR_LIME = 11,
  COLOR_CYAN = 12,
  COLOR_STEELBLUE = 13,
  COLOR_PINK = 14,
  COLOR_PEACH = 15,
  MIN_FONT_CODE = 32,
  MAX_FONT_CODE = 127,
  FONT_X = 12,
  FONT_Y = 0,
  FONT_WIDTH = 4,
  FONT_HEIGHT = 6,
  FONT_ROW_COUNT = 48,
  FONT_COLOR = 7,
  FONT_DATA = [
    0x000000,
    0x444040,
    0xaa0000,
    0xaeaea0,
    0x6c6c40,
    0x824820,
    0x4a4ac0,
    0x440000,
    0x244420,
    0x844480,
    0xa4e4a0,
    0x04e400,
    0x000480,
    0x00e000,
    0x000040,
    0x224880,
    0x6aaac0,
    0x4c4440,
    0xc248e0,
    0xc242c0,
    0xaae220,
    0xe8c2c0,
    0x68eae0,
    0xe24880,
    0xeaeae0,
    0xeae2c0,
    0x040400,
    0x040480,
    0x248420,
    0x0e0e00,
    0x842480,
    0xe24040,
    0x4aa860,
    0x4aeaa0,
    0xcacac0,
    0x688860,
    0xcaaac0,
    0xe8e8e0,
    0xe8e880,
    0x68ea60,
    0xaaeaa0,
    0xe444e0,
    0x222a40,
    0xaacaa0,
    0x8888e0,
    0xaeeaa0,
    0xcaaaa0,
    0x4aaa40,
    0xcac880,
    0x4aae60,
    0xcaeca0,
    0x6842c0,
    0xe44440,
    0xaaaa60,
    0xaaaa40,
    0xaaeea0,
    0xaa4aa0,
    0xaa4440,
    0xe248e0,
    0x644460,
    0x884220,
    0xc444c0,
    0x4a0000,
    0x0000e0,
    0x840000,
    0x06aa60,
    0x8caac0,
    0x068860,
    0x26aa60,
    0x06ac60,
    0x24e440,
    0x06ae24,
    0x8caaa0,
    0x404440,
    0x2022a4,
    0x8acca0,
    0xc444e0,
    0x0eeea0,
    0x0caaa0,
    0x04aa40,
    0x0caac8,
    0x06aa62,
    0x068880,
    0x06c6c0,
    0x4e4460,
    0x0aaa60,
    0x0aaa40,
    0x0aaee0,
    0x0a44a0,
    0x0aa624,
    0x0e24e0,
    0x64c460,
    0x444440,
    0xc464c0,
    0x6c0000,
    0xeeeee0
  ],
  USER_IMAGE_BANK_COUNT = 3,
  MAX_SCREEN_SIZE = 256,
  MAX_SCREEN_RATIO = 0.8,
  MAX_FRAME_SKIP_COUNT = 9,
  MEASURE_FRAME_COUNT = 10,
  TOTAL_IMAGE_BANK_COUNT = USER_IMAGE_BANK_COUNT + 2,
  IMAGE_BANK_FOR_SYSTEM = USER_IMAGE_BANK_COUNT,
  IMAGE_BANK_FOR_SCREEN = USER_IMAGE_BANK_COUNT + 1,
  IMAGE_BANK_WIDTH = MAX_SCREEN_SIZE,
  IMAGE_BANK_HEIGHT = MAX_SCREEN_SIZE,
  TILEMAP_BANK_COUNT = 8,
  TILEMAP_BANK_WIDTH = 256,
  TILEMAP_BANK_HEIGHT = 256,
  TILEMAP_CHIP_WIDTH = 8,
  TILEMAP_CHIP_HEIGHT = 8,
  TILEMAP_CHIP_COUNT =
    (TILEMAP_BANK_WIDTH / TILEMAP_CHIP_WIDTH) *
    (TILEMAP_BANK_HEIGHT / TILEMAP_CHIP_HEIGHT),
  MOUSE_CURSOR_X = 2,
  MOUSE_CURSOR_Y = 2,
  MOUSE_CURSOR_WIDTH = 8,
  MOUSE_CURSOR_HEIGHT = 8,
  MOUSE_CURSOR_DATA = [
    '00000011',
    '07776011',
    '07760111',
    '07676011',
    '06067601',
    '00106760',
    '11110601',
    '11111011'
  ],
  USER_SOUND_BANK_COUNT = 64,
  SOUND_BANK_FOR_SYSTEM = USER_SOUND_BANK_COUNT,
  MUSIC_BANK_COUNT = 8,
  MUSIC_CHANNEL_COUNT = 4,
  RESOURCE_FILE_EXTENSION = '.pyxres',
  KEY_SPACE = 0,
  KEY_QUOTE = 1,
  KEY_COMMA = 2,
  KEY_MINUS = 3,
  KEY_PERIOD = 4,
  KEY_SLASH = 5,
  KEY_0 = 6,
  KEY_1 = 7,
  KEY_2 = 8,
  KEY_3 = 9,
  KEY_4 = 10,
  KEY_5 = 11,
  KEY_6 = 12,
  KEY_7 = 13,
  KEY_8 = 14,
  KEY_9 = 15,
  KEY_SEMICOLON = 16,
  KEY_EQUAL = 17,
  KEY_A = 18,
  KEY_B = 19,
  KEY_C = 20,
  KEY_D = 21,
  KEY_E = 22,
  KEY_F = 23,
  KEY_G = 24,
  KEY_H = 25,
  KEY_I = 26,
  KEY_J = 27,
  KEY_K = 28,
  KEY_L = 29,
  KEY_M = 30,
  KEY_N = 31,
  KEY_O = 32,
  KEY_P = 33,
  KEY_Q = 34,
  KEY_R = 35,
  KEY_S = 36,
  KEY_T = 37,
  KEY_U = 38,
  KEY_V = 39,
  KEY_W = 40,
  KEY_X = 41,
  KEY_Y = 42,
  KEY_Z = 43,
  KEY_LEFT_BRACKET = 44,
  KEY_BACKSLASH = 45,
  KEY_RIGHT_BRACKET = 46,
  KEY_BACKQUOTE = 47,
  KEY_ESCAPE = 48,
  KEY_ENTER = 49,
  KEY_TAB = 50,
  KEY_BACKSPACE = 51,
  KEY_INSERT = 52,
  KEY_DELETE = 53,
  KEY_RIGHT = 54,
  KEY_LEFT = 55,
  KEY_DOWN = 56,
  KEY_UP = 57,
  KEY_PAGE_UP = 58,
  KEY_PAGE_DOWN = 59,
  KEY_HOME = 60,
  KEY_END = 61,
  KEY_CAPS_LOCK = 62,
  KEY_SCROLL_LOCK = 63,
  KEY_NUM_LOCK = 64,
  KEY_PRINT_SCREEN = 65,
  KEY_PAUSE = 66,
  KEY_F1 = 67,
  KEY_F2 = 68,
  KEY_F3 = 69,
  KEY_F4 = 70,
  KEY_F5 = 71,
  KEY_F6 = 72,
  KEY_F7 = 73,
  KEY_F8 = 74,
  KEY_F9 = 75,
  KEY_F10 = 76,
  KEY_F11 = 77,
  KEY_F12 = 78,
  KEY_KP_0 = 79,
  KEY_KP_1 = 80,
  KEY_KP_2 = 81,
  KEY_KP_3 = 82,
  KEY_KP_4 = 83,
  KEY_KP_5 = 84,
  KEY_KP_6 = 85,
  KEY_KP_7 = 86,
  KEY_KP_8 = 87,
  KEY_KP_9 = 88,
  KEY_KP_DECIMAL = 89,
  KEY_KP_DIVIDE = 90,
  KEY_KP_MULTIPLY = 91,
  KEY_KP_SUBTRACT = 92,
  KEY_KP_ADD = 93,
  KEY_KP_ENTER = 94,
  KEY_KP_EQUAL = 95,
  KEY_LEFT_SHIFT = 96,
  KEY_LEFT_CONTROL = 97,
  KEY_LEFT_ALT = 98,
  KEY_LEFT_SUPER = 99,
  KEY_RIGHT_SHIFT = 100,
  KEY_RIGHT_CONTROL = 101,
  KEY_RIGHT_ALT = 102,
  KEY_RIGHT_SUPER = 103,
  KEY_MENU = 104,
  DOM_KEY_COUNT = 105,
  KEY_SHIFT = DOM_KEY_COUNT,
  KEY_CONTROL = 106,
  KEY_ALT = 107,
  KEY_SUPER = 108,
  MOUSE_LEFT_BUTTON = 109,
  MOUSE_MIDDLE_BUTTON = 110,
  MOUSE_RIGHT_BUTTON = 111,
  GAMEPAD_1_A = 112,
  GAMEPAD_1_B = 113,
  GAMEPAD_1_X = 114,
  GAMEPAD_1_Y = 115,
  GAMEPAD_1_LEFT_SHOULDER = 116,
  GAMEPAD_1_RIGHT_SHOULDER = 117,
  GAMEPAD_1_SELECT = 118,
  GAMEPAD_1_START = 119,
  GAMEPAD_1_UP = 120,
  GAMEPAD_1_RIGHT = 121,
  GAMEPAD_1_DOWN = 122,
  GAMEPAD_1_LEFT = 123,
  GAMEPAD_2_A = 124,
  GAMEPAD_2_B = 125,
  GAMEPAD_2_X = 126,
  GAMEPAD_2_Y = 127,
  GAMEPAD_2_LEFT_SHOULDER = 128,
  GAMEPAD_2_RIGHT_SHOULDER = 129,
  GAMEPAD_2_SELECT = 130,
  GAMEPAD_2_START = 131,
  GAMEPAD_2_UP = 132,
  GAMEPAD_2_RIGHT = 133,
  GAMEPAD_2_DOWN = 134,
  GAMEPAD_2_LEFT = 135,
  KEY_COUNT = 136,
  DOM_KEY_TABLE = [
    'Space',
    'Quote',
    'Comma',
    'Minus',
    'Period',
    'Slash',
    'Digit0',
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',
    'Semicolon',
    'Equal',
    'KeyA',
    'KeyB',
    'KeyC',
    'KeyD',
    'KeyE',
    'KeyF',
    'KeyG',
    'KeyH',
    'KeyI',
    'KeyJ',
    'KeyK',
    'KeyL',
    'KeyM',
    'KeyN',
    'KeyO',
    'KeyP',
    'KeyQ',
    'KeyR',
    'KeyS',
    'KeyT',
    'KeyU',
    'KeyV',
    'KeyW',
    'KeyX',
    'KeyY',
    'KeyZ',
    'BracketLeft',
    'Backslash',
    'BracketRight',
    'Backquote',
    'Escape',
    'Enter',
    'Tab',
    'Backspace',
    'Insert',
    'Delete',
    'ArrowRight',
    'ArrowLeft',
    'ArrowDown',
    'ArrowUp',
    'PageUp',
    'PageDown',
    'Home',
    'End',
    'CapsLock',
    'ScrollLock',
    'NumLock',
    'PrintScreen',
    'Pause',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
    'Numpad0',
    'Numpad1',
    'Numpad2',
    'Numpad3',
    'Numpad4',
    'Numpad5',
    'Numpad6',
    'Numpad7',
    'Numpad8',
    'Numpad9',
    'NumpadDecimal',
    'NumpadDivide',
    'NumpadMultiply',
    'NumpadSubtract',
    'NumpadAdd',
    'NumpadEnter',
    'NumpadEqual',
    'ShiftLeft',
    'ControlLeft',
    'MetaLeft',
    'Super left TODO',
    'ShiftRight',
    'ControlRight',
    'AltRight',
    'Super right TODO',
    'ContextMenu'
  ],
  DEFAULT_QUIT_KEY = KEY_ESCAPE,
  DEFAULT_CAPTION = 'Pyxel',
  DEFAULT_SCALE = 0,
  DEFAULT_PALETTE = [
    0x000000,
    0x1d2b53,
    0x7e2553,
    0x008751,
    0xab5236,
    0x5f574f,
    0xc2c3c7,
    0xfff1e8,
    0xff004d,
    0xffa300,
    0xffec27,
    0x00e436,
    0x29adff,
    0x83769c,
    0xff77a8,
    0xffccaa
  ],
  DEFAULT_FPS = 30,
  DEFAULT_BORDER_WIDTH = 16,
  DEFAULT_BORDER_COLOR = 0x101018

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

Sk.builtinFiles.files['src/lib/pyxel/core.js'] = `
var $builtinmodule = ${function (name) {
  var mod = {}

  mod.width_getter = new Sk.builtin.func(function () {
    return s_system.Width()
  })

  mod.height_getter = new Sk.builtin.func(function () {
    return s_system.Height()
  })

  mod.frame_count_getter = new Sk.builtin.func(function () {
    return s_system.FrameCount()
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
    s_system = new System(
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

  mod.image = new Sk.builtin.func(function (img, system) {
    return s_graphics.GetImageBank(img, Sk.ffi.remapToJs(system))
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
  mod.image_data_getter = new Sk.builtin.func(function (img) {
    return { data: 'data' }
  })
  mod.image_load = new Sk.builtin.func(function (img, x, y, filename) {
    return new Sk.misceval.promiseToSuspension(
      img
        .LoadImage(
          Sk.ffi.remapToJs(x),
          Sk.ffi.remapToJs(y),
          Sk.ffi.remapToJs(filename)
        )
        .then(x => Sk.ffi.remapToPy(x))
    )
  })
  mod.image_get = new Sk.builtin.func(function (img, x, y, filename) {
    return Sk.ffi.remapToPy(
      img.GetValue(Sk.ffi.remapToJs(x), Sk.ffi.remapToJs(y))
    )
  })
  mod.run = new Sk.builtin.func(function (update, draw) {
    return Sk.misceval.promiseToSuspension(
      s_system.Run(
        () => Sk.misceval.asyncToPromise(() => Sk.misceval.callsim(update)),
        () => Sk.misceval.asyncToPromise(() => Sk.misceval.callsim(draw))
      )
    )
  })
  mod.btnp = new Sk.builtin.func(function (key, hold, period) {
    return s_input.IsButtonPressed(
      Sk.ffi.remapToJs(key),
      Sk.ffi.remapToJs(hold),
      Sk.ffi.remapToJs(period)
    )
  })
  return mod
}}
`

let s_system, s_graphics, s_input, s_resource, s_audio

const PYXEL_ERROR = s => {
  throw s
}

class System {
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
    this.input = new Input()
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
    this.input.Update()
    if (update) await update()
  }

  async DrawFrame (draw) {
    if (draw) await draw()
    this.DrawMouseCursor()
    this.window.Render(this.graphics.ScreenImage().data)
  }

  DrawMouseCursor () {
    //TODO
  }
}

class Window {
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

class Graphics {
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

class Input {
  constructor () {
    //TODO
  }
  Update () {}
  IsButtonPressed (key, hold, period) {
    return false // TODO
  }
}
class Image {
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

class Tilemap {}
class Resource {}

class Rectangle {
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
class CopyArea {
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
