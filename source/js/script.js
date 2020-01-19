'use strict';
const tabletWidth = 900;

// слайдер//

import Glide from '@glidejs/glide'

new Glide('.glide').mount()

// колесо///

var menus = [...document.querySelectorAll('.wheel-promo')];
menus.map((menu) => {
  let items = menu.querySelectorAll('.wheel-promo__item');
  // let tooltips = links.querySelector('.wheel-promo__tooltip');
  // let active = false;
  const length = items.length;
  const arc = 2 * Math.PI * (1 / length);
  let radius = 50;

  var addCoordinateItems = function (rad) {
    for (let i = 0; i < length; i++) {
      const angle = i * arc - 14.15;
      const x = rad * Math.cos(angle);
      const y = rad * Math.sin(angle);

      items[i].style.left = 50 + x + '%';
      items[i].style.top = 50 + y + '%';
    }
  }

  var onMenuCircularCreated = function () {
    // if (window.innerWidth >= 1020) {
    //   radius = 60;
    //   return addCoordinateItems(radius);
    // }
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