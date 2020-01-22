'use strict';
const tabletWidth = 900;

// слайдеры//

// для реализации показа активных подписей (.promo-slider__desc-item - подпись): номер слайда (promo-slider__item - слайд) = номер показываемой подписи. на активном слайде класс glide__slide--active
// проверять текущую активную подпись каждые 1 секунду

// колесо///

const menus = [...document.querySelectorAll('.wheel-promo')];
menus.map((menu) => {
  const items = menu.querySelectorAll('.wheel-promo__item');
  const length = items.length;
  const arc = 2 * Math.PI * (1 / length);
  let radius = 50;

  let addCoordinateItems = function (rad) {
    for (let i = 0; i < length; i++) {
      const angle = i * arc - 14.15;
      const x = rad * Math.cos(angle);
      const y = rad * Math.sin(angle);

      items[i].style.left = 50 + x + '%';
      items[i].style.top = 50 + y + '%';
    }
  }

  let onMenuCircularCreated = function () {
    if (window.innerWidth >= tabletWidth) {
      radius = 50;
      return addCoordinateItems(radius);
    } else {
      for (let i = 0; i < length; i++) {
        items[i].style.left = 0;
        items[i].style.top = 0;
      }
    }
  }

  window.addEventListener('resize', onMenuCircularCreated);
  if (window.innerWidth >= tabletWidth) {
    onMenuCircularCreated();
  }
});


// липкая шапка

$(window).scroll(function () {
  if ($(this).scrollTop() > 1) {
    $('.header__main-nav').addClass('fixed');
    $('.header__main-nav').removeClass('static');

  } else {
    $('.header__main-nav').addClass('static');
    $('.header__main-nav').removeClass('fixed');
  }
});

// попап-меню

const menuOpenElement = document.querySelector('.main-nav__burger');
const menuCloseElement = document.querySelector('.main-nav__close');
const mainNavElement = document.querySelector('.main-nav');
const wrapNavElement = document.querySelector('.main-nav__wrap-popup');
const popupNavElement = document.querySelector('.main-nav__main-nav');

let openMainMenu = function () {
  mainNavElement.classList.remove('main-nav--close');
  mainNavElement.classList.add('main-nav--open');

  wrapNavElement.classList.remove('dissolve-hidden');
  popupNavElement.classList.remove('roll-right-hidden');

  wrapNavElement.classList.add('dissolve-show');
  popupNavElement.classList.add('roll-right-show')
};

let closeMainMenu = function () {
  let closeMenu = function () {
    mainNavElement.classList.remove('main-nav--open');
    mainNavElement.classList.add('main-nav--close');
    wrapNavElement.classList.remove('dissolve-hidden');
    popupNavElement.classList.remove('roll-right-hidden');
  }

  wrapNavElement.classList.remove('dissolve-show');
  popupNavElement.classList.remove('roll-right-show');

  wrapNavElement.classList.add('dissolve-hidden');
  popupNavElement.classList.add('roll-right-hidden');

  setTimeout(closeMenu, 800);
};

let moveMenu = function () {
  if (mainNavElement.classList.contains('main-nav--close')) {
    openMainMenu()
  } else {
    closeMainMenu()
  };
};

menuOpenElement.addEventListener('click', moveMenu);
menuCloseElement.addEventListener('click', moveMenu);


// переключение вкладок меню

const superieurBookmarkElement = document.querySelector('.main-nav__bookmark-item--superieur');
const superieurWheelElement = document.querySelector('.wheel-promo--superieur');

const etrangereBookmarkElement = document.querySelector('.main-nav__bookmark-item--etrangere');
const etrangereWheelElement = document.querySelector('.wheel-promo--etrangere');

let toggleElements = function (openElement, closeElement) {
  openElement.classList.add('active');
  closeElement.classList.remove('active');
}

let activateSuperieur = function () {
  superieurBookmarkElement.classList.add('active');
  etrangereBookmarkElement.classList.remove('active');
  
  let closeMenu = function() {
    superieurWheelElement.classList.add('active');
    etrangereWheelElement.classList.remove('active');
  }
   superieurWheelElement.classList.remove('dissolve-hidden');
   etrangereWheelElement.classList.add('dissolve-hidden');

   etrangereWheelElement.classList.remove('dissolve-show');
  superieurWheelElement.classList.add('dissolve-show');

  setTimeout(closeMenu, 600);
}

let activateEtrangere = function () {
  etrangereBookmarkElement.classList.add('active');
  superieurBookmarkElement.classList.remove('active');
  
  let closeMenu = function() {
    etrangereWheelElement.classList.add('active');
    superieurWheelElement.classList.remove('active');
  }
  etrangereWheelElement.classList.remove('dissolve-hidden');
  superieurWheelElement.classList.add('dissolve-hidden');

  superieurWheelElement.classList.remove('dissolve-show');
   etrangereWheelElement.classList.add('dissolve-show');
  setTimeout(closeMenu, 600);
}

superieurBookmarkElement.addEventListener('click', activateSuperieur);
etrangereBookmarkElement.addEventListener('click', activateEtrangere);

// попап форма


// валидация формы


// попап видео