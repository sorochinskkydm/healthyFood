"use strict";


document.addEventListener("DOMContentLoaded", () => {

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

    //timer

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

        //cards

        const containerCard = document.querySelector(".container"); 
        class MenuCard {
            constructor(img, subtitle, description, price) {
                this.img = img;
                this.subtitle = subtitle;
                this. description = description;
                this. price = price;
            }

            createMenuCard = function() {
                const menuCardItem = document.createElement("div");
                menuCardItem.innerHTML = 
                                    `<div class="menu__item">
                                        <img src="${this.img}" alt="vegy">
                                        <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                                        <div class="menu__item-descr">${this.description}</div>
                                        <div class="menu__item-divider"></div>
                                        <div class="menu__item-price">
                                            <div class="menu__item-cost">Цена:</div>
                                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                        </div>
                                    </div>`
                containerCard.append(menuCardItem);
            }
        }

        containerCard.innerHTML = "";

        const menuCardItem1 = new MenuCard("img/tabs/vegy.jpg",'Меню "Фитнес"', "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!", 229);
        menuCardItem1.createMenuCard();
        const menuCardItem2 = new MenuCard("img/tabs/elite.jpg", 'Меню “Премиум”','В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550);
        menuCardItem2.createMenuCard();
        const menuCardItem3 = new MenuCard("img/tabs/post.jpg", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 430);
        menuCardItem3.createMenuCard();

        




});