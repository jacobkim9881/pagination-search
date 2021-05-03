$(document).ready(function () {
  var location_name = $('#ghost .title-item-name').text() == '' ? 'West Side Location' : $('#ghost .title-item-name').text();
  if(location_name.indexOf("sub-row") >= 0) {
    location_name = location_name.substr(7);
    $('#title').text('Edit ' + location_name);
    $('#is-sub-location').click();
    $('#is-sub-location').attr("disabled", true);
  }
  else {
    $('#title').text('Edit ' + location_name);
    $('#is-sub-location').hide();
  }
  $('#content').off('change', '#is-sub-location');
  $('#content').on('change', '#is-sub-location', function(ev) {
    if ($(this).prop('checked')) {
      $('#content-body .card').hide();
      $('.is-sub-location').show();
      $('.sub-location-form').removeClass('d-none');
    } else {
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
  
  // $('.top-title').text(location_name);
  function enterInfo(flag) {
    Object.keys(infoArr).forEach(function (item) {
      $('#' + item).val(infoArr[item][flag]);
    })
  }

  $('footer').removeClass('d-none');
  // $('footer').hide();
  $('footer').slideDown();

  $('#content-body input').keydown(function () {
    $('footer .save').removeAttr('disabled');
    $('footer').slideDown();
  });

  $('#content-body select').change(function () {
    $('footer .save').removeAttr('disabled');
    $('footer').slideDown();
  });

  $('#prefix').keyup(function () {
    $('.prefix-clone').text($(this).val());
  });

  $('#suffix').keyup(function () {
    $('.suffix-clone').text($(this).val());
  });

  $('footer .cancel').click(function () {
    if(!$('footer .save').prop('disabled'))
      $('#leave-modal').modal('show');
    else
      $('#ghost .all-link')[0].click();
  });

  $('footer .delete').click(function () {
    var ldata = location_name.split(' ');
    var rdata = ldata[0] + ' ' + ldata[1] + ' Store ' + ldata[2];
    $('.delete-location-name').text(rdata);
    $('#delete-location-modal').modal('show');
  });

  $('#leave-modal .continue').click(function () {
    $('footer .save').attr('disabled', true);
    $('#ghost .all-link')[0].click();
  });

  $('footer .save').click(function () {
    $('#ghost .success-title-message').text(location_name + ' updated successfully');
    $(this).attr('disabled', true);
    notification($('#ghost .success-title-message').text());
    $('#ghost .all-link')[0].click();
  });

  $('#sub-location-group .delete').click(function () {
    $('#delete-sub-location-modal').modal('show');
  });

  $('#delete-sub-location-modal .continue').click(function () {
    notification('<b>Store Room A</b> has been deleted successfully');
  })

  $('#delete-location-modal .continue').click(function () {
    notification(location_name + " has been deleted successfully");
    $('footer .save').attr('disabled', true);
    $('#ghost .all-link')[0].click();
  })

  $('.sub-location').click(function () {
    $('#ghost .title-item-name').text("sub-row" + $(this).text());
    $('#ghost .edit-link')[0].click();
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
  unsavedManager(true, ['#content-body input']);
  $('#vat-id-number').mask('999999-999');
  $('.mobile').mask('99 999 999');
});