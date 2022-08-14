import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit', onClickBtn);
let delay = 0;


function onClickBtn(e) {
  e.preventDefault();

  if (refs.delay.valueAsNumber < 0 || refs.amount.valueAsNumber < 0 || refs.step.valueAsNumber < 0) {
    Notify.failure('Delay or amount must be greater than 0');
  } else {
    delay = refs.delay.valueAsNumber;
    for (let i = 1; i < refs.amount.valueAsNumber + 1; i += 1) {
      delay += refs.step.valueAsNumber;
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })
}