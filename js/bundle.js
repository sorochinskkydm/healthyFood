/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

function calculator() {
    const result = document.querySelector('.calculating__result span');
    
        let sex, height, weight, age, ratio;
    
        if (localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }
    
        if (localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
        } else {
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }
    
        function calcTotal() {
            if (!sex || !height || !weight || !age || !ratio) {
                result.textContent = '____';
                return;
            }
            if (sex === 'female') {
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    
        calcTotal();
    
        function initLocalSettings(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
                if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                    elem.classList.add(activeClass);
                }
                if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    elem.classList.add(activeClass);
                }
            });
        }
    
        initLocalSettings('#gender div', 'calculating__choose-item_active');
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
        function getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
                elem.addEventListener('click', (e) => {
                    if (e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                    } else {
                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'));
                    }
        
                    elements.forEach(elem => {
                        elem.classList.remove(activeClass);
                    });
        
                    e.target.classList.add(activeClass);
        
                    calcTotal();
                });
            });
        }
    
        getStaticInformation('#gender div', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    
        function getDynamicInformation(selector) {
            const input = document.querySelector(selector);
    
            input.addEventListener('input', () => {
                if (input.value.match(/\D/g)) {
                    input.style.border = "1px solid red";
                } else {
                    input.style.border = 'none';
                }
                switch(input.getAttribute('id')) {
                    case "height":
                        height = +input.value;
                        break;
                    case "weight":
                        weight = +input.value;
                        break;
                    case "age":
                        age = +input.value;
                        break;
                }
    
                calcTotal();
            });
        }
    
        getDynamicInformation('#height');
        getDynamicInformation('#weight');
        getDynamicInformation('#age');
}

module.exports = calculator;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResourses = async (url) => {
        const result = await fetch(url);
        if(!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }
        return await result.json();
    }

    getResourses('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    const forms = document.querySelectorAll("form");

        const message = {
            loading: "Загрузка",
            success: "Спасибо, скоро мы с Вами свяжемся!",
            failure: "Что-то пошло не так.."
        }

        const postData = async (url, data) => {
            const result = await fetch(url, {
                method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: data
            });

            return await result.json();
        }

        function bindPostData(form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const statusMessage = document.createElement("div");  
                statusMessage.classList.add("status");
                statusMessage.textContent = message.loading;
                form.append(statusMessage);

                const formData = new FormData(form);

                const json = JSON.stringify(Object.fromEntries(formData.entries()))
                    postData('http://localhost:3000/requests', json)
                    .then(data => {
                        console.log(data);
                        statusMessage.textContent = message.success;
                        // setTimeout(function() {
                        //     statusMessage.remove();
                        // }, 3000);
                    })
                    .catch(() => statusMessage.textContent = message.failure)
                    .finally(() => form.reset());
            });
        }

        forms.forEach(item => {
            bindPostData(item);
        });
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    const modalWindow = document.querySelector(".modal");
        const triggerBtns = document.querySelectorAll("[data-modal]");
        const closeModalBtn = document.querySelector("[data-close]");

        triggerBtns.forEach(item => {
            item.addEventListener("click", () => {
                modalWindow.style.display = "block";
                document.body.style.overflow = "hidden";
            });
        });

        closeModalBtn.addEventListener("click", () => {
            modalWindow.style.display = "none";
            document.body.style.overflow = "";
        });
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    const slides = document.querySelectorAll(".offer__slide");
        const previousBtn = document.querySelector(".offer__slider-prev");
        const nextBtn = document.querySelector(".offer__slider-next");
        const currentSlide = document.getElementById("current");
        const totalSlides = document.getElementById("total");
        let slideIndex = 1;
        showSlides(slideIndex);
        
        function showSlides(n) {
            if(n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }

            slides.forEach(item => {
                item.style.display = "none";
            });

            slides[slideIndex - 1].style.display = "block";

            if (slides.length < 10) {
                totalSlides.textContent = "0" + slides.length;
            } else totalSlides.textContent = slides.length;

            if (slides.length < 10) {
                currentSlide.textContent = "0" + slideIndex;
            }
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        previousBtn.addEventListener('click', () => {
            plusSlides(-1);
        });

        nextBtn.addEventListener("click", () => {
            plusSlides(1);
        });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    const tabs = document.querySelectorAll(".tabheader__item");
    const tabsContent = document.querySelectorAll(".tabcontent");
    const tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = "none";
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");

    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        if(target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            }); 
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    const deadline = "2023-09-22";
    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date());
        let days = Math.floor(t/(1000 * 60 * 60 * 24));
        let hours = Math.floor((t/(1000 * 60 * 60)) % 24);
        let minutes = Math.floor((t/1000/60) % 60);
        let seconds = Math.floor((t/1000) % 60);

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector)
        let days = timer.querySelector("#days");
        let hours = timer.querySelector("#hours");
        let minutes = timer.querySelector("#minutes");
        let seconds = timer.querySelector("#seconds");
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


document.addEventListener("DOMContentLoaded", () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
    const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
    const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
    const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
    const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
    const calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
    const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");

    tabs();
    timer();
    modal();
    forms();
    slider();
    calculator();
    cards(); 
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map