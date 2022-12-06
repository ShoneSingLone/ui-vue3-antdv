# 更新记录

## 20221205153416
- layer.ts rename LayerUtils
- 开始重构function Class prototype 的形式为 ES6 Class 写法

## 20221126234135

- 增加虚拟列表

## 20221027101024

### xIcon 

- [ ] 内置svg，`src/assets` ,通过svgHelper打包成字符串。
  - `<img src="/public/assets/svg/vite.svg" style="display: none" id="svg_assets_img" />`,配合`State_UI.setAssetsBaseById("svg_assets_img");` 设置 assets基本路径
- [ ] 如果网络加载成功，优先级更高（可以覆盖内置的svg）