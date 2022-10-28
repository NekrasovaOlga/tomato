export default class Tomato {
    constructor(name, count = 0){
        this.id = Math.floor(Math.random() * 10000);
        this.name = name;
        this.count = count;
    }

    setReName(name) {
        this.name = name;
        return this;
    }

    increaseСount() {
        this.count = this.count + 1;
    }
}