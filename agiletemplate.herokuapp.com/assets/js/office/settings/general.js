$(document).ready(function () {
  $('footer').removeClass('d-none');
  $('footer').hide();
  $('#content input').keydown(function () {
    $('footer').slideDown();
  });

  $('#content select').change(function () {
    $('footer').slideDown();
  });

  $('.select-delivery').on('change', (ev) => {
    if($('.select-currency').val() == "USD") $('.currency-type').text("$");
    else $('.currency-type').text("L£");
    $('.currency-fee-div').toggleClass("d-none");
  });

  $('#prefix').keyup(function () {
    $('.prefix-clone').text($(this).val());
  });

  $('#suffix').keyup(function () {
    $('.suffix-clone').text($(this).val());
  });

  $('#page-leave-modal .leave').click(function () {
    $('footer .save').attr('disabled', true);
    $('#ghost .any-link')[0].click();
  });

  $('footer .cancel').click(function () {
    $('#leave-modal').modal('show');
  });

  $('#leave-modal .continue').click(function() {
    $('input[type="text"]').val('');
    $('input[type="checkbox"]').prop('checked', true);
    $('select').val('0');
    $('#prefix').val('#');
  });

  var alarm;

  $('footer .save').click(function () {
    $('footer').slideUp();
    notification('Changes saved successfully.');
  });

  $('.ui-switch input').change(function () {
    $(this).closest('div').find('.font-weight-bold').toggleClass('text-black');
    $(this).closest('div').find('.description').toggleClass('text-muted');
  });

  $(".number-format").on('keyup', function (e) {
    if(e.keyCode == 65 || e.keyCode == 17) {
      return;
    }
    $(this).val($(this).val().replace(/,/g, ''));
    $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  });
  $('#vat-id-number').mask('999999-999');
  $('.mobile').mask('99 999 999');
});