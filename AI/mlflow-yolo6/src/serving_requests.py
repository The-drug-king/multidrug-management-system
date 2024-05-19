import requests
import argparse
import cv2
from YOLOv6.yolov6.utils.draw_bbox import draw_bbox_array


def res2result(res):
    if res.status_code == 200:
        result = res.json()
        return result["predictions"]
    else:
        print("Request failed with status code:", res.status_code)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--uri",
        default="http://localhost:5002/invocations",
        help="serving된 모델 uri",
    )
    parser.add_argument(
        "--data_path",
        default="data/preprocessed/images/val/val0.jpg",
        help="이미지 경로",
    )
    args = parser.parse_args()

    # 요청 정보
    uri = args.uri
    data_path = args.data_path
    data_array = cv2.imread(data_path).tolist()
    H = {"Content-Type": "application/json"}
    D = {"inputs": data_array}

    # 요청 후 결과
    res = requests.post(url=uri, json=D, headers=H)
    result = res2result(res)

    # 결과 이미지 시각화 및 저장
    det, img_size = result[:-1], result[-1]
    draw_img_array = draw_bbox_array(det, img_size, data_array)
    cv2.imwrite("draw_img.jpg", draw_img_array)
