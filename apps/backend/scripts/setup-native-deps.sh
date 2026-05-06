#!/usr/bin/env bash
set -euo pipefail

# System dependencies for canvas (node-canvas) and sharp on Ubuntu/Debian
# Run this once on the server before `pnpm install`

if command -v apt-get &>/dev/null; then
  echo "Installing system deps for canvas + sharp (Ubuntu/Debian)..."
  sudo apt-get update -qq
  sudo apt-get install -y --no-install-recommends \
    build-essential \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    librsvg2-dev \
    libvips-dev
  echo "System deps installed."
elif command -v brew &>/dev/null; then
  echo "Installing system deps for canvas + sharp (macOS)..."
  brew install pkg-config cairo pango libpng jpeg giflib librsvg vips
  echo "System deps installed."
else
  echo "Unsupported package manager. Install manually:"
  echo "  cairo, pango, libjpeg, giflib, librsvg, libvips"
  exit 1
fi
