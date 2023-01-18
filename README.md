# Web前端开发-作业6

## 运行说明

1. 安装 Node.js：终端输入 `npm install`；
2. 输入`node server.js`，启动服务端；
3. 在 WebStorm 或浏览器中打开 `login.html` 以进入登录页面。

## 实验功能和设计

使用 `opencv.js` 实现二级页面的卡通化，主要内容包括：

1. 彩色图片转成灰度图；
2. 对灰度图进行高斯模糊；
3. 图像二值化；
4. 再次对二值化图像进行模糊；
5. 再次进行二值化；
6. 图像开运算。

```js
cv['onRuntimeInitialized'] = () => {
    console.log("onRuntimeInitialized");
    let canvasOutput = document.getElementById('canvasOutput');
    let imgElement = document.getElementById('image1');
    document.getElementById("image1").src = document.getElementById("image1").src;
    imgElement.onload = function () {
        let img_origin = cv.imread(imgElement);
        let img_target = new cv.Mat();
        img(img_origin, img_target);
        img_origin.delete();
        img_target.delete();
    }
};

function img(img_origin, img_target) {
    console.log("img");
    let img_gray = cvtColor(img_origin);
    let ksize1 = new cv.Size(5, 5);
    let img_blurred1 = GaussianBlur(img_gray, ksize1);
    let img_threshold1 = adaptiveThreshold(img_blurred1);
    let img_blurred2 = GaussianBlur(img_threshold1, ksize1);
    let img_threshold2 = threshold(img_blurred2);
    let img_opening = bitwise_not(img_threshold2);
    let ksize2 = new cv.Size(3, 3);
    let img_opening_blurred = GaussianBlur(img_opening, ksize2);
    img_target = img_opening_blurred;
    cv.imshow('canvasOutput', img_target);
}

function cvtColor(img_origin) {
    console.log("cvtColor");
    let img_gray = new cv.Mat();
    cv.cvtColor(img_origin, img_gray, cv.COLOR_RGBA2GRAY, 0);
    return img_gray;
}

function GaussianBlur(img_origin, ksize) {
    console.log("GaussianBlur");
    let img_blurred = new cv.Mat();
    cv.GaussianBlur(img_origin, img_blurred, ksize, 0);
    return img_blurred;
}

function adaptiveThreshold(img_origin) {
    console.log("adaptiveThreshold");
    let img_threshold = new cv.Mat();
    cv.adaptiveThreshold(img_origin, img_threshold, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 5, 2);
    return img_threshold;
}

function threshold(img_origin) {
    console.log("threshold");
    let img_threshold = new cv.Mat();
    cv.threshold(img_origin, img_threshold, 200, 255, cv.THRESH_BINARY);
    return img_threshold;
}

function bitwise_not(img_origin) {
    console.log("bitwise_not");
    let img_opening = new cv.Mat();
    let M = new cv.Mat();
    let ksize = new cv.Size(3, 3);
    M = cv.getStructuringElement(cv.MORPH_CROSS, ksize);
    cv.morphologyEx(img_origin, img_opening, cv.MORPH_GRADIENT, M);
    return img_opening;
}

Module.onRuntimeInitialized();
```

## 实现效果

![](README/image-20230118214101360.png)

## 参考文献

1. [OpenCV.js实现乔丹动图素描效果图文教程](https://www.jb51.net/article/257984.htm)
