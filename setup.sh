#!/bin/bash

export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh

set -e

PROJECT_NAME=$1

if [ -z "$PROJECT_NAME" ]; then
    echo "Error: project name is require."
    exit
fi

WORK_DIR=$(pwd)

git clone https://github.com/boonpin/base-vite-react-ts.git template

nvm use 18
yarn create vite "$PROJECT_NAME" --template react-ts
cd "$PROJECT_NAME"
yarn add dayjs react-icons axios \
    react-redux @reduxjs/toolkit \
    less less-loader \
    antd @ant-design/icons \
    react-router-dom \
    @types/node \
    echarts-for-react \
    keycloak-js @react-keycloak/web

rsync -ravz --delete $WORK_DIR/template/src/ $WORK_DIR/$PROJECT_NAME/src/
rsync -ravz $WORK_DIR/template/public/assets/ $WORK_DIR/$PROJECT_NAME/public/assets/

cp $WORK_DIR/template/tsconfig.json $WORK_DIR/$PROJECT_NAME/tsconfig.json
cp $WORK_DIR/template/tsconfig.node.json $WORK_DIR/$PROJECT_NAME/tsconfig.paths.json
cp $WORK_DIR/template/tsconfig.paths.json $WORK_DIR/$PROJECT_NAME/tsconfig.paths.json
cp $WORK_DIR/template/vite.config.ts $WORK_DIR/$PROJECT_NAME/vite.config.ts
