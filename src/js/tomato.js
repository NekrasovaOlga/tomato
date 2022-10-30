import {TomatoList} from './tomatoClass.js';

export class Tomato {
    constructor({timeLead = 25, pause = 5, bigPause = 15}) {
        this.timeLead = timeLead;
        this.pause = pause;
        this.bigPause = bigPause;
        this.list = [];
        this.activeList = null;
    }

    addList(nameList, countList) {
        this.list.push(new TomatoList(nameList, countList));
    }

    activateTask(id) {
        return this.activeList = this.list.filter(item => item.activeTomato(id));
    }

    currentCount(id) {
        return this.activeList[0].increaseСount(id)
    }

    timer(timeMinutes, count) {
        let startTimer = timeMinutes * 60;
            const timer = setInterval( () => {
                let minutes = startTimer / 60 % 60;
                let second = startTimer % 60;
                if(startTimer >= 0) {
                    const time = `${Math.trunc(minutes)} : ${Math.trunc(second)}`;
                    console.log(time)
                } else {
                    clearInterval(timer);
                    this.currentCount(count.id);
                    console.log(this.activeList)
                    if(timeMinutes === this.timeLead){
                        this.timerPause(count)
                    }
                }
                startTimer = startTimer - 60;
            }, 1000)
        }

    timerPause(count) {
        if(count.count%3 == 0 && this.countTime !== 0) {
            this.timer(this.bigPause, count);
        }else {
            this.timer(this.pause, count);
        }
    }


    runTask() {
        if(this.activeList){
            this.timer(this.timeLead, ...this.activeList);
        } else {
            console.log('Нет активной задачи');
        }
    }
}