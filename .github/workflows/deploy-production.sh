#!/usr/bin/env sh

if [ -z "$VERCEL_ORG_ID" ] || [ -z "$VERCEL_PROJECT_ID" ] || [ -z "$VERCEL_TOKEN" ]; then
  echo "::error ::You need to set VERCEL_ORG_ID, VERCEL_PROJECT_ID, and VERCEL_TOKEN secrets"
  exit 1
fi

chmod 777 "$GITHUB_WORKSPACE"

npm i -g vercel

VERCEL_ORG_ID="$VERCEL_ORG_ID" VERCEL_PROJECT_ID="$VERCEL_PROJECT_ID" vercel -t "$VERCEL_TOKEN" -c --prod