import {Tomato} from './js/tomato';

import {TomatoList} from './js/tomatoClass.js';

import './index.html'
import './scss/index.scss'

const tomat = new Tomato({
    timeLead: 25,
});
const banana = tomat.addList('Банан')
tomat.addList('Кокос')


tomat.activateTask(tomat.list[0].id)
tomat.runTask()
