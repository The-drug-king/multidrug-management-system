import mlflow
import cv2
import sys

sys.path.insert(0, "utils")
from draw_bbox import draw_bbox_array


def draw_box_img(image, result):
    det, img_size = result[:-1], result[-1]
    draw_img_array = draw_bbox_array(det, img_size, image)
    cv2.imwrite("test.jpg", draw_img_array)


if __name__ == "__main__":
    logged_model = "runs:/0019a6c0c56946ddbb0e05a5f7ff7080/model"

    # Load model as a PyFuncModel.
    loaded_model = mlflow.pyfunc.load_model(logged_model)
    image = cv2.imread("data/preprocessed/images/val/val0.jpg")
    result = loaded_model.predict(image)

    draw_box_img(image, result)
    print("hi")
