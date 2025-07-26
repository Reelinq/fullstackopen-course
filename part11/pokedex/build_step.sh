#!/bin/bash

echo "Build script"

echo "Installing dependencies"
npm install
echo "Installing playwright"
npx playwright install --with-deps

echo "Running eslint"
npm run eslint

echo "Running build"
npm run build

echo "Running tests"
npm test

echo "Running e2e tests"
npm run test:e2e