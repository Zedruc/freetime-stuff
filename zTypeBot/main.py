import webbrowser  # To open ztype
import pyscreenshot as ImageGrab
from PIL import Image
import os
import cv2
import time
import numpy as np
import pytesseract
from pynput.keyboard import Key, Controller
from pynput.mouse import Button, Controller as MController

frame = 0

keyboard = Controller()
mouse = MController()
webbrowser.open_new("https://zty.pe/")
print(mouse.position)
mouse.position = (950, 750)
time.sleep(3)  # wait for dom to load
mouse.press(Button.left)
mouse.release(Button.left)
time.sleep(2)
mouse.press(Button.left)  # To make 100% sure the browser window is focused
mouse.release(Button.left)

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
# Programm Ordner


def screen():
    # upper half of the game
    im = ImageGrab.grab(bbox=(720, 200, 1210, 840))
    im.save("data/img.png")
    im.save(f"{os.getcwd()}\\data\\detections_frames\\frame{frame}.png")
    img = cv2.imread('data/img.png')
    text = pytesseract.image_to_string(img)
    # make it an array so it can type stuff letter by letter ( Just very fast B) )
    text_list = list(text)

    if(len(text_list) < 1):
        return
    for character in text_list:
        text_list = text_list[:len(text_list)-2]
        if(", " in text_list):
            text_list.remove(", ")

        print(character)
        if(character.isalpha()):
            keyboard.press(character)
            keyboard.release(character)
            time.sleep(.02)
        else:
            continue


while True:
    screen()
    frame += 1
