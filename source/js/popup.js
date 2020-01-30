'use strict';
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
