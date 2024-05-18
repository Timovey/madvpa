#!/bin/bash 
echo "Введите имя миграции:"
read NAME
grandParentDir=$(dirname "$(realpath $0)")/..
tsc
npx typeorm-ts-node-esm migration:generate $grandParentDir/src/db/migrations/$NAME -d $grandParentDir/dist/db/dataSource.js