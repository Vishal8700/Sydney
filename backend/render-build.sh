#!/usr/bin/env bash
# render-build.sh

# Install Python dependencies
pip install -r requirements.txt

# Install Chrome
echo "Installing Chrome..."
mkdir -p /opt/render/project/.render/chrome
cd /opt/render/project/.render/chrome

# Download and install Chrome
wget -q -O chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -x chrome.deb .

# Set up Chrome binary path
export CHROME_BIN=/opt/render/project/.render/chrome/opt/google/chrome/google-chrome
export PATH="${PATH}:/opt/render/project/.render/chrome/opt/google/chrome"

echo "Chrome installation completed"
