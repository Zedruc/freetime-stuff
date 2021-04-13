from PIL import Image
import os
import time
import cv2
from playsound import playsound
from os.path import isfile, join

##################
VIDEO = 'bad_apple.mp4'
DELAY = 0.016666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
##################

#frames_dir = "data"
#frames = [f for f in os.listdir(frames_dir) if isfile(join(frames_dir, f))]
# print(frames)
# time.sleep(10)
# print(sorted(frames))

ASCII_CHARS = ['.', ',', ':', ';', '+', '*', '?', '%', 'S', '#', '@']
ASCII_CHARS = ASCII_CHARS[::-1]

'''
method resize():
    - takes as parameters the image, and the final width
    - resizes the image into the final width while maintaining aspect ratio
'''


def resize(image, new_width=100):
    (old_width, old_height) = image.size
    aspect_ratio = float(old_height)/float(old_width)
    new_height = int(aspect_ratio * new_width / 2)
    new_dim = (new_width, new_height)
    new_image = image.resize(new_dim)
    return new_image


'''
method grayscalify():
    - takes an image as a parameter
    - returns the grayscale version of image
'''


def grayscalify(image):
    return image.convert('L')


'''
method modify():
    - replaces every pixel with a character whose intensity is similar
'''


def modify(image, buckets=25):
    initial_pixels = list(image.getdata())
    new_pixels = [ASCII_CHARS[pixel_value//buckets]
                  for pixel_value in initial_pixels]
    return ''.join(new_pixels)


'''
method do():
    - does all the work by calling all the above functions
'''


def do(image, new_width=100):
    image = resize(image)
    image = grayscalify(image)

    pixels = modify(image)
    len_pixels = len(pixels)

    # Construct the image from the character list
    new_image = [pixels[index:index+new_width]
                 for index in range(0, len_pixels, new_width)]

    return '\n'.join(new_image)


'''
method runner():
    - takes as parameter the image path and runs the above code
    - handles exceptions as well
    - provides alternative output options
'''


def runner(path):
    image = None
    try:
        image = Image.open(path)
    except Exception:
        print("Unable to find image in", path)
        # print(e)
        return
    image = do(image)

    # To print on console
    print(image)

    # Else, to write into a file
    # Note: This text file will be created by default under
    #       the same directory as this python file,
    #       NOT in the directory from where the image is pulled.
    # f = open('img.txt', 'w')
    # f.write(image)
    # f.close()


'''
method main():
    - reads input from console
    - profit
'''

# for frame in frames:
# runner(f'data/{frame}')
# print(frame)
# time.sleep(0.06)

# Opens the Video file
cap = cv2.VideoCapture(VIDEO)
i = 0
#playsound("bad_apple.mp3", False)
# time.sleep(1.7)
while(cap.isOpened()):
    ret, frame = cap.read()
    if ret == False:
        break
    cv2.imwrite('data/frame'+str(i)+'.jpg', frame)
    runner('data/frame'+str(i)+'.jpg')
    i += 1
    # print('\033c')
    time.sleep(DELAY)

cap.release()
cv2.destroyAllWindows()
