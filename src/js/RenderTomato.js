import { Tomato } from './tomato';

export class RenderTomato {
  constructor(list) {
    this.list = list;
  }

  renderItem(el) {
    const items = this.list.map((item) => {
      const liElem = document.createElement('li');
      liElem.className = `pomodoro-tasks__list-task ${item.className}`;

      const spanLi = document.createElement('span');
      spanLi.className = 'count-number';
      spanLi.textContent = item.id;

      const buttonText = document.createElement('button');
      buttonText.className = 'pomodoro-tasks__task-text';
      buttonText.textContent = item.name;
      buttonText.contentEditable = false;
      buttonText.dataset.id = item.id;

      buttonText.addEventListener('input', (e) => {
        const countNumber = e.target
          .closest('.pomodoro-tasks__list-task')
          .querySelector('.count-number');
        el.changeName(countNumber.textContent, e.target.textContent);
      });

      buttonText.addEventListener('click', (e) => {
        const activeTaskAll = document.querySelectorAll(
          '.pomodoro-tasks__task-text_active'
        );
        activeTaskAll.forEach((task) => {
          task.classList.remove('pomodoro-tasks__task-text_active');
        });
        buttonText.classList.add('pomodoro-tasks__task-text_active');
      });

      const buttonTask = document.createElement('button');
      buttonTask.className = 'pomodoro-tasks__task-button';

      const burgeropup = document.createElement('div');
      burgeropup.className = 'burger-popup';

      buttonTask.addEventListener('click', (e) => {
        burgeropup.classList.toggle('burger-popup_active');
      });

      const buttonEdit = document.createElement('button');
      const buttonDelet = document.createElement('button');

      buttonEdit.className = 'popup-button burger-popup__edit-button';
      buttonDelet.className = 'popup-button burger-popup__delete-button';

      buttonEdit.textContent = 'Редактировать';
      buttonDelet.textContent = 'Удалить';

      buttonDelet.addEventListener('click', (e) => {
        el.deleteTask(item.id);
        e.target.closest('.pomodoro-tasks__list-task').remove();
      });

      buttonEdit.addEventListener('click', (e) => {
        const editButtonText = e.target
          .closest('.pomodoro-tasks__list-task')
          .querySelector('.pomodoro-tasks__task-text');
        editButtonText.contentEditable = true;
        burgeropup.classList.remove('burger-popup_active');
      });

      burgeropup.append(buttonEdit, buttonDelet);

      liElem.append(spanLi, buttonText, buttonTask, burgeropup);

      return liElem;
    });

    return items;
  }

  init(el) {
    const ul = document.querySelector('.pomodoro-tasks__quest-tasks');
    const render = this.renderItem(el);

    if (render.length <= 1) {
      this.changeButton(el);
    }
    ul.innerHTML = '';
    ul.append(...render);
  }

  changeButton(el) {
    const buttonPrimary = document.querySelector('.button-primary');
    buttonPrimary.addEventListener('click', (e) => {
      const activeTaskAll = document.querySelector(
        '.pomodoro-tasks__task-text_active'
      );
      el.runTask(+activeTaskAll.dataset.id);
    });

    const buttonSecondary = document.querySelector('.button-secondary');
    buttonSecondary.addEventListener('click', (e) => {
      el.stopTask();
    });
  }

  renderEl(time, name, count) {
    const title = document.querySelector('.window__panel-title');
    const timerText = document.querySelector('.window__timer-text');
    const countTask = document.querySelector('.window__panel-task-text');
    title.textContent = name;
    timerText.textContent = time;
    countTask.textContent = count;
  }
}
