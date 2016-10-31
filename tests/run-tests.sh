#!/bin/bash

if [ $# -lt 3 ]
  then
    filename=$(basename -- "$0")
    echo "Not enough arguments supplied, please provide arguments in following order for DUT"
    echo "$ ./$filename <user> <IP> <ssh port>"
    exit 1
fi

echo 'Setup the environment before running snapweb selenium test'
echo '----------------------------------------------------------'
wget -nc http://chromedriver.storage.googleapis.com/2.25/chromedriver_linux64.zip
unzip -o chromedriver_linux64.zip
export PATH=$PATH:$PWD

echo 'Download Standalone Selenium Server...'
wget -nc https://selenium-release.storage.googleapis.com/3.0/selenium-server-standalone-3.0.1.jar

npm install webdriverio --save-dev
npm install chai --save-dev
npm install wdio-mocha-framework --save-dev
npm install wdio-junit-reporter --save-dev

echo 'Launch Selenium Server ...'
java -jar ./selenium-server-standalone-3.0.1.jar &
pid=$!
echo $pid
sleep 10

echo 'Get authentication token by running sudo snapweb.generate-token on DUT'

token=$(ssh -p $3 $1@$2 'bash -s' < ./get-token.sh)
#echo $token

echo 'Run selenium tests for snapweb service on given IP'
TOKEN=$token ../node_modules/.bin/wdio -b https://$2:4201

kill -9  $pid
