import numpy as np
import cv2

img = cv2.imread('lena.jpg', 1)

img = cv2.line(img, (0, 0), (255, 255), (0,0,255), 5)

cv2.imshow('image', img)

cv2.waitKey(0)
cv2.destroyAllWindows()
exit()