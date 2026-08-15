import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const startBtn = document.querySelector('.input button');
startBtn.setAttribute('disabled', '');
const myInput = document.querySelector('#datetime-picker');
const fp = flatpickr(myInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.setAttribute('disabled', '');
    } else {
      startBtn.removeAttribute('disabled');
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
    }
  },
}); // flatpickr

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value >= 0) {
    return String(value).padStart(2, '0');
  }
  return '00';
}

startBtn.addEventListener('click', event => {
  const selectedTime = userSelectedDate.getTime();
  startBtn.setAttribute('disabled', '');
  myInput.setAttribute('disabled', '');
  const intervalId = setInterval(() => {
    const diff = selectedTime - Date.now();
    const { days, hours, minutes, seconds } = convertMs(diff);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);

    if (diff <= 0) {
      clearInterval(intervalId);
      myInput.removeAttribute('disabled');
    }
  }, 1000);
});
