import mlflow
import cv2
import argparse
from YOLOv6.yolov6.utils.draw_bbox import draw_bbox_array


def draw_box_img(image, result):
    det, img_size = result[:-1], result[-1]
    draw_img_array = draw_bbox_array(det, img_size, image)
    cv2.imwrite("test.jpg", draw_img_array)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="infer")
    parser.add_argument(
        "--logged_model",
        default="runs:/5e9df0e0be0e4b89a3d1caf9684f5a4d/model",
        help="모델 경로",
    )
    parser.add_argument(
        "--image_path",
        default="data/preprocessed/images/val/val0.jpg",
        help="이미지 경로",
    )
    args = parser.parse_args()

    loaded_model = mlflow.pyfunc.load_model(args.logged_model)
    image = cv2.imread(args.image_path)
    result = loaded_model.predict(image)

    draw_box_img(image, result)
    print("DONE")
