function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

let interval;
function onStartClick() {
    startBtn.disabled = true;
    document.body.style.backgroundColor = getRandomHexColor();
    interval = setInterval(changeColor, 1000);
}

function onStopClick() {
    startBtn.disabled = false;
    clearInterval(interval);
}

function changeColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}