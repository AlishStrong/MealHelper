#!/bin/bash

# Prepares a firebase-apikey.ts file with apiKey for the Firebase project
echo "export const firebaseApiKey = {
  apiKey: \"${MEALHELPER_APIKEY}\"
};" > src/environments/firebase-apikey.ts
