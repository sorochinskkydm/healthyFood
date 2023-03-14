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