// Функция для инициализации слайдера
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
});

/**
 * Инициализирует слайдер с изображениями
 */
function initSlider() {
    // Получаем элементы слайдера
    const images = document.querySelectorAll('.slider-image');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const fullscreenBtns = document.querySelectorAll('.fullscreen-btn');
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenCloseBtn = document.querySelector('.fullscreen-close');
    const fullscreenPrevBtn = document.querySelector('.fullscreen-prev');
    const fullscreenNextBtn = document.querySelector('.fullscreen-next');
    
    // Текущий индекс активного слайда
    let currentIndex = 0;
    let totalSlides = images.length;
    
    // Показываем первый слайд как активный
    if (images.length > 0) {
        images[0].classList.add('active');
    }
    
    // Переменная для хранения идентификатора таймера автоматического перелистывания
    let autoSlideTimer;
    
    // Функция запуска автоматического перелистывания слайдов
    function startAutoSlide() {
        // Очищаем предыдущий таймер, если он существует
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
        }
        
        // Запускаем новый таймер, переключающий слайды каждые 5 секунд
        autoSlideTimer = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000); // 5000 миллисекунд = 5 секунд
    }
    
    // Функция остановки автоматического перелистывания
    function stopAutoSlide() {
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
    }
    
    // Запускаем автоматическое перелистывание при загрузке
    startAutoSlide();
    
    // Обработчик для кнопки "Предыдущий слайд"
    prevBtn.addEventListener('click', function() {
        goToSlide(currentIndex - 1);
        // Сбрасываем таймер автоматического перелистывания при ручном переключении
        startAutoSlide();
    });
    
    // Обработчик для кнопки "Следующий слайд"
    nextBtn.addEventListener('click', function() {
        goToSlide(currentIndex + 1);
        // Сбрасываем таймер автоматического перелистывания при ручном переключении
        startAutoSlide();
    });
    
    // Обработчики для кнопок полноэкранного режима
    fullscreenBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.stopPropagation();
            const slideIndex = parseInt(this.closest('.slider-image').getAttribute('data-index'));
            openFullscreen(slideIndex);
        });
    });
    
    // Закрытие полноэкранного режима
    fullscreenCloseBtn.addEventListener('click', closeFullscreen);
    
    // Навигация в полноэкранном режиме
    fullscreenPrevBtn.addEventListener('click', function() {
        updateFullscreenImage(currentIndex - 1);
    });
    
    fullscreenNextBtn.addEventListener('click', function() {
        updateFullscreenImage(currentIndex + 1);
    });
    
    // Закрытие полноэкранного режима при нажатии ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && fullscreenContainer.style.display === 'flex') {
            closeFullscreen();
        }
    });
    
    /**
     * Переход к указанному слайду
     * @param {number} index - Индекс слайда
     */
    function goToSlide(index) {
        // Нормализуем индекс (циклически)
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        
        // Убираем активный класс со всех слайдов
        images.forEach(image => {
            image.classList.remove('active');
        });
        
        // Добавляем активный класс нужному слайду
        images[index].classList.add('active');
        
        // Обновляем текущий индекс
        currentIndex = index;
    }
    
    /**
     * Открывает полноэкранный режим с указанным изображением
     * @param {number} index - Индекс изображения
     */
    function openFullscreen(index) {
        // Останавливаем автоматическое переключение при входе в полноэкранный режим
        stopAutoSlide();
        
        currentIndex = index;
        const image = images[index].querySelector('img');
        fullscreenImage.src = image.src;
        fullscreenImage.alt = image.alt;
        fullscreenContainer.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    }
    
    /**
     * Закрывает полноэкранный режим
     */
    function closeFullscreen() {
        fullscreenContainer.style.display = 'none';
        document.body.style.overflow = ''; // Возвращаем прокрутку
        
        // Возобновляем автоматическое переключение при выходе из полноэкранного режима
        startAutoSlide();
    }
    
    /**
     * Обновляет изображение в полноэкранном режиме
     * @param {number} index - Индекс изображения
     */
    function updateFullscreenImage(index) {
        // Нормализуем индекс (циклически)
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        
        // Обновляем изображение
        const image = images[index].querySelector('img');
        fullscreenImage.src = image.src;
        fullscreenImage.alt = image.alt;
        
        // Обновляем текущий индекс
        currentIndex = index;
    }
} 