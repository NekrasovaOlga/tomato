import {Tomato} from './tomato';


export class TomatoList {
    constructor(name, className, id, count = 0 ){
        this.id = id;
        this.name = name;
        this.count = count;
        this.className = className;
        
    }

    reName(name) {
        this.name = name;
    }

    increaseСount(id) {
        if(id === this.id) {
            return this.count = this.count + 1;
        }
       
    }
    activeTomato(id){
        if(+id === this.id) {
            return this;
        }
    }
}

export class ImportantTask extends TomatoList {
    constructor(name, className, id, importance = 'Важная задача'){
        super(name, className, id)
        this.importance = importance;
    }
    
}
export class StandardTask extends TomatoList {
    constructor(name, className, id, importance = 'Стандартная задача'){
        super(name, className, id)
        this.importance = importance;
    }
}

export class UnimportanTask extends TomatoList {
    constructor(name, className, id, importance = 'Неважная задача'){
        super(name, className, id)
        this.importance = importance;
    }
    
}

export class ConrollerTomato {
    #importance = 
        {
            'default': UnimportanTask,   
            'important': StandardTask,
            'so-so': ImportantTask,
        };
    
    constructor(command = []) {
        this.command = command;
    }

    operation(name, className, operation) {
        const Command = this.#importance[operation];
        const lengthArr = this.command.length + 1;
        const command = new Command(name, className, lengthArr);
        this.command.push(command)
        
        const task = new Tomato({});
        task.addList(this.command);
    }

    delList(id) { 
        if (id !== -1) {
            this.command.splice(id, 1)
        }
        return this.command
    }

    reName(id, value) {
        const newList = this.command.map((item, index) => {
            if(id === index){
                item.reName(value);
                return item;
            } else {
                return item;
            }
        })
        return this.command = newList;
    }
}