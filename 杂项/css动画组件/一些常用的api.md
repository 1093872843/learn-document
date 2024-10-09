获取element的整数像素宽高,

~~~js
若元素被隐藏则返回0；
//该值会被四舍五入为整数，如需要浮点数，请使用element.getBoundingClientRect().
//该长度不包括margin，只包括context，padding，border
element.offsetWidth;
element.offsetHeight;





//获取鼠标位置，
 mouseX = e.clientX;
 mouseY = e.clientY;

~~~


获取element的浮点数像素宽高或者距离窗口视图距离

~~~javascript
//获取元素的宽高,返回值是一个 DOMRect 的只读对象
/*DOMRect:{
left:元素左侧相较于视图窗口左侧像素距离,
top:元素上侧相较于视图窗口的顶部像素距离,
right:元素右侧相较于视图窗口的左侧像素距离,
bottom:元素下侧相较于视图窗口的顶部像素距离,
x:元素原点的x位置,
y:元素原点的y位置,
width:元素的宽，浮点数
height:元素的高，浮点数
}
*/
element.getBoundingClientRect().
~~~


//返回元素距离文档原点的距离
window.scrollX+element.getBoundingClientRect().x
window.scrollY+element.getBoundingClientRect().y
