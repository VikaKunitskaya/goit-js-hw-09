import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose() {
    const selectedDate = new Date(refs.imputEl.value).getTime();
    const currentDate = Date.now();
    const deltaTime = selectedDate - currentDate;

    if (deltaTime <= 0) {
      refs.startBtn.disabled = true;
      const message = 'Plese choose a date in the future';

      return Notiflix.Report.failure('', message);
    }

    refs.startBtn.disabled = false;
  },
});

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  imputEl: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

refs.startBtn.disabled = true;

const timer = {
  start() {
    const startDate = new Date(refs.imputEl.value).getTime();
    refs.startBtn.disabled = true;
    refs.imputEl.disabled = true;

    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startDate - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      if (deltaTime < 0) {
        return clearTimeout(timerId);
      }

      refs.days.textContent = `${days}`;
      refs.hours.textContent = `${hours}`;
      refs.minutes.textContent = `${minutes}`;
      refs.seconds.textContent = `${seconds}`;

    }, 1000);
  },
};

refs.startBtn.addEventListener('click', timer.start);
