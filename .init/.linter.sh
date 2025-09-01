#!/bin/bash
cd /home/kavia/workspace/code-generation/recipe-app-15745-15846/WebFrontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

