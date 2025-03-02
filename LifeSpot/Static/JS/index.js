/*
* Сессия теперь создается в общей области видимости.
* Будет "захватываться" функциями
* 
* */ 
let session = new Map();

/*
* Сохранение данных сессии сразу при заходе пользователя на страницу
* 
* */
function handleSession() {
    // Сохраним время начала сессии
    session.set("startDate", new Date().toLocaleString())
    // Сохраним UserAgent
    session.set("userAgent", window.navigator.userAgent)
}

/*
* Проверка возраста пользователя
* 
* */
function checkAge() {
    session.set("age", prompt("Пожалуйста, введите ваш возраст?"))
    
    if(session.get("age") >= 18) {
        alert("Приветствуем на LifeSpot! " + '\n' +  "Текущее время: " + new Date().toLocaleString());
    }
    else {
        alert("Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены");
        window.location.href = "http://www.google.com"
    }
}

/*
* Вывод данных сессии в консоль
* 
* */
let sessionLog = function logSession() {
    for (let result of session) {
        console.log(result)
    }
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
   alert("Нравится LifeSpot? " + '\n' +  "Подпишитесь на наш Instagram @lifespot999!" ),
30000);
