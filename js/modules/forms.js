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