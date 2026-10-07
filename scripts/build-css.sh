#!/bin/sh
# 重新生成 assets/css/app.css（自托管的 Tailwind CSS 4 + daisyUI 5 编译产物，
# 扫描 index.html 与 docs 页面实际用到的类，替代 jsdelivr CDN）。
# 产物提交进仓库；类名变化后重跑一次，并在 HTML 里递增 app.css?v= 的版本号。
# 需要 node/npm。
set -e
root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
cd "$tmp"
npm init -y >/dev/null
npm i --no-fund --no-audit tailwindcss@4 daisyui@5 @tailwindcss/cli@4 >/dev/null
cat > input.css <<EOF
@import "tailwindcss" source(none);
@source "$root/index.html";
@source "$root/docs/index.html";
@source "$root/docs/template.html";
@plugin "daisyui";
EOF
npx @tailwindcss/cli -i input.css -o "$root/assets/css/app.css" --minify
echo "wrote $root/assets/css/app.css"
