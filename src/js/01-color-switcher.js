const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
};


let timerId = null;

disableBtn(refs.stopBtn);

refs.startBtn.addEventListener('click', onClickStart);

function onClickStart(e) {
    enableBtn(refs.stopBtn)
    e.target.disabled = true;
    refs.stopBtn.addEventListener('click', onClickStop);
    changeBodyColor(getRandomHexColor());
    timerId = setInterval(() => {
        color = getRandomHexColor();
        changeBodyColor(color)
    }, 1000)
}

function onClickStop(e) {
    enableBtn(refs.startBtn);
    e.target.disabled = true;
    clearInterval(timerId);
}

function disableBtn(btnRef) {
    btnRef.disabled = true
}

function enableBtn(btnRef) {
    btnRef.disabled = false
}

function changeBodyColor(color) {
    refs.body.style.backgroundColor = color;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}