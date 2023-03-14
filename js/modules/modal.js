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

export default modal;