#!/bin/bash
set -e

ROOT=$(pwd)

echo "======================================"
echo " CAMPIGO AUTO REPAIR"
echo "======================================"

############################
# 1. Install
############################

echo
echo "[1/9] Installing packages..."
npm install || true

############################
# 2. Prisma
############################

echo
echo "[2/9] Prisma generate..."
cd apps/api

npx prisma generate || true

############################
# 3. DTO UUID mismatch
############################

echo
echo "[3/9] Fixing categoryId validation..."

find src -name "*.dto.ts" | while read file
do
python3 - "$file" <<'PY'
from pathlib import Path
import re
import sys

p=Path(sys.argv[1])
t=p.read_text()

t=t.replace("@IsOptional() @IsUUID() categoryId?: string;",
            "@IsOptional() @IsString() categoryId?: string;")

if "categoryId?: string" in t:
    t=t.replace("IsUUID","IsString")

p.write_text(t)
PY
done

############################
# 4. Lint
############################

echo
echo "[4/9] ESLint..."
cd "$ROOT"

npm run lint || true

############################
# 5. API build
############################

echo
echo "[5/9] API build..."
cd apps/api

npm run build > /tmp/api_build.log 2>&1 || true

############################
# 6. WEB build
############################

echo
echo "[6/9] WEB build..."
cd "$ROOT/apps/web"

npm run build > /tmp/web_build.log 2>&1 || true

############################
# 7. Errors
############################

echo
echo "[7/9] Collecting errors..."

cat /tmp/api_build.log \
    /tmp/web_build.log \
    | grep -E "error TS|Error:|Cannot find|Type error|TS[0-9]+" \
    | sort | uniq \
    > "$ROOT/errors.txt"

############################
# 8. Summary
############################

echo
echo "[8/9] Summary"

API=$(grep -c "error TS" /tmp/api_build.log || true)
WEB=$(grep -c "error TS" /tmp/web_build.log || true)

echo
echo "API Errors : $API"
echo "WEB Errors : $WEB"

############################
# 9. Finish
############################

echo
echo "Repair completed."

echo
echo "Errors saved in:"
echo "$ROOT/errors.txt"

