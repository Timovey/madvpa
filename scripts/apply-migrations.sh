#!/bin/bash 
echo "Применяем миграции..."
grandParentDir=$(dirname "$(realpath $0)")/..
tsc
npx typeorm-ts-node-esm migration:run -d $grandParentDir/dist/db/dataSource.js