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

// попапы 

const openAnimation = function (popup, wrap) {
  wrap.classList.remove('dissolve-hidden');
  popup.classList.remove('roll-right-hidden');

  wrap.classList.add('dissolve-show');
  popup.classList.add('roll-right-show');
};

const closeAnimation = function (popup, wrap) {
  wrap.classList.remove('dissolve-show');
  popup.classList.remove('roll-right-show');

  wrap.classList.add('dissolve-hidden');
  popup.classList.add('roll-right-hidden');
}

const movePopup = function (popup, wrap, mainWrap, classOpen, classClose) {
  if (mainWrap.classList.contains(classOpen)) {
    const closePopup = function () {
      mainWrap.classList.remove(classOpen);
      mainWrap.classList.add(classClose);
      wrap.classList.remove('dissolve-hidden');
      popup.classList.remove('roll-right-hidden');
    };
    setTimeout(closePopup, 800);
    closeAnimation(popup, wrap)
  } else {
    mainWrap.classList.add(classOpen);
    mainWrap.classList.remove(classClose);
    wrap.classList.remove('dissolve-show');
    popup.classList.remove('roll-right-show');
    openAnimation(popup, wrap);
  }
}

const menuOpenElement = document.querySelector('.main-nav__burger');
const menuCloseElement = document.querySelector('.main-nav__close');

const mainNavElement = document.querySelector('.main-nav');
const wrapNavElement = document.querySelector('.main-nav__wrap-popup');
const popupNavElement = document.querySelector('.main-nav__main-nav');

let onClickMoveMenu = function () {
  movePopup(popupNavElement, wrapNavElement, mainNavElement, 'main-nav--open', 'main-nav--close')
}

menuOpenElement.addEventListener('click', onClickMoveMenu);
menuCloseElement.addEventListener('click', onClickMoveMenu);

// открытие/закрытие главной формы заявок 

const formNavBtnElement = document.querySelector('.main-nav__contact');
const formContactElement = document.querySelector('.form--contact');
const formContactCloseElement = formContactElement.querySelector('.form__close');
const popupContactFormElement = formContactElement.querySelector('.form__wrap');
const contactSubmitElement = formContactElement.querySelector('.form__submit');

contactSubmitElement.addEventListener('click', function (evt) {
  evt.preventDefault();
});

let onClickFormContact = function () {
  movePopup(popupContactFormElement, formContactElement, formContactElement, 'form--open', 'form--close')
}

formContactCloseElement.addEventListener('click', onClickFormContact);
formNavBtnElement.addEventListener('click', onClickFormContact);

// открытие/закрытие формы на просмотр видео

const formVideoElement = document.querySelector('.form--video');
const formVideoCloseElement = formVideoElement.querySelector('.form__close');
const popupVideoFormElement = formVideoElement.querySelector('.form__wrap');
const videoSubmitElement = formVideoElement.querySelector('.form__submit');

let onClickFormVideo = function () {
  movePopup(popupVideoFormElement, formVideoElement, formVideoElement, 'form--open', 'form--close')
}

formVideoCloseElement.addEventListener('click', onClickFormVideo);

// привязка кнопок к формам

const formLandingElement = document.querySelector('.landing-promo__btn--video');
const provokeElement = document.querySelector('.provoke__link--form');
const promoBtnElement = document.querySelector('.landing-promo__btn--form-2');

const videoProvokeElement = document.querySelector('.provoke__link--video');

formLandingElement.addEventListener('click', onClickFormVideo);
videoProvokeElement.addEventListener('click', onClickFormVideo);


provokeElement.addEventListener('click', onClickFormContact);
promoBtnElement.addEventListener('click', onClickFormContact);

// видео попап и его привязка к кнопкам

const videoCloseElement = document.querySelector('.popup-video__close');
const videoNavOpenElement = document.querySelector('.popup-video');
const mainVideoElement = document.querySelector('.popup-video');
const popupVideoElement = document.querySelector('.popup-video__wrap');


let onClickNavVideo = function () {
  movePopup(popupVideoElement, mainVideoElement, mainVideoElement, 'popup-video--open', 'popup-video--close')
}

videoNavOpenElement.addEventListener('click', onClickNavVideo);
videoCloseElement.addEventListener('click', onClickNavVideo);
videoSubmitElement.addEventListener('click', function (evt) {
  evt.preventDefault();
  onClickFormVideo();
  onClickNavVideo();
});

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

// Плавный скролл ссылок-якорей

$(document).ready(function () {
  $('a').on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: ($(hash).offset().top) - 150
      }, 800);
    }
  });
});