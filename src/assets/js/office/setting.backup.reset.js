$(document).ready(function () {
  unsavedManager(true, ['#content-body input'], '');
  footerControl();
  $('#store').click(function () {
    $('footer').slideDown();
  });
  $('.carousel').carousel({
    interval: false
  });
  $('#next-page').click(function () {
    var percent = 0;
    setInterval(function () {
        percent < 100 ? percent++ : '';
        $('.progress-bar').css('width', percent + '%');
        $('.progress-bar-percent').text(percent + '% complete');
    }, 50);
  });
  $('.footer-save').click(function() {
    $('.progress-bar').css('width', '0%');
    $('.progress-bar-percent').text('0% complete');
    $('#import-modal-carousel').find('.carousel-item').eq(1).removeClass('active');
    $('#import-modal-carousel').find('.carousel-item').eq(0).addClass('active');
  });
});