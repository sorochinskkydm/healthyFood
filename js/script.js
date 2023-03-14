"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const tabs = require('./modules/tabs');
    const timer = require('./modules/timer');
    const modal = require('./modules/modal');
    const forms = require('./modules/forms');
    const slider = require('./modules/slider');
    const calculator = require('./modules/calculator');
    const cards = require('./modules/cards');

    tabs();
    timer();
    modal();
    forms();
    slider();
    calculator();
    cards(); 
});
