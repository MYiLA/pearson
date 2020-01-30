'use strict';

const tabletWidth = 900;

// URL запросы для смены радиальных меню лендингов

const getUrlParams = search => {
  const params = {};
  search.substr(1).split("&").forEach(part => {
    const [key, value] = part.split("=");
    params[key] = decodeURIComponent(value);
  });
  return params;
};

let requestUrl = getUrlParams(window.location.search).wheel || 'superieur';

// переключение вкладок радиального меню

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

  let closeMenu = function () {
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

  const closeMenu = function () {
    etrangereWheelElement.classList.add('active');
    superieurWheelElement.classList.remove('active');
  }

  etrangereWheelElement.classList.remove('dissolve-hidden');
  superieurWheelElement.classList.add('dissolve-hidden');

  superieurWheelElement.classList.remove('dissolve-show');
  etrangereWheelElement.classList.add('dissolve-show');
  setTimeout(closeMenu, 600);
}

const openBookmark = () => {
  if (requestUrl === "superieur") {
    activateSuperieur()
  }

  if (requestUrl === "etrangere") {
    activateEtrangere()
  } else {
    $('.main-nav__bookmark-item--superieur main-nav__bookmark').trigger('click');
  }
}

openBookmark();

// колесо ///

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

// привязка кнопок к формам

const formLandingElement = document.querySelector('.landing-promo__btn--video');
const provokeElement = document.querySelector('.provoke__link--form');
const promoBtnElement = document.querySelector('.landing-promo__btn--form-2');

const videoProvokeElement = document.querySelector('.provoke__link--video');

formLandingElement.addEventListener('click', onClickFormVideo);
videoProvokeElement.addEventListener('click', onClickFormVideo);


provokeElement.addEventListener('click', onClickFormContact);
promoBtnElement.addEventListener('click', onClickFormContact);

// динамическая смена подписей к слайдеру

const promoSlides = document.querySelectorAll('.promo-slider__item');
const promoSliderCaptions = document.querySelectorAll('.promo-slider__desc-item');

const showSlidesCaption = function () {
  for (let i = 0; i < promoSlides.length; i++) {
    if (promoSlides[i].classList.contains('glide__slide--active')) {
      promoSliderCaptions.forEach(element => element.classList.remove('active'));
      promoSliderCaptions[i].classList.add('active');
      return
    }
  };
}

let timerId = setInterval(() => showSlidesCaption(), 1000);
