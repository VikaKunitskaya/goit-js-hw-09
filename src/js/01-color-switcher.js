
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.body,
  };

  refs.startBtn.addEventListener('click', startFn)

  refs.stopBtn.addEventListener('click', stopFn)

  function startFn() {
    refs.startBtn.disabled = true;
    timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
}, 1000);
  }

  function stopFn() {
    refs.startBtn.disabled = false;
    clearInterval(timerId);
  }

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
