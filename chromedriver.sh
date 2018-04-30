#!/bin/bash

# bash < <(curl -s https://gist.githubusercontent.com/fantactuka/3228898/raw/f0806a64306426ca72f16734ae7cd16c1f84bd87/update-chrome-driver.sh)

echo "Updating Chrome Driver"
sudo su

if [ -e /usr/bin/chromedriver ]; then
    rm /usr/bin/chromedriver
    echo "Removing current Chrome Driver from /usr/bin"
else
    echo "Didn't find Chrome Driver at /usr/bin"
fi

curl -O http://chromedriver.storage.googleapis.com/2.14/chromedriver_mac32.zip
unzip chromedriver_mac32.zip -d /usr/bin
rm chromedriver_mac32.zip
chmod 777 /usr/bin/chromedriver

echo "Congratulations, Chrome Driver successfully updated"