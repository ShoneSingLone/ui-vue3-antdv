# 更新记录

## 20221027101024

### xIcon 

- [ ] 内置svg，`src/assets` ,通过svgHelper打包成字符串。
  - `<img src="/public/assets/svg/vite.svg" style="display: none" id="svg_assets_img" />`,配合`State_UI.setAssetsBaseById("svg_assets_img");` 设置 assets基本路径
- [ ] 如果网络加载成功，优先级更高（可以覆盖内置的svg）