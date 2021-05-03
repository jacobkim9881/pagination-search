(function ($) {
  $('#filter').keyup(function () {
    console.log('a');
      var rex = new RegExp($(this).val(), 'i');
      $('.searchable tr').hide();
      $('.searchable tr').filter(function () {
          return rex.test($(this).text());
      }).show();
  })
}(jQuery));
$('.input-daterange input').each(function() {
  $(this).datepicker('clearDates');
});