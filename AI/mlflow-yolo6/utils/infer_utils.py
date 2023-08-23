import torch.nn as nn
import numpy as np
import pandas as pd
import torch
import sys
import cv2

sys.path.insert(0, "YOLOv6")
from yolov6.data.data_augment import letterbox
from yolov6.utils.nms import non_max_suppression


class GhInfer(nn.Module):
    def __init__(self, model=None, img_size=(640, 640)):
        super().__init__()
        self.model = model
        self.img_size = img_size
        self.stride = self.model.stride
        self.half = False
        self.conf_thres = 0.4
        self.iou_thres = 0.45
        self.classes = None
        self.agnostic_nms = False
        self.max_det = 1000
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

    def forward(self, img):
        if not isinstance(img, np.ndarray):
            img = np.array(img)
        img = img.astype(np.uint8)
        img, img_src = self.process_image(img, self.img_size, self.stride, self.half)
        if len(img.shape) == 3:
            img = img[None]

        pred = self.model(img.to(self.device))
        det = non_max_suppression(
            pred,
            self.conf_thres,
            self.iou_thres,
            self.classes,
            self.agnostic_nms,
            max_det=self.max_det,
        )[0]
        return {"det": det, "img": img, "img_src": img_src}

    def process_image(self, img_src, img_size, stride, half):
        """Process image before image inference."""
        image = letterbox(img_src, img_size, stride=stride)[0]
        # Convert
        image = image.transpose((2, 0, 1))[::-1]  # HWC to CHW, BGR to RGB
        image = torch.from_numpy(np.ascontiguousarray(image))
        image = image.half() if half else image.float()  # uint8 to fp16/32
        image /= 255  # 0 - 255 to 0.0 - 1.0

        return image, img_src


if __name__ == "__main__":
    from yolov6.layers.common import DetectBackend
    from draw_bbox import draw_bbox_array
    import os

    os.environ["CUDA_VISIBLE_DEVICES"] = "1"

    best_filename = "YOLOv6/runs/train/exp11/weights/best_ckpt.pt"
    model = DetectBackend(best_filename, device="cuda")
    my_infer = GhInfer(model)

    image = cv2.imread("data/preprocessed/images/val/val0.jpg")
    result = my_infer(image)
    drawing_img = draw_bbox_array(result)
    cv2.imwrite("data/raw/result.jpg", drawing_img)
    print("Hi")
