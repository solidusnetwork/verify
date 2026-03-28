#!/usr/bin/env bash
set -euo pipefail

MODEL_DIR="src/lib/models"
BASE_URL="https://raw.githubusercontent.com/nicolo-ribaudo/face-api.js-models/main"

mkdir -p "$MODEL_DIR"

MODELS=(
  "ssd_mobilenetv1_model-weights_manifest.json"
  "ssd_mobilenetv1_model-shard1"
  "face_landmark_68_model-weights_manifest.json"
  "face_landmark_68_model-shard1"
  "face_recognition_model-weights_manifest.json"
  "face_recognition_model-shard1"
  "face_recognition_model-shard2"
)

for model in "${MODELS[@]}"; do
  if [ ! -f "$MODEL_DIR/$model" ]; then
    echo "Downloading $model..."
    curl -sL "$BASE_URL/$model" -o "$MODEL_DIR/$model"
  else
    echo "Already exists: $model"
  fi
done

echo "✓ Models ready in $MODEL_DIR"
