import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const delayInput = document.querySelector('[name="delay"]');

const makePromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();

  makePromise(
    Number(delayInput.value),
    document.querySelector('input[name="state"]:checked').value
  )
    .then(value => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${value}ms`,
        position: 'topRight',
        icon: '',
        backgroundColor: '#6fcf97',
        messageColor: '#ffffff',
        messageSize: '20px',
        close: false,
        progressBar: false,
        class: 'app-toast',
      });
    })
    .catch(value => {
      iziToast.error({
        message: `❌ Rejected promise in ${value}ms`,
        position: 'topRight',
        icon: '',
        backgroundColor: '#eb5757',
        messageColor: '#ffffff',
        messageSize: '20px',
        close: false,
        progressBar: false,
        class: 'app-toast',
      });
    });
});
