"use strict";

import tabs  from './modules/tabs';
import timer  from './modules/timer';
import modal  from './modules/modal';
import forms  from './modules/forms';
import slider  from './modules/slider';
import calculator  from './modules/calculator';
import cards  from './modules/cards';

document.addEventListener("DOMContentLoaded", () => {
    tabs();
    timer();
    modal();
    forms();
    slider();
    calculator();
    cards(); 
});
