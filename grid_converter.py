import cv2
import json
import sys
import numpy as np

try:

    image_path = sys.argv[1]

    image = cv2.imread(image_path)

    if image is None:
        print(json.dumps({
            "error": "Image not loaded"
        }))
        sys.exit()

    # resize image bigger for better processing
    image = cv2.resize(image, (400, 400))

    # grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # blur to reduce noise
    blur = cv2.GaussianBlur(gray, (5, 5), 0)

    # threshold
    _, thresh = cv2.threshold(
        blur,
        180,
        255,
        cv2.THRESH_BINARY
    )

    # convert to 20x20
    small = cv2.resize(thresh, (20, 20))

    grid = []

    for i in range(20):

        row = []

        for j in range(20):

            pixel = small[i][j]

            # BLACK = obstacle
            # WHITE = free space
            if pixel < 128:
                row.append(1)
            else:
                row.append(0)

        grid.append(row)

    print(json.dumps({
        "grid": grid
    }))

except Exception as e:

    print(json.dumps({
        "error": str(e)
    }))
