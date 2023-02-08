import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report,Notify } from 'notiflix/build/notiflix-report-aio';

require('flatpickr/dist/themes/material_blue.css');
let selectedDate = null;
const inputedDate = document.querySelector('#datetime-picker');
const spanValue = document.querySelectorAll('.value');
const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function updateTime({ days, hours, minutes, seconds }) {
  spanValue[0].textContent = `${days}`;
  spanValue[1].textContent = `${hours}`;
  spanValue[2].textContent = `${minutes}`;
  spanValue[3].textContent = `${seconds}`;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startButton.disabled = false;
    selectedDate = selectedDates[0];

    const defaultDate = options.defaultDate;

    if (defaultDate > selectedDate) {
      startButton.disabled = true;

      Report.failure('Please choose a date in the future');
    } else {
      Notify.success('date is correct');
    }
  },
};
flatpickr(inputedDate, options);

function startCountdown() {
  inputedDate.disabled = true;
  startButton.disabled = true;

  let timerID = null;
  timerID = setInterval(() => {
    const currentDate = new Date();
    const differrence = selectedDate - currentDate;

    if (differrence < 1000) {
      clearInterval(timerID);
      inputedDate.disabled = false;
    }
    let time = convertMs(differrence);
    updateTime(time);
  }, 1000);
}

startButton.addEventListener('click', () => {
  startCountdown();
});