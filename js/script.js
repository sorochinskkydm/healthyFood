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
        })
    

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




        //slider

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





});