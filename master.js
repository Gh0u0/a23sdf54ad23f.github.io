document.addEventListener("DOMContentLoaded", function () {
  // Массив с URL изображений для слайдера
  const slideImages = [
    "img/master1.jpg",
    "img/master2.jpg",
    "img/master3.jpg",
    "img/master4.jpg",
  ];

  const sliderMain = document.querySelector(".slider-main");
  const dots = document.querySelectorAll(".dot");
  const thumbs = document.querySelectorAll(".slider-thumbs img");
  const prevButton = document.querySelector(".slider-arrow.prev");
  const nextButton = document.querySelector(".slider-arrow.next");

  let currentSlide = 0;

  // Функция для обновления слайдера
  function updateSlider() {
    // Обновляем основное изображение
    sliderMain.innerHTML = `<img src="${
      slideImages[currentSlide]
    }" alt="Мастер фото ${currentSlide + 1}" class="active-slide">`;

    // Обновляем активную точку
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");

    // Обновляем активную миниатюру
    thumbs.forEach((thumb) => thumb.classList.remove("active-thumb"));
    thumbs[currentSlide].classList.add("active-thumb");
  }

  // Обработчики для кнопок
  prevButton.addEventListener("click", function () {
    currentSlide = (currentSlide - 1 + slideImages.length) % slideImages.length;
    updateSlider();
  });

  nextButton.addEventListener("click", function () {
    currentSlide = (currentSlide + 1) % slideImages.length;
    updateSlider();
  });

  // Обработчики для точек
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentSlide = index;
      updateSlider();
    });
  });

  // Обработчики для миниатюр
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", function () {
      currentSlide = index;
      updateSlider();
    });
  });

  // Инициализация слайдера
  updateSlider();
});
