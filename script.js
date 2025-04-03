// Скрипт для фиксированной навигации при прокрутке
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// Скрипт для мобильного меню
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Плавная прокрутка к разделам
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// Слайдер отзывов
const testimonialSlider = document.querySelector(".testimonial-slider");
const testimonialItems = document.querySelectorAll(".testimonial-item");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentIndex = 0;

function showTestimonial(index) {
  testimonialItems.forEach((item, i) => {
    item.style.transform = `translateX(${100 * (i - index)}%)`;
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % testimonialItems.length;
  showTestimonial(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
  showTestimonial(currentIndex);
});

// Автоматическое переключение отзывов
setInterval(() => {
  currentIndex = (currentIndex + 1) % testimonialItems.length;
  showTestimonial(currentIndex);
}, 5000);

// Инициализация слайдера
showTestimonial(currentIndex);

// Анимация элементов при прокрутке
const animateOnScroll = function () {
  const elements = document.querySelectorAll(
    ".service-card, .team-member, .gallery-item, .about-content, .contact-form, .contact-info"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (elementPosition < screenPosition) {
      element.classList.add("animate");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);

// Форма обратной связи
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Здесь будет логика отправки формы на сервер
  // Можно использовать fetch API или другие методы

  // Имитация отправки
  const formElements = contactForm.elements;
  let isValid = true;

  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].hasAttribute("required") && !formElements[i].value) {
      formElements[i].classList.add("error");
      isValid = false;
    } else {
      formElements[i].classList.remove("error");
    }
  }

  if (isValid) {
    // Показываем уведомление об успешной отправке
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent =
      "Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.";

    contactForm.appendChild(successMessage);
    contactForm.reset();

    // Удаляем уведомление через 5 секунд
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }
});

// Анимация чисел в блоке "О нас"
function animateNumbers() {
  const stats = document.querySelectorAll(".stat-item h3");

  stats.forEach((stat) => {
    const target = parseInt(stat.textContent);
    let count = 0;
    const duration = 2000; // 2 секунды
    const increment = target / (duration / 16); // 60 fps

    function updateCount() {
      if (count < target) {
        count += increment;
        stat.textContent =
          Math.ceil(count) + (stat.textContent.includes("+") ? "+" : "");
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target + (stat.textContent.includes("+") ? "+" : "");
      }
    }

    updateCount();
  });
}

// Запускаем анимацию при прокрутке до блока "О нас"
const aboutStats = document.querySelector(".about-stats");

if (aboutStats) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(aboutStats);
}

// Добавьте этот скрипт в конец вашего JS файла
document.addEventListener("DOMContentLoaded", function () {
  const aboutImage = document.querySelector(".about-image img");
  const aboutSection = document.querySelector(".about");

  window.addEventListener("scroll", function () {
    const rect = aboutSection.getBoundingClientRect();
    const scrollPercentage =
      1 - rect.bottom / (rect.height + window.innerHeight);

    if (scrollPercentage >= 0 && scrollPercentage <= 1) {
      aboutImage.style.transform = `translateY(-${scrollPercentage * 50}%)`;
    }
  });
});
