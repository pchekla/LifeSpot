/*
* Глобальная переменная для хранения данных сессии
*/
let session = {};

/*
* Проверка возраста пользователя
*
* */
let checker = function (newVisit) {
    // Получаем возраст пользователя из sessionStorage
    let userAge = window.sessionStorage.getItem("userAge");
    
    if (userAge >= 18) {
        // Добавим проверку на первое посещение, чтобы не показывать приветствие
        // лишний раз
        if (newVisit) {
            alert("Приветствуем на LifeSpot! " + '\n' + "Текущее время: " + new Date().toLocaleString());
        }
    } else {
        alert("Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены");
        window.location.href = "http://www.google.com";
    }
}

/*
* Вывод данных сессии в консоль
*
* */
let logger = function () {
    console.log('Начало сессии: ' + window.sessionStorage.getItem("startDate"));
    console.log('Данные клиента: ' + window.sessionStorage.getItem("userAgent"));
    console.log('Возраст пользователя: ' + window.sessionStorage.getItem("userAge"));
}

// Определяем функцию для парсинга пользовательского ввода
const inputParseFunction = function() {
    return document.getElementsByTagName('input')[0].value.toLowerCase();
}

//функция для фильтрации контента (замыкание)
function filterContent() { // Функция не принимает параметров, захватывает переменную из внешней области
    let figures = document.querySelectorAll('.video-container figure');
    figures.forEach(figure => {
        let videoText = figure.querySelector('figcaption').innerText.toLowerCase();
        if (!videoText.includes(inputParseFunction() /* Захват переменной с помощью замыкания */)) {
            figure.style.display = 'none';
        } else {
            figure.style.display = 'inline-block';
        }
    });
}

/*
* Всплывающее окно будет показано по таймауту
* 
* */
setTimeout(() =>
   alert("Нравится LifeSpot? " + '\n' +  "Подпишитесь на наш Instagram @lifespot999!"),
30000);

/*
* Сохранение данных сессии сразу при заходе пользователя на страницу
*
* */
function handleSession(logger, checker) {
    // Проверяем дату захода и проставляем, если новый визит
    if (window.sessionStorage.getItem("startDate") == null) {
        window.sessionStorage.setItem("startDate", new Date().toLocaleString());
    }
  
    // Проверяем userAgent и проставляем, если новый визит
    if (window.sessionStorage.getItem("userAgent") == null) {
        window.sessionStorage.setItem("userAgent", window.navigator.userAgent);
    }
  
    // Проверяем возраст и проставляем, если новый визит
    let isNewVisit = false;
    if (window.sessionStorage.getItem("userAge") == null) {
        let input = prompt("Пожалуйста, введите ваш возраст?");
        window.sessionStorage.setItem("userAge", input);
        isNewVisit = true;
    }
    
    // Вызываем проверку возраста
    checker(isNewVisit);
    
    // Вызываем логгер
    logger();
}

// Вызываем функцию handleSession
handleSession(logger, checker);
 