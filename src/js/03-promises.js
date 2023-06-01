import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const firstDelay = parseInt(delayInput.value);
  const delayStep = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  if (stepInput.value <= 0 || delayInput.value <= 0 || amountInput.value <= 0) {
    Notiflix.Notify.info('All fields must be greater than 0.');
    return;
  }

  let currentDelay = firstDelay;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    currentDelay += delayStep;
  }
});