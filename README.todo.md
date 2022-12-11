[Home](./README.md)


## 通用
- [x] indexeddb 前缀，方便清理和枚举

## 组件 

- [x] Demo页面加载独立的vue文档，弹窗展示源码
  ![](README.md_assets/2022-12-02-16-25-39.png)
- [x] 使用boundless方式加载demo文件
  - [ ] css scoped 的解析  
- [ ] ![](README.todo.md_assets/2022-12-08-18-42-03.png)
- [ ] 允许动态修改demo文件，然后主动触发运行
- [ ] datagrid
  - [ ] isHideFilter: true,
- [ ] layer
    - [ ] 弹窗效果从点击位置打开，openAtPoint
    - [ ] tips
    - [ ] dialog
      - [x] resize
      - [ ] esc 退出最上层dialog
    - [ ] confirm
    - [ ] tips 的样式
      - [用SVG实现一个优雅的提示框](https://zhuanlan.zhihu.com/p/143876210)
      - [daimabiji](http://demo.daimabiji.com/1553/)
    - [x] onlyEllipsis:只有在出现省略号的情况下才弹出tips（延迟显示）
    - [x] 使用组件的时候，rePosition
    - [x] click uiPopover 的处理
    - [x] click 右键 的处理
    - [x] layerIndex 动态增减
- [ ] 虚拟列表 onSelectedChange emit
- [ ] 组件的单独加载？
    - [ ] 路由与视图的 import 加载，默认文件夹？

### xItem

- [ ] readonly模式

## 指令

- [x] v-uiPopover
- [x] v-uiMove