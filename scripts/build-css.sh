#!/bin/sh
# 重新生成 assets/css/app.css（Tailwind CSS 4 + daisyUI 5 编译产物）。
# 站点样式全部内联在这个构建里（styles/examples 已并入），
# 不再维护单独的 CSS 文件。类名或页面变化后重跑一次，
# 并在 HTML 里递增 app.css?v= 的版本号。需要 node/npm。
set -e
root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
cd "$tmp"
npm init -y >/dev/null
npm i --no-fund --no-audit tailwindcss@4 daisyui@5 @tailwindcss/cli@4 >/dev/null
{
  echo '@import "tailwindcss" source(none);'
  echo '@plugin "daisyui";'
  echo "@import \"$root/styles.css\";"
  echo "@import \"$root/examples.css\";"
  # 扫描全部公开页面（含 zh/en 镜像与原型），保证用到的工具类都被编译
  (cd "$root" && find . -name '*.html' -not -path './_temp/*' | sed 's|^\./||') \
    | while read -r f; do echo "@source \"$root/$f\";"; done
} > input.css
npx @tailwindcss/cli -i input.css -o "$root/assets/css/app.css" --minify
echo "wrote $root/assets/css/app.css"
