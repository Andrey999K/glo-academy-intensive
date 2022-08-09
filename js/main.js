"use strict";

const ajaxSend = async (formData) => {
    // создаём функцию отправки формы
    const fetchResp = await fetch("telegram.php", {
        // указываем обработчик формы — telegram.php
        method: "POST", // метод, которым мы отправляем форму
        body: formData, // что будет внутри формы — содержимое input
    });
    if (!fetchResp.ok) {
        // если ошибка, то...
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`); // выводис статус ошибки и текст
    }
    return await fetchResp.text(); // если все хорошо, возвращаем ответ сервера
};

const forms = document.querySelectorAll("form"); // находим все теги form
forms.forEach((form) => {
    // для каждой формы...
    form.addEventListener("submit", function (e) {
        // отслеживаем событие отправки
        e.preventDefault(); // отменить стандартную отправку формы
        const formData = new FormData(this); // собираем все данные из формы

        ajaxSend(formData) // передаём данные из формы в обработчик
            .then((response) => {
                console.log(response);
                // если всё успешно, то...
                this.innerHTML = "Спасибо, <br> заявку получили"; /* окно благодарности */
                form.reset(); /* очищаем поля формы */
            })
            .catch((err) => console.error(err)); /* если ошибка, выводим в консоль */
    });
});