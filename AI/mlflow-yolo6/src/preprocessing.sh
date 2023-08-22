
# MACOSX 폴더 존재하면 삭제
if [ -d "data/raw/__MACOSX" ]; then
    rm -rf data/raw/__MACOSX
fi

# 이미지 이동
mkdir data/raw/images && \
 find data/raw -name "*.png" -and ! -name "*index.png" -and ! -name ".*" -exec mv {} data/raw/images/ \;
 
# annotation 이동
mkdir data/raw/annotation && \
 find data/raw -name "*_json" -exec mv {} data/raw/annotation/ \;

# 전처리
python src/preprocess.py
