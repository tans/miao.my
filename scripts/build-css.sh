#!/bin/sh
# 重新生成 assets/css/app.css（Tailwind CSS 4 + daisyUI 5 编译产物）。
# 站点样式全部内联在这个构建里（styles/examples 已并入），
# 不再维护单独的 CSS 文件。类名或页面变化后重跑一次，
# 并在 HTML 里递增 app.css?v= 的版本号。
# 依赖来自 web/node_modules（web/package.json devDependencies，npm ci 会装上）。
set -e
root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
input_css="$root/web/input.css"
trap 'rm -f "$input_css"' EXIT
{
  echo '@import "tailwindcss" source(none);'
  echo '@plugin "daisyui";'
  echo "@import \"$root/styles.css\";"
  echo "@import \"$root/examples.css\";"
  # 扫描全部公开页面（排除从产物与依赖目录），保证用到的工具类都被编译
  (cd "$root" && find . -name '*.html' \
      -not -path './_temp/*' -not -path './dist/*' \
      -not -path '*/node_modules/*' -not -path './.git/*' \
    | sed 's|^\./||') \
    | while read -r f; do echo "@source \"$root/$f\";"; done
} > "$input_css"
(cd "$root/web" && npx --no-install @tailwindcss/cli -i "$input_css" -o "$root/assets/css/app.css" --minify)
echo "wrote $root/assets/css/app.css"
