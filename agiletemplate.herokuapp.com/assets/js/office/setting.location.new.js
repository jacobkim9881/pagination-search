$(document).ready(function () {
  $('.select2').select2();
  $('footer').removeClass('d-none');
  $('footer').hide();
  enterInfo('empty');

  $('#content-body input').keydown(function () {
    $('footer .save').removeAttr('disabled');
    $('footer').slideDown();
  });

  $('#content-body select').change(function () {
    $('footer .save').removeAttr('disabled');
    $('footer').slideDown();
  });

  $('#is-sub-location').change(function () {
    if ($(this).prop('checked')) {
      $('#content-body .card').hide();
      $('.is-sub-location').show();
      isSubLocation = 1;
      $('.sub-location-form').removeClass('d-none');
    } else {
      isSubLocation = 0;
      $('#content-body .card').show();
      $('.sub-location-form').addClass('d-none');
    }
    $('.contact-email').toggleClass("d-none");
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

  $('footer .cancel').click(function () {
    $('#leave-modal').modal('show');
  });

  $('#leave-modal .continue').click(function () {
    $('footer .save').attr('disabled', true);
    $('#ghost .all-link')[0].click();
  });
    
  var location_name = 'West Side Location';
  $('footer .save').click(function () {
    if (isSubLocation)
      $('#ghost .success-title-message').text('Sub location added successfully');
    else
      $('#ghost .success-title-message').text('Location added successfully');
    $(this).attr('disabled', true);
    notification($('#ghost .success-title-message').text());
    $('#ghost .all-link')[0].click();
  });


  $('.main-location-name').click(function () {
    $('footer').slideDown();
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