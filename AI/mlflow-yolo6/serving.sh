# export MLFLOW_TRACKING_URI="http://165.246.121.112:5001"

model_name="drug_detection"
model_version="1"
port="5002"
host="0.0.0.0"

mlflow models serve -m "models:/$model_name/$model_version" --no-conda --port $port --host $host
