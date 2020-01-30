'use strict';

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