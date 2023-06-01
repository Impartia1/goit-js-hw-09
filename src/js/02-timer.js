// imports
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";



const startBtn = document.querySelector('button[data-start]');
startBtn.addEventListener('click', startTimer);

const daySpan = document.querySelector('[data-days]');
const hourSpan = document.querySelector('[data-hours]');
const minuteSpan = document.querySelector('[data-minutes]');
const secondSpan = document.querySelector('[data-seconds]');

const options = {
  intervalId: null,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentTime = Date.now();
    if (currentTime >= selectedDate) {
      return window.alert('Choose date in the future');
      
    }
    startBtn.disabled = false;
    console.log(convertMs(selectedDate - currentTime));
  },

};

const datePickr = flatpickr('#datetime-picker', options);

function startTimer() {
  const selectedDate = document.getElementById("datetime-picker").value;
  const selectedDateTime = new Date(selectedDate);
  const currentDate = new Date();

  const countdown = setInterval(updateTimer, 1000);

  function updateTimer() {
    const timeRemaining = selectedDateTime - new Date();

    if (timeRemaining <= 0) {
      clearInterval(countdown);
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    updateTimerUI({ days, hours, minutes, seconds });

    document.getElementById("datetime-picker").disabled = true;
  }
}

function updateTimerUI({ days, hours, minutes, seconds }) {
  daySpan.textContent = days;
  hourSpan.textContent = hours;
  minuteSpan.textContent = minutes;
  secondSpan.textContent = seconds;
}

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
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}