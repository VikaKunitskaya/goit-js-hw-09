import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', myFunction);

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
  return promise;
}

function myFunction(event) {
  event.preventDefault();
  const formData = new FormData(refs.form);
  const data = {};

  for (const item of formData) {
    data[item[0]] = Number(item[1]);
  }
  console.log(data);

  for (let index = 1; index <= data.amount; index++) {
    data.delay += data.step;
    createPromise(index, data.delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}


