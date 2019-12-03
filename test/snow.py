import pyxel
import math
pyxel.init(255, 255, caption="Hó")
pyxel.mouse(True)

def update(): 
    pass

def hopehely(x, y, r):
    s=math.sqrt(2) * r / 2
    pyxel.line(x-r, y, x + r, y, 7)
    pyxel.line(x, y-r, x, y+r, 7)
    pyxel.line(x-s, y-s, x +s, y+s, 7)
    pyxel.line(x+s, y-s, x-s, y+s, 7)
    
class Hopehely:
    def __init__(self, x, y, r):
        self.x = x
        self.y = y
        self.r = r
    def draw(self):
        x = self.x; y = self.y; r = self.r
        s=math.sqrt(2) * self.r / 2
        pyxel.line(x-r, y, x + r, y, 7)
        pyxel.line(x, y-r, x, y+r, 7)
        pyxel.line(x-s, y-s, x +s, y+s, 7)
        pyxel.line(x+s, y-s, x-s, y+s, 7)
        
a = Hopehely(1, 2, 8)
b = Hopehely(50, 23, 3)
        
def draw():
    pyxel.cls(1)
    a.draw()
    b.draw()
    
pyxel.run(update, draw)
