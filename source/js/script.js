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