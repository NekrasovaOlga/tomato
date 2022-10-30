import { RenderTomato } from "./RenderTomato.js";
import { ConrollerTomato } from "./tomatoClass.js";

export class Tomato {
    runTimer = 0;
    startTimer = 0;
    timeTask = true;
  constructor({ timeLead = 5, pause = 2, bigPause = 3 }) {
    this.timeLead = timeLead;
    this.pause = pause;
    this.bigPause = bigPause;
    this.list = [];
    this.activeList = null;
  }

  addList(nameList) {
    this.list.push(nameList);
    const renderTomato = new RenderTomato(nameList);
    renderTomato.init(this);
  }

  activateTask(id) {
   return this.activeList = this.list[0].filter((item) =>
      item.activeTomato(id)
    );

  }

  changeName(id, value) {
    const index = this.list[0].findIndex((item) => item.id === +id);
    const conrtoller = new ConrollerTomato(this.list[0]);
    conrtoller.reName(index, value);
  }

  deleteTask(id) {
    clearInterval(this.runTimer);
    const index = this.list[0].findIndex((item) => item.id === +id);
    const conrtoller = new ConrollerTomato(this.list[0]);
    this.list = conrtoller.delList(index);
  }

  currentCount(id) {
    return this.activeList[0].increaseСount(id);
  }

  timerCall() {
    let pause;
    const timer = (render, taskActive) => {
      let minutes = (this.startTimer / 60) % 60;
      let second = this.startTimer % 60;
      if (this.startTimer >= 0) {
        const time = `${Math.trunc(minutes)} : ${
          second < 10 ? "0" + Math.trunc(second) : Math.trunc(second)
        }`;
        render.renderEl(time, taskActive.name, taskActive.count);
      } else {
        clearInterval(this.runTimer);
        console.log(taskActive)
        if (this.timeTask) {
          this.currentCount(taskActive.id);
          pause = this.timerPause(taskActive);
          this.startTimer = pause * 60;
          this.timerCall();
          this.runTimer = setInterval(function() {timer(render, taskActive)}, 1000);
        } else {
            this.timeTask = true;
            this.startTimer = this.timeLead * 60;
            this.timerCall();
            this.runTimer = setInterval(function() {timer(render, taskActive)}, 1000);
        }
      }
      this.startTimer = this.startTimer - 30;
    };

    return timer;
  }

  timerPause(taskActive) {
    if (taskActive.count % 3 == 0 && this.countTime !== 0) {
        this.timeTask = false;
      return this.bigPause
    } else {
      this.timeTask = false;
      return this.pause
    }
  }

  runTask(id) {
    const renderTomato = new RenderTomato(); 
    clearInterval(this.runTimer);
    const active = this.activateTask(id);
    this.startTimer = 0;
    if (active) {
      this.startTimer = (this.startTimer === 0) ? this.timeLead * 60 : this.startTimer;
      const timer = this.timerCall();
      this.runTimer = setInterval(function() {timer(renderTomato, active[0])}, 1000);
    } else {
      console.log("Нет активной задачи");
    }
  }

  stopTask() {
    this.activeList = null;
    clearInterval(this.runTimer);
  }
}
