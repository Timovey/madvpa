$NAME = Read-Host "Enter migration name"
$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition
$grandParentDir = Split-Path -parent $scriptPath
tsc
npx typeorm-ts-node-esm migration:generate $grandParentDir/src/db/migrations/$NAME -d $grandParentDir/dist/db/dataSource.js