import os
import json
import pandas as pd
from glob import glob
from shutil import copyfile
from collections import defaultdict


def createDirectory(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print("Error: Failed to create the directory.")


def images(img_path="data/raw/images"):
    createDirectory("data/preprocessed/images/train")
    createDirectory("data/preprocessed/images/val")

    img_list = sorted(os.listdir(img_path))
    train_count, val_count = 0, 0
    before, after = [], []
    for img in img_list:
        if "_75_" in img:
            copyfile(
                os.path.join(img_path, img),
                f"data/preprocessed/images/val/val{val_count}.jpg",
            )
            after.append(f"val{val_count}.jpg")
            val_count += 1
        else:
            copyfile(
                os.path.join(img_path, img),
                f"data/preprocessed/images/train/train{train_count}.jpg",
            )
            after.append(f"train{train_count}.jpg")
            train_count += 1
        before.append(img)

    pd.DataFrame({"before": before, "after": after}).to_csv(
        "data/preprocessed/img_id_mapping.csv", index=False
    )


def annotation(annotation_path="data/raw/annotation"):
    createDirectory("data/preprocessed/labels/train")
    createDirectory("data/preprocessed/labels/val")

    img_id_mapping = pd.read_csv("data/preprocessed/img_id_mapping.csv")
    img_id_mapping = {k: v for k, v in zip(img_id_mapping.before, img_id_mapping.after)}

    img_name, class_id = [], []
    center_x, center_y, bbox_width, bbox_height = [], [], [], []
    df_meta = pd.DataFrame()
    for anno in sorted(glob("data/raw/annotation/*/*/*.json")):
        with open(anno, "r") as f:
            ann = json.load(f)

        df_meta = pd.concat([df_meta, pd.DataFrame.from_dict(ann["images"])])
        W, H = ann["images"][0]["width"], ann["images"][0]["height"]
        try:
            x, y, w, h = ann["annotations"][0]["bbox"]
            img_name.append(img_id_mapping[ann["images"][0]["file_name"]])
            class_id.append(ann["images"][0]["drug_N"])
            center_x.append((x + w / 2) / W)
            center_y.append((y + h / 2) / H)
            bbox_width.append(w / W)
            bbox_height.append(h / H)
        except:
            print("box정보 없음 : ", anno)
    cat_id_mapping = {v: k for k, v in enumerate(sorted(df_meta.drug_N.unique()))}
    data_frame = pd.DataFrame.from_dict(
        {
            "img_name": img_name,
            "class_id": list(map(lambda x: cat_id_mapping[x], class_id)),
            "center_x": center_x,
            "center_y": center_y,
            "bbox_width": bbox_width,
            "bbox_height": bbox_height,
        }
    )

    for data in data_frame.img_name.unique():
        my_type = "train" if "train" in data else "val"
        data_frame[data_frame.img_name == data].iloc[:, 1:].to_csv(
            f"data/preprocessed/labels/{my_type}/" + data.replace("jpg", "txt"),
            index=False,
            header=None,
            sep=" ",
        )

    pd.DataFrame({"cat": cat_id_mapping.keys(), "id": cat_id_mapping.values()}).to_csv(
        "data/preprocessed/cat_id_mapping.csv", index=False
    )
    df_meta.to_csv("data/preprocessed/meta.csv", index=False)


if __name__ == "__main__":
    images()
    annotation()
