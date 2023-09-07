# mlflow model serving

- 목표 : mlflow를 활용하여 model-version-control 및 model serving

## DATA
- 데이터 출처 : [경구약제 이미지 데이터](https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=realm&dataSetSn=576)

1. 경구약제 이미지 데이터를 저장하여 [data/raw](data/raw)폴더에 저장
2.
    ~~~python
    # 전처리 코드
    sh src/preprocess 
    ~~~
    - [전처리 데이터 형식 참조](src/YOLOv6/docs/Train_custom_data.md)

## ENV & command
- docker_file : [Dockerfile](Dockerfile) / CUDA="11.2.2" CUDNN="8"
- Device : GeForce RTX 3080 Ti 12GB 

~~~python
# train
sh src/train.sh

# infer
python infer.py

# serving
sh src/serving.sh

# serving test
python src serving_requests.py
~~~


    