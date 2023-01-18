function waterDocumentSvg({
                              width = '130px',
                              height = '50px',
                              x = '37px',
                              y = "30px",
                              opacity = '0.5',
                              rotate = -20,
                              fontSize = '17px',
                              content = '请勿外传',
                              zIndex = 9,
                              color = "#34363B"
                          } = {}) {
    let svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
			<text x="${x}" y="${y}" transform = "rotate(${rotate},0,0)" opacity="${opacity}" font-size="${fontSize}" fill="${color}">${content}</text>
		</svg>`,
        base64Url = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`,
        dom = document.querySelector('.watermark') || document.createElement("div"),
        styleStr = `z-index: ${zIndex}; background-image: url('${base64Url}')`;

    dom.setAttribute('style', styleStr);
}

waterDocumentSvg({
    // 水印区域宽度
    width: '350px',
    // 水印区域高度
    height: '250px',
    // 文字左边距
    x: '30px',
    // 文字上边距
    y: "26px",
    // 文字透明度
    opacity: '0.5',
    // 旋转角度
    rotate: 45,
    // 文字大小
    fontSize: '24px',
    // 水印内容
    content: 'EagleBear2002',
    // 水印元素层级
    zIndex: 9,
    // 文字颜色
    color: "#34363B"
});

var observer = new MutationObserver(function (mutationsList, observer) {
    mutationsList.forEach(item => {
        if (item.removedNodes.length > 0) {
            item.removedNodes.forEach(removeNode => {
                if (isMonitoring(removeNode)) {
                    item.target.appendChild(removeNode)
                }
            })
        }
    })
})

document.querySelectorAll('.monitoring').forEach(item => {
    observer.observe(item.parentNode, {attributes: true, childList: true, subtree: true})
})
