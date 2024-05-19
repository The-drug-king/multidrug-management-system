exp_name="drug_detection"
batch=20
conf="configs/yolov6n_finetune.py"
data="data/dataset.yaml"
eval_interval=5
workers=0
device=0


mlflow run src/YOLOv6 \
 --experiment-name $exp_name \
 --env-manager=local \
 -P batch=$batch \
 -P conf=$conf \
 -P data=$data \
 -P eval-interval=$eval_interval \
 -P workers=$workers \
 -P device=$device \
 

