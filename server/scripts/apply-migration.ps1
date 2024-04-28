Write-Host "Apply migration..."
$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition
$grandParentDir = Split-Path -parent $scriptPath
tsc
npx typeorm-ts-node-esm migration:run -d $grandParentDir/dist/db/dataSource.js