import {ConrollerTomato } from './tomatoClass.js';

let count = 0;
const imp = ['default', 'important', 'so-so'];
const form = document.querySelector('.task-form');
document.querySelector('.button-importance').addEventListener('click', ({target}) => {
  count += 1;
  if (count >= imp.length) {
    count = 0
  }

  for (let i = 0; i < imp.length; i++) {
    if (count === i) {
      target.classList.add(imp[i])
      target.dataset.type = imp[i]
    } else {
      target.classList.remove(imp[i])
    }
  }
})
const controllerTomato = new ConrollerTomato();

form.addEventListener('submit', e => {
  e.preventDefault();

  const task = form['task-name'].value;
  const typeTask = form.querySelector('.button-importance').dataset.type;
  const className = (typeTask) ? typeTask : 'default';
  controllerTomato.operation(task, className, className);

  form.reset();
})