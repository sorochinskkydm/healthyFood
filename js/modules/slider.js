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

export default slider;