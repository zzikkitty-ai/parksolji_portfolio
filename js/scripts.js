/*
Theme Name: IAMX
Author: Trendy Theme
Author URL: trendytheme.net
*/

/*
    = Preloader
    = Animated scrolling / Scroll Up
    = Full Screen Slider
    = Sticky Menu
    = Back To Top
    = Countup
    = Progress Bar
    = More skill
    = Shuffle
    = Magnific Popup
    = Vidio auto play
    = Fit Vids
    

*/

jQuery(function ($) {

  'use strict';

  /* ---------------------------------------------- /*
   * Preloader
  /* ---------------------------------------------- */

  $(window).ready(function () {
    $('#tt-preloader').delay(500).fadeOut(900);
  });



  // -------------------------------------------------------------
  // Full Screen Slider
  // -------------------------------------------------------------
  (function () {
    $(".tt-fullHeight").height($(window).height());

    $(window).resize(function () {
      $(".tt-fullHeight").height($(window).height());
    });

  }());


  // -------------------------------------------------------------
  // Sticky Menu
  // -------------------------------------------------------------

  // (function () {
  //     $('.header').sticky({
  //         topSpacing: 0
  //     });

  //     $('body').scrollspy({
  //         target: '.navbar-custom',
  //         offset: 70
  //     })
  // }());





  // -------------------------------------------------------------
  // Back To Top
  // -------------------------------------------------------------

  // (function () {
  //     $(window).scroll(function() {
  //         if ($(this).scrollTop() > 100) {
  //             $('.scroll-up').fadeIn();
  //         } else {
  //             $('.scroll-up').fadeOut();
  //         }
  //     });
  // }());

  (function () {

    const aboutTop = $('#about').offset().top;

    $(window).scroll(function () {

      if (introPassed && $(window).scrollTop() >= aboutTop - 100) {
        $('.scroll-up').fadeIn();
      } else {
        $('.scroll-up').fadeOut();
      }

    });

  }());




  // -------------------------------------------------------------
  // STELLAR FOR BACKGROUND SCROLLING
  // -------------------------------------------------------------

  $(window).load(function () {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    } else {
      $.stellar({
        horizontalScrolling: false,
        responsive: true
      });
    }

  });


  // -------------------------------------------------------------
  // WOW JS
  // -------------------------------------------------------------

  (function () {

    new WOW({

      mobile: false

    }).init();

  }());

});


// 마우스 휠 + about 텍스트 채우기
const home = document.querySelector('#home');
const header = document.querySelector('.header');
const about = document.querySelector('#about');
const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const cursor = document.querySelector('.cursor-light');

let isMoving = false;
let introPassed = false;

function startFillText() {
  line1.classList.add('active');

  setTimeout(function () {
    line2.classList.add('active');
  }, 3300);
}

function resetFillText() {
  line1.classList.remove('active');
  line2.classList.remove('active');
}

window.addEventListener('wheel', function (e) {
  if (isMoving) {
    e.preventDefault();
    return;
  }

  if (e.deltaY > 0 && !introPassed) {
    e.preventDefault();

    isMoving = true;
    introPassed = true;

    resetFillText();

    home.classList.add('home-hide');
    header.classList.add('show');

    document.querySelectorAll('.navbar-nav li').forEach(function (li) {
      li.classList.remove('active');
    });

    document.querySelector('.navbar-nav a[href="#about"]').parentElement.classList.add('active');

    setTimeout(function () {
      window.scrollTo({
        top: about.offsetTop,
        behavior: 'smooth'
      });

      setTimeout(function () {
        startFillText();
        isMoving = false;
      }, 1000);
    }, 300);

    return;
  }

  if (e.deltaY < 0 && introPassed && window.scrollY <= about.offsetTop + 30) {
    e.preventDefault();

    isMoving = true;
    introPassed = false;

    resetFillText();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    home.classList.remove('home-hide');
    header.classList.remove('show');
    $('.scroll-up').fadeOut();

    document.querySelectorAll('.navbar-nav li').forEach(function (li) {
      li.classList.remove('active');
    });

    setTimeout(function () {
      isMoving = false;
    }, 900);

    return;
  }
}, { passive: false });


$(window).on('scroll', function () {
  if ($(window).scrollTop() > window.innerHeight - 100) {
    document.body.classList.add('cursor-active');

    if (cursor) {
      cursor.style.opacity = '1';
    }
  } else {
    document.body.classList.remove('cursor-active');

    if (cursor) {
      cursor.style.opacity = '0';
    }
  }
});


const sectionIds = ['about', 'works', 'resume', 'strengths'];

function setActiveNav(id) {
  document.querySelectorAll('.navbar-nav li').forEach(function (li) {
    li.classList.remove('active');
  });

  const targetNav = document.querySelector('.navbar-nav a[href="#' + id + '"]');

  if (targetNav) {
    targetNav.parentElement.classList.add('active');
  }
}

document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const id = this.getAttribute('href').replace('#', '');
    const target = document.getElementById(id);

    if (!target) return;

    introPassed = true;
    home.classList.add('home-hide');
    header.classList.add('show');

    setActiveNav(id);

    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth'
    });

    if (id === 'about') {
      resetFillText();

      setTimeout(function () {
        startFillText();
      }, 700);
    }
  });
});

window.addEventListener('scroll', function () {
  if (!introPassed) return;

  let currentId = 'about';

  sectionIds.forEach(function (id) {
    const section = document.getElementById(id);

    if (section && window.scrollY >= section.offsetTop - 160) {
      currentId = id;
    }
  });

  setActiveNav(currentId);
});

// top버튼 스크롤 감겨 올라가기
$('.top-btn').on('click', function (e) {
  e.preventDefault();

  $('html, body').stop().animate({
    scrollTop: $('#about').offset().top
  }, 1200, 'swing');
});

$(window).on('load', function () {
  const hash = window.location.hash;

  if (hash === '#works') {
    introPassed = true;

    $('#tt-preloader').hide();
    $('#pre-status').hide();

    home.classList.add('home-hide');
    header.classList.add('show');

    setActiveNav('works');

    setTimeout(function () {
      window.scrollTo({
        top: document.querySelector('#works').offsetTop,
        behavior: 'auto'
      });
    }, 50);
  }
});

const resumeSection = document.querySelector('#resume');
const resumeLists = document.querySelectorAll('.resume-list');

const strengthsSection = document.querySelector('#strengths');
const strengthBars = document.querySelectorAll('#strengths .skill-bar span');
const circleCharts = $('#strengths .chart');

let resumeStarted = false;
let strengthsStarted = false;

/* resume 선 초기화 */
resumeLists.forEach(list => {
  list.classList.remove('active');
});

/* 막대그래프 초기화 */
strengthBars.forEach(bar => {
  bar.dataset.width = bar.getAttribute('style').replace('width:', '').trim();
  bar.style.width = '0';
});

/* 원형그래프 초기화 */
circleCharts.each(function () {
  const $chart = $(this);
  $chart.attr('data-target', $chart.attr('data-percent'));
  $chart.attr('data-percent', 0);
  $chart.find('.percent').text('0');
});

window.addEventListener('scroll', function () {

  const scrollBottom = window.scrollY + window.innerHeight;

  /* Resume 선 */
  if (!resumeStarted && scrollBottom > resumeSection.offsetTop + 250) {
    resumeStarted = true;

    resumeLists.forEach((list, index) => {
      setTimeout(() => {
        list.classList.add('active');
      }, index * 250);
    });
  }

  /* Strengths 그래프 */
  if (!strengthsStarted && scrollBottom > strengthsSection.offsetTop + 250) {
    strengthsStarted = true;

    strengthBars.forEach(bar => {
      bar.style.width = bar.dataset.width;
    });

    circleCharts.each(function () {
      const $chart = $(this);
      const target = Number($chart.attr('data-target'));

      $chart.easyPieChart({
        easing: 'easeOut',
        barColor: '#7b5cff',
        trackColor: '#373836',
        scaleColor: false,
        lineWidth: 7,
        size: 140,
        animate: 2000,
        onStep: function (from, to, percent) {
          this.el.children[0].innerHTML = Math.round(percent);
        }
      });

      setTimeout(() => {
        $chart.data('easyPieChart').update(target);
      }, 100);
    });
  }

});