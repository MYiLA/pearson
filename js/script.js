'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var tabletWidth = 900; // URL запросы для смены радиальных меню лендингов

var getUrlParams = function getUrlParams(search) {
  var params = {};
  search.substr(1).split("&").forEach(function (part) {
    var _part$split = part.split("="),
        _part$split2 = _slicedToArray(_part$split, 2),
        key = _part$split2[0],
        value = _part$split2[1];

    params[key] = decodeURIComponent(value);
  });
  return params;
};

var requestUrl = getUrlParams(window.location.search).wheel || 'superieur'; // переключение вкладок радиального меню

var superieurBookmarkElement = document.querySelector('.main-nav__bookmark-item--superieur');
var superieurWheelElement = document.querySelector('.wheel-promo--superieur');
var etrangereBookmarkElement = document.querySelector('.main-nav__bookmark-item--etrangere');
var etrangereWheelElement = document.querySelector('.wheel-promo--etrangere');

var toggleElements = function toggleElements(openElement, closeElement) {
  openElement.classList.add('active');
  closeElement.classList.remove('active');
};

var activateSuperieur = function activateSuperieur() {
  superieurBookmarkElement.classList.add('active');
  etrangereBookmarkElement.classList.remove('active');

  var closeMenu = function closeMenu() {
    superieurWheelElement.classList.add('active');
    etrangereWheelElement.classList.remove('active');
  };

  superieurWheelElement.classList.remove('dissolve-hidden');
  etrangereWheelElement.classList.add('dissolve-hidden');
  etrangereWheelElement.classList.remove('dissolve-show');
  superieurWheelElement.classList.add('dissolve-show');
  setTimeout(closeMenu, 600);
};

var activateEtrangere = function activateEtrangere() {
  etrangereBookmarkElement.classList.add('active');
  superieurBookmarkElement.classList.remove('active');

  var closeMenu = function closeMenu() {
    etrangereWheelElement.classList.add('active');
    superieurWheelElement.classList.remove('active');
  };

  etrangereWheelElement.classList.remove('dissolve-hidden');
  superieurWheelElement.classList.add('dissolve-hidden');
  superieurWheelElement.classList.remove('dissolve-show');
  etrangereWheelElement.classList.add('dissolve-show');
  setTimeout(closeMenu, 600);
};

var openBookmark = function openBookmark() {
  if (requestUrl === "superieur") {
    activateSuperieur();
  }

  if (requestUrl === "etrangere") {
    activateEtrangere();
  } else {
    $('.main-nav__bookmark-item--superieur main-nav__bookmark').trigger('click');
  }
};

openBookmark(); // колесо ///

var menus = _toConsumableArray(document.querySelectorAll('.wheel-promo'));

menus.map(function (menu) {
  var items = menu.querySelectorAll('.wheel-promo__item');
  var length = items.length;
  var arc = 2 * Math.PI * (1 / length);
  var radius = 50;

  var addCoordinateItems = function addCoordinateItems(rad) {
    for (var i = 0; i < length; i++) {
      var angle = i * arc - 14.15;
      var x = rad * Math.cos(angle);
      var y = rad * Math.sin(angle);
      items[i].style.left = 50 + x + '%';
      items[i].style.top = 50 + y + '%';
    }
  };

  var onMenuCircularCreated = function onMenuCircularCreated() {
    if (window.innerWidth >= tabletWidth) {
      radius = 50;
      return addCoordinateItems(radius);
    } else {
      for (var i = 0; i < length; i++) {
        items[i].style.left = 0;
        items[i].style.top = 0;
      }
    }
  };

  window.addEventListener('resize', onMenuCircularCreated);

  if (window.innerWidth >= tabletWidth) {
    onMenuCircularCreated();
  }
}); // привязка кнопок к формам

var formLandingElement = document.querySelector('.landing-promo__btn--video');
var provokeElement = document.querySelector('.provoke__link--form');
var promoBtnElement = document.querySelector('.landing-promo__btn--form-2');
var videoProvokeElement = document.querySelector('.provoke__link--video');
formLandingElement.addEventListener('click', onClickFormVideo);
videoProvokeElement.addEventListener('click', onClickFormVideo);
provokeElement.addEventListener('click', onClickFormContact);
promoBtnElement.addEventListener('click', onClickFormContact); // динамическая смена подписей к слайдеру

var promoSlides = document.querySelectorAll('.promo-slider__item');
var promoSliderCaptions = document.querySelectorAll('.promo-slider__desc-item');

var showSlidesCaption = function showSlidesCaption() {
  for (var i = 0; i < promoSlides.length; i++) {
    if (promoSlides[i].classList.contains('glide__slide--active')) {
      promoSliderCaptions.forEach(function (element) {
        return element.classList.remove('active');
      });
      promoSliderCaptions[i].classList.add('active');
      return;
    }
  }

  ;
};

var timerId = setInterval(function () {
  return showSlidesCaption();
}, 1000);