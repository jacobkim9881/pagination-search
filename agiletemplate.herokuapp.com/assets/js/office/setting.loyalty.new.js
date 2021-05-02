$(document).ready(function () {
  unsavedManager(true, ['#content-body input', '#content-body select'], '');

  var program_name = "Gold Coins";
  $('footer .save').off('click');
  $('footer .save').click(function () {
    notification(program_name + ' added successfully.');
    $('footer .save').attr('disabled', true);
    $('#ghost .all-link')[0].click();
  });
  $('#program-name').keyup(function () {
    program_name = $('#program-name').val();
  })
  $('.bootstrap-tables').on('all.bs.table', function (e) {
    $(this).removeClass('table-bordered');
  })
  $('.start-date').fdatepicker({
    initialDate: '12-12-2020',
    format: 'M dd, yyyy',
    // keyboardNavigation: false,
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
    //closeIcon: 'X',
    //closeButton: true
    // autoShow: false
  });
  function setTime() {
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', ' Oct', 'Nov', 'Dec'];
    $('.start-date').val(month[today[0] - 1] + ' ' + today[1] + ', ' + today[2]);
    $('#start-time').attr("data-placeholder", hour + ":" + time[1]);
    if (time[0] * 1 > 12) {
      $('#flag').prop('selectedIndex', 1);
    } else {
      $('#flag').prop('selectedIndex', 0);
    }
  }
  var today = new Date().toLocaleDateString().split('/');
  var time = new Date().toLocaleTimeString().split(':');
  var hour;
  if (time[0] * 1 > 12) {
    hour = time[0] * 1 - 12;
  } else {
    hour = time[0] * 1;
  }
  $('#spend').keyup(function () {
    $('#earn').val($('#earn').val().replace(/,/g, ''));
    $('#spend').val($('#spend').val().replace(/,/g, ''));
    if ($('#earn').val() == '') {
      $('#earn').val($('#earn').val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $('#spend').val($('#spend').val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      return;
    }
    if ($('#spend').val() == '') {
      $('#earn').val($('#earn').val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $('#spend').val($('#spend').val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $('.earn-spend-clone').html('');
      $('.earn-spend-clone1').html('');
      return;
    }
    var flag = '';
    if ($('#earn').val() * 1 > 1) {
      flag = 'points';
    } else {
      flag = 'point';
    }
    $('#earn').val($('#earn').val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('#spend').val($('#spend').val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('.earn-spend-clone').html('Customer earns <b>' + $('#earn').val() + '</b> ' + flag + ' for every L£ <b>' + $('#spend').val() + '</b> spent');
    $('.earn-spend-clone1').html('Customer earns <b>' + $('#earn').val() + '</b> ' + flag + ' for every L£ <b>' + $('#spend').val() + '</b> spent');

  });

  $('#earn').keyup(function () {
    $('#earn').val($('#earn').val().replace(/,/g, ''));
    $('#spend').val($('#spend').val().replace(/,/g, ''));
    if ($('#spend').val() == '') {
      $('#earn').val($('#earn').val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $('#spend').val($('#spend').val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      return;
    }
    if ($('#earn').val() == '') {
      $('#earn').val($('#earn').val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $('#spend').val($('#spend').val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $('.earn-spend-clone').html('');
      $('.earn-spend-clone1').html('');
      return;
    }
    var flag = '';
    if ($('#earn').val() > 1) {
      flag = 'points';
    } else {
      flag = 'point';
    } 
    $('#earn').val($('#earn').val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('#spend').val($('#spend').val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('.earn-spend-clone').html('Customer earns <b>' + $('#earn').val() + '</b> ' + flag + ' for every L£ <b>' + $('#spend').val() + '</b> spent');
    $('.earn-spend-clone1').html('Customer earns ' + $('#earn').val() + ' ' + flag + ' for every L£ ' + $('#spend').val() + ' spent');
  });

  $(".weight").off("keypress");
  $(".weight").keypress(return_decimal);

  $('#program-name').keyup(function () {
    $('.program-name-clone').html($(this).val());
    if ($(this).val() === '') {
      $('#save').attr('disabled', true);
    } else {
      $('#save').removeAttr('disabled');
    }
  });

  $('input[name="point-round"]').click(function () {
    if ($(this).val() === 'none') {
      $('.point-round-clone-text').text('250.5 points = 250.5 points');
      $('.point-round-clone').html('');
      return;
    } else if ($(this).val() === 'up') {
      $('.point-round-clone-text').text('250.5 points = 251 points');
    } else if ($(this).val() === 'down') {
      $('.point-round-clone-text').text('250.5 points = 250 points');
    }
    // $('.point-round-clone').html('' + ' Point always <b>' + $(this).parent().text().trim() + '</b>');
    $('.point-round-clone').html('Point always round ' + $(this).val());
  });

  $('.start-date').change(function () {
    $('.start-date-clone').html('Active from ' + $(this).val().slice(0, 6));
    $('.start-time-clone').html(' at ' + $('#start-time option:selected').text() + ' ' + $('#flag').val());
  });

  $('#start-time').change(function () {
    $('.start-date-clone').html('Active from ' + $('.start-date').val().slice(0, 6));
    $('.start-time-clone').html(' at ' + $('#start-time option:selected').text() + ' ' + $('#flag').val());
  });

  $('#flag').change(function () {
    $('.start-date-clone').html('Active from ' + $('.start-date').val().slice(0, 6));
    $('.start-time-clone').html(' at ' + $('#start-time option:selected').text() + ' ' + $('#flag').val());
  })
  $('#set-roll').click(function () {
    if ($(this).prop('checked')) {
      $('.period-clone').html('Rolling expiration: 3 months');
    } else {
      $('.period-clone').text('');
    }
  });

  $('input[name="roll-period"]').click(function () {
    $('.period-clone').html('Rolling expiration: ' + $(this).parent().text().trim());
  });

  $('input[name="minimum-requirement"]').click(function () {
    if ($('#mini-none').prop('checked')) {
      $('#mini-amount').closest('label').next().addClass('d-none');
      $('#mini-quantity').closest('label').next().addClass('d-none');
      $('.mini-clone').text('');
    } else if ($('#mini-quantity').prop('checked')) {
      $('#mini-amount').closest('label').next().addClass('d-none');
      $('#mini-quantity').closest('label').next().removeClass('d-none');
      $('.mini-clone').html('' + 'Minimum quantity of 0 products');
      $('#mini-quantity-input').val('');
    } else {
      $('#mini-amount').closest('label').next().removeClass('d-none');
      $('#mini-quantity').closest('label').next().addClass('d-none');
      $('.mini-clone').html('' + 'Minimum purchase of L£ 0');
      $('#mini-amount-input').val('');
    }
  });

  $('#set-roll').click(function () {
    if ($(this).prop('checked')) {
      $('#period-bar').removeClass('d-none');
    } else {
      $('#period-bar').addClass('d-none');
    }
  });

  $('input').keyup(function () {
    $('#save').removeAttr('disabled');
  });

  $('select').change(function () {
    $('#save').removeAttr('disabled');
  });

  $(".number-format").on('keyup', function (e) {
    if(e.keyCode == 65 || e.keyCode == 17) {
      return;
    }
    $(this).val($(this).val().replace(/,/g, ''));
    $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    if($(this).hasClass("minimum-quantity")) {
      $('.mini-clone').html('Minimum quantity of ' + $(this).val() + ' products');      
    }
    if($(this).hasClass("minimum-amount")) {
      $('.mini-clone').html('Minimum purchase of L£ ' + $(this).val());    
    }
    if($(this).hasClass("point-amount")) {
      if ($(this).val() == '') {
        $('.point-clone').html('');
        return;
      }
      $('.point-clone').html('<b>1</b> point is worth <b>L£ ' + $(this).val() + '</b>');
      $('#info-card .point-clone').html(' 1 point is worth L£ ' + $(this).val() + '');
    }
  });
  $('.index-page').on('click', '.select2-selection', function () {
    $('.select2-search__field').mask('99:99');
  });
  setTime();
  setTimeout(() => {
    $('#select2-start-time-container').text(hour + ":" + time[1]);
  }, 800);
});
function return_decimal(event) {
  console.log(event.charCode);
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44 || event.charCode == 190;
}
$(document).on('keyup', '.select2-search__field', function (e) {
  $('#select2-start-time-container').text($('.select2-search__field').val());
  if($('#select2-start-time-container').text().length == 5) {
    var curtime = "";
    console.log($('#select2-start-time-container').text().substr(0,2));
    if($('#select2-start-time-container').text().substr(0,2) > "12") {
      curtime = "11";
    }
    else {
      curtime = $('#select2-start-time-container').text().substr(0,2);
    }
    if($('#select2-start-time-container').text().substr(3,2) > "59") {
      curtime = curtime + ":59";
    }
    else {
      curtime = curtime + ":" + $('#select2-start-time-container').text().substr(3,2);
    }
    $('#select2-start-time-container').text(curtime);
    $('.select2-search__field').val(curtime);
    $('.start-date-clone').html('Active from ' + $('.start-date').val().slice(0, 6));
    $('.start-time-clone').html(' at ' + curtime + ' ' + $('#flag').val());
  }
});