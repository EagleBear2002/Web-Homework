var dark = false;

function switchTheme() {
    if (dark === false) {
        document.body.style.backgroundColor = 'black';
        dark = true;
        document.getElementById('switchThemeButton').innerText = '切换至 light 主题';
    } else {
        document.body.style.backgroundColor = 'white';
        dark = false;
        document.getElementById('switchThemeButton').innerText = '切换至 dark 主题';
    }
}