# loading 组件 规范

## 模式

- card loading
  
- 栅栏 loading
  
## prop

- `loading`(初始延迟loading)
  
    默认关闭，开启后，组件loading必定显示指定时间，用于容错。

- `opacity`(遮罩透明度)

    loading时，是否显示上一次数据。

- `icon`(loading 图片,仅适用于card模式)

    展示loading的图片内容

- `iconSize`(图片大小)

    设置loading图片的大小

## solt

- `error`(异常显示dom)
  
## 注意点

- loading加载时需要指定固定长宽，默认长宽覆盖父容器，否则可能会造成dom偏移影响用户体验。

- loading容器,错误处理dom,展示dom应当同级。避免多余的dom层级嵌套。 