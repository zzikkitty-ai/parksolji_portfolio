$(function () {
  $('.top-btn a').on('click', function (e) {
    e.preventDefault();

    $('html, body').stop().animate({
      scrollTop: 0
    }, 1200, 'swing');
  });
});
