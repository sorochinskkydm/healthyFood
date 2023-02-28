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








});