'use strict'; // открытие/закрытие главной формы заявок 

var formNavBtnElement = document.querySelector('.main-nav__contact');
var formContactElement = document.querySelector('.form--contact');
var formContactCloseElement = formContactElement.querySelector('.form__close');
var popupContactFormElement = formContactElement.querySelector('.form__wrap');
var contactSubmitElement = formContactElement.querySelector('.form__submit');
contactSubmitElement.addEventListener('click', function (evt) {
  evt.preventDefault();
});

var onClickFormContact = function onClickFormContact() {
  movePopup(popupContactFormElement, formContactElement, formContactElement, 'form--open', 'form--close');
};

formContactCloseElement.addEventListener('click', onClickFormContact);
formNavBtnElement.addEventListener('click', onClickFormContact); // открытие/закрытие формы на просмотр видео

var formVideoElement = document.querySelector('.form--video');
var formVideoCloseElement = formVideoElement.querySelector('.form__close');
var popupVideoFormElement = formVideoElement.querySelector('.form__wrap');
var videoSubmitElement = formVideoElement.querySelector('.form__submit');

var onClickFormVideo = function onClickFormVideo() {
  movePopup(popupVideoFormElement, formVideoElement, formVideoElement, 'form--open', 'form--close');
};

formVideoCloseElement.addEventListener('click', onClickFormVideo); // видео попап и его привязка к кнопкам

var videoCloseElement = document.querySelector('.popup-video__close');
var videoNavOpenElement = document.querySelector('.popup-video');
var mainVideoElement = document.querySelector('.popup-video');
var popupVideoElement = document.querySelector('.popup-video__wrap');

var onClickNavVideo = function onClickNavVideo() {
  movePopup(popupVideoElement, mainVideoElement, mainVideoElement, 'popup-video--open', 'popup-video--close');
};

videoNavOpenElement.addEventListener('click', onClickNavVideo);
videoCloseElement.addEventListener('click', onClickNavVideo);
videoSubmitElement.addEventListener('click', function (evt) {
  evt.preventDefault();
  onClickFormVideo();
  onClickNavVideo();
});