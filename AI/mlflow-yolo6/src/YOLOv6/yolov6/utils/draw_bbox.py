import numpy as np
import pandas as pd
import torch
import cv2


def draw_bbox_array(
    det,
    img_shape,
    img_src,
    cat_id_path="data/preprocessed/cat_id_mapping.csv",
):
    if isinstance(img_src, list):
        img_src = np.array(img_src).astype(np.float32)

    img_ori, det = (img_src.copy()), torch.tensor(det)
    det[:, :4] = rescale(img_shape, det[:, :4], img_src.shape).round()
    for *xyxy, conf, cls in reversed(det):
        class_num = int(cls)
        try:
            class_names = dict(pd.read_csv(cat_id_path).values[:, ::-1])
            label = f"{class_names[class_num]} {conf:.2f}"
        except:
            label = f"classID : {class_num} {conf:.2f}"
        plot_box_and_label(
            img_ori,
            max(round(sum(img_ori.shape) / 2 * 0.003), 2),
            xyxy,
            label,
            color=generate_colors(class_num, True),
        )

    return np.asarray(img_ori)


def rescale(ori_shape, boxes, target_shape):
    """Rescale the output to the original image shape"""
    ratio = min(ori_shape[0] / target_shape[0], ori_shape[1] / target_shape[1])
    padding = (ori_shape[1] - target_shape[1] * ratio) / 2, (
        ori_shape[0] - target_shape[0] * ratio
    ) / 2

    boxes[:, [0, 2]] -= padding[0]
    boxes[:, [1, 3]] -= padding[1]
    boxes[:, :4] /= ratio

    boxes[:, 0].clamp_(0, target_shape[1])  # x1
    boxes[:, 1].clamp_(0, target_shape[0])  # y1
    boxes[:, 2].clamp_(0, target_shape[1])  # x2
    boxes[:, 3].clamp_(0, target_shape[0])  # y2

    return boxes


def box_convert(x):
    # Convert boxes with shape [n, 4] from [x1, y1, x2, y2] to [x, y, w, h] where x1y1=top-left, x2y2=bottom-right
    y = x.clone() if isinstance(x, torch.Tensor) else np.copy(x)
    y[:, 0] = (x[:, 0] + x[:, 2]) / 2  # x center
    y[:, 1] = (x[:, 1] + x[:, 3]) / 2  # y center
    y[:, 2] = x[:, 2] - x[:, 0]  # width
    y[:, 3] = x[:, 3] - x[:, 1]  # height
    return y


def plot_box_and_label(
    image,
    lw,
    box,
    label="",
    color=(128, 128, 128),
    txt_color=(255, 255, 255),
    font=cv2.FONT_HERSHEY_COMPLEX,
):
    # Add one xyxy box to image with label
    p1, p2 = (int(box[0]), int(box[1])), (int(box[2]), int(box[3]))
    cv2.rectangle(image, p1, p2, color, thickness=lw, lineType=cv2.LINE_AA)
    if label:
        tf = max(lw - 1, 1)  # font thickness
        w, h = cv2.getTextSize(label, 0, fontScale=lw / 3, thickness=tf)[
            0
        ]  # text width, height
        outside = p1[1] - h - 3 >= 0  # label fits outside box
        p2 = p1[0] + w, p1[1] - h - 3 if outside else p1[1] + h + 3
        cv2.rectangle(image, p1, p2, color, -1, cv2.LINE_AA)  # filled
        cv2.putText(
            image,
            label,
            (p1[0], p1[1] - 2 if outside else p1[1] + h + 2),
            font,
            lw / 3,
            txt_color,
            thickness=tf,
            lineType=cv2.LINE_AA,
        )


def generate_colors(i, bgr=False):
    hex = (
        "FF3838",
        "FF9D97",
        "FF701F",
        "FFB21D",
        "CFD231",
        "48F90A",
        "92CC17",
        "3DDB86",
        "1A9334",
        "00D4BB",
        "2C99A8",
        "00C2FF",
        "344593",
        "6473FF",
        "0018EC",
        "8438FF",
        "520085",
        "CB38FF",
        "FF95C8",
        "FF37C7",
    )
    palette = []
    for iter in hex:
        h = "#" + iter
        palette.append(tuple(int(h[1 + i : 1 + i + 2], 16) for i in (0, 2, 4)))
    num = len(palette)
    color = palette[int(i) % num]
    return (color[2], color[1], color[0]) if bgr else color
