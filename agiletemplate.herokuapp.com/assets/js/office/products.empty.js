$(document).ready(function () {
  var myInterval;
  var modal_height = 0;
  $('.carousel').carousel({
    interval: false
  });
  $('#import-start').off('click');
  $('#import-start').on('click', function () {
    console.log('restart');
    clearInterval(myInterval);
    $('.progress-bar').width(0);
    $('.carousel-item').removeClass('active');
    $('.carousel-item').eq(0).addClass('active');
    if(modal_height != 0) {
      $('.close-modal').removeClass('mb-3');
      $('.carousel-inner').height(modal_height);
      $('.carousel-item').eq(0).height(modal_height);
    }
  });
  $('.close-modal').off('click');
  $('.close-modal').on('click', function() {
    $('.progress-bar').width(0);
    $('.carousel-item').removeClass('active');
    $('.carousel-item').eq(0).addClass('active');
    $('.close-modal').removeClass('mb-3');
  });
  $('.carousel-control').click(function () {
    if(modal_height == 0) modal_height = $('.carousel-item').eq(0).height();
  });
  $('#import-product-start').click(function () {
      var percent = 0;
      myInterval = setInterval(function () {
          percent < 100 ? percent++ : clearInterval(myInterval);
          $('.progress-bar').css('width', percent + '%');
          $('.progress-bar-percent').text(percent + '% complete');
      }, 50);
  });

  $('#switch').click(function () {
      if ($(this).prop('checked')) {
        $(this).closest('div').find('p').removeClass('text-muted');
        $('.overwrite').text('overwrite any existing products')
      } else {
        $(this).closest('div').find('p').addClass('text-muted');
        $('.overwrite').text(' not overwrite any existing products')
      }
  });
});
