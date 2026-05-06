#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MODEL_DIR="$SCRIPT_DIR/../src/lib/models"
BASE_URL="https://raw.githubusercontent.com/vladmandic/face-api/master/model"

mkdir -p "$MODEL_DIR"

MODELS=(
  "ssd_mobilenetv1_model-weights_manifest.json"
  "ssd_mobilenetv1_model.bin"
  "face_landmark_68_model-weights_manifest.json"
  "face_landmark_68_model.bin"
  "face_recognition_model-weights_manifest.json"
  "face_recognition_model.bin"
)

for model in "${MODELS[@]}"; do
  if [ ! -f "$MODEL_DIR/$model" ]; then
    echo "Downloading $model..."
    curl -sL "$BASE_URL/$model" -o "$MODEL_DIR/$model"
  else
    echo "Already exists: $model"
  fi
done

echo "Models ready in $MODEL_DIR"
