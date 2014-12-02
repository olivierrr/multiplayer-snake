#!/usr/bin/env bash

cd client
npm install
npm run build
cd ../server
npm install 
node ./index.js
exit 0