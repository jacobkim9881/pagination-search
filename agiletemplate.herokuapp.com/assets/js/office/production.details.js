$(document).ready(function() {
  $('.print-label').click(function() {
    $('.title-item-name').text("#PR1002");
    $('.back-url').text("/productions/details");
    $('#ghost .print-link')[0].click();
  });
  $('.duplicate').click(function() {
    $('#ghost .new-link')[0].click();
  });

  $('td[data-toggle="collapse"]').off("click");
  $('td[data-toggle="collapse"]').click(function (ev) {
      var obj = $(this).find('i').eq(0);
      if (obj.hasClass('la-angle-up')) {
          obj.removeClass('la-angle-up');
          obj.addClass('la-angle-down');
      } else {
          obj.addClass('la-angle-up');
          obj.removeClass('la-angle-down');
      }
  });
});