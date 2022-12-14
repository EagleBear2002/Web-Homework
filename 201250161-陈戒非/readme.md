# 第一次作业
## 主题：南京的那抹秋意


## svg动态水印

- 通过subpage.js文件中的waterDocumentSvg函数给class为watermark的标签设置backgroud-img属性实现svg动态水印（见图2，图3）

![](readme\a.png)
![](readme\b.png)
![](readme\c.png)

- 防止因为蒙了一层水印，一些点击事件/拖动事件穿透不下去，在subPage.css文件里面我们设置pointer-events: none（见图4）

![](readme\d.png)

- 为了防止用户通过修改html代码删除前端水印，我们借助了一个API https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
  

-  当监听到一个水印层被删除时立即补上一个水印层，因为如果直接监听加水印的div标签，当这个标签被删除不会触发监听事件，所以我们监听水印+内容的父div节点，监听父节点下面子节点的变化


- 当监听的对象 mutationsList 出现 div 被删除了mutationsList[0].removedNodes。并且删的就是水印层的话，直接往父级重新添加一个水印层即可（见图5）

![](readme\e.png)

## 傅里叶频域变化水印（采用方法二，方法一被注释掉了）

###方法一：先将图片加载到canvas标签里面，再调用 writeMsgToCanvas ，缺点：加载速度非常慢

- 频域变化前见下图

![](readme\a.png)

- 我们通过 window.onload 函数在开始加载页面的时候把没有加频域水印的图片加载到 canvas 里，再调用 CryptoStego 的 writeMsgToCanvas 函数，第一个参数是加载了图片的画布ID，这里是 'image' ，第二个参数是要写入图片的消息，我用的学号加姓名201250161CJF，第四个参数是图片鲁棒性（见下图）


- 当 writeMsgToCanvas 返回 true 的时候标识频域水印添加成功，我们通过再在控制台输出的方式进行验证（见下下图）


- 因为图片较大需要等待15s左右才能加载出傅里叶变化后的图片

![](readme\g.png)

![](readme\h.png)

###方法二：重新封装 loadImgToCanvas 函数

- 把 CryptoStego 的几个js文件复制过来，修改 loadImgToCanvas 函数使根据请求路径获取图片进行傅里叶变化而不是根据点击按钮上传的图片

![](readme\i.png)

![](readme\j.png)

![](readme\k.png)

- 结果如下图，大概1秒就能出来，可能因为 loadImgToCanvas 异步的原因

![](readme\l.png)