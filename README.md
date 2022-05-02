L-System
========
#### L-System是分形的一种, 关于L-System, 请看百科页面 https://en.wikipedia.org/wiki/L-system
#### 此项目实现了一个js版本的2D的L-System渲染器, 支持以下符号:
* A-Z ：前进并画线
* a-z ：前进但不画线
* \+ ：逆时针旋转一个角度
* \- ：顺时针旋转一个角度
* [ ：将当前状态信息压栈
* ] ：从栈中弹出上一次压入的状态信息
* \# ：按线段宽度的增量要求增加线段的宽度
* ! ：按线段宽度的减量要求减少线段的宽度
* @ ：按线段宽度作半径画一个点

### [在线试玩](https://jjm2473.github.io/l-sys.js/src/index.html)

#### Thanks
* [www.kevs3d.co.uk](https://www.kevs3d.co.uk/dev/lsystems/)
* [Bootstrap](https://getbootstrap.com/docs/4.6)
* [jQuery](https://jquery.com/)
* [FontAwesome](https://fontawesome.com/)
