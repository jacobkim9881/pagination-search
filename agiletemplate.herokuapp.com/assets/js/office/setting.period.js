$(document).ready(function () {
  footerControl();
  footerShowCondition();
  var hourHtmlStr = `<div class="input-group col-5 px-0 hour-select d-flex flex-nowrap">
                  <select class="custom-select select2" style="width: 100%;">
                    <option value="">1:00</option>
                    <option value="">1:30</option>
                    <option value="">2:00</option>
                    <option value="">2:30</option>
                    <option value="">3:00</option>
                    <option value="">3:30</option>
                    <option value="">4:00</option>
                    <option value="">4:30</option>
                    <option value="">5:00</option>
                    <option value="">5:30</option>
                    <option value="">6:00</option>
                    <option value="">6:30</option>
                    <option value="">7:00</option>
                    <option value="">7:30</option>
                    <option value="">8:00</option>
                    <option value="">8:30</option>
                    <option value="">9:00</option>
                    <option value="">9:30</option>
                    <option value="">10:00</option>
                    <option value="">10:30</option>
                    <option value="">11:00</option>
                    <option value="">11:30</option>
                    <option value="">12:00</option>
                    <option value="">12:30</option>
                  </select>
                  <div class="input-group-append" style="width:100%; max-width: 60px; min-width: 60px;">
                    <select name="" class="custom-select" id="">
                      <option value="">AM</option>
                      <option value="">PM</option>
                    </select>
                  </div>
                </div>
                <span class="px-3 col-1">-</span>
                <div class="input-group col-5 px-0 hour-select d-flex flex-nowrap">
                  <select class="custom-select select2" style="width:100%;">
                    <option value="">1:00</option>
                    <option value="">1:30</option>
                    <option value="">2:00</option>
                    <option value="">2:30</option>
                    <option value="">3:00</option>
                    <option value="">3:30</option>
                    <option value="">4:00</option>
                    <option value="">4:30</option>
                    <option value="">5:00</option>
                    <option value="">5:30</option>
                    <option value="">6:00</option>
                    <option value="">6:30</option>
                    <option value="">7:00</option>
                    <option value="">7:30</option>
                    <option value="">8:00</option>
                    <option value="">8:30</option>
                    <option value="">9:00</option>
                    <option value="">9:30</option>
                    <option value="">10:00</option>
                    <option value="">10:30</option>
                    <option value="">11:00</option>
                    <option value="">11:30</option>
                    <option value="">12:00</option>
                    <option value="">12:30</option>
                  </select>
                  <div class="input-group-append" style="width:100%; max-width: 60px; min-width: 60px;">
                    <select name="" class="custom-select" id="">
                      <option value="">AM</option>
                      <option value="">PM</option>
                    </select>
                  </div>
                </div>`;

  $('.hours .ui-switch input').change(function () {
    // $(this).closest('span').next().toggleClass('text-black');
    // $(this).closest('span').next().toggleClass('font-weight-bold');
    if ($(this).prop('checked')) {
      // $('.all-check-text').addClass('font-weight-bold');
      $('.all-check-text').removeClass('text-muted-light');
      $(this).closest('span').next().removeClass('text-muted-light');
      // $(this).closest('span').next().addClass('font-weight-bold');
      $(this).closest('span').next().addClass('text-black');
      $(this).closest('span').next().text('Open');
      $(this).closest('div').next().html(hourHtmlStr);
      $(this).closest('.hours').removeClass('sm-height');
      $(this).closest('.hours').addClass('md-height');
      $('.select2').select2();
    } else {
      $('.all-check-text').removeClass('text-black');
      // $('.all-check-text').removeClass('font-weight-bold');
      $('.all-check-text').addClass('text-muted-light');
      $(this).closest('span').next().removeClass('text-black');
      // $(this).closest('span').next().removeClass('font-weight-bold');
      $(this).closest('span').next().addClass('text-muted-light');
      $(this).closest('span').next().text('Closed');
      $(this).closest('div').next().html('');
      $(this).closest('.hours').removeClass('md-height');
      $(this).closest('.hours').addClass('sm-height');
    }
    if ($('.hours .ui-switch input').length === $('.hours .ui-switch input:checked').length) {
      $('.all-check-text').addClass('text-black');
      $('#all-check').prop('checked', true);
    } else {
      $('#all-check').prop('checked', false);
    }
    $('footer .save').attr('disabled', false);
  });

  $('.service .ui-switch input').change(function () {
    if ($(this).prop('checked')) {
      $(this).closest('span').next().removeClass('text-muted-light');
      $(this).closest('span').next().addClass('text-black');
      $(this).closest('span').next().text('Enabled');
      $(this).closest('div').next().html(hourHtmlStr);
      $(this).closest('.service').removeClass('sm-height');
      $(this).closest('.service').addClass('md-height');
      $('.select2').select2();
    } else {
      $(this).closest('span').next().removeClass('text-black');
      $(this).closest('span').next().addClass('text-muted-light');
      $(this).closest('span').next().text('Disabled');
      $(this).closest('div').next().html('');
      $(this).closest('.service').removeClass('md-height');
      $(this).closest('.service').addClass('sm-height');
    }
    $('footer .save').attr('disabled', false);

    $('footer .save').attr('disabled', false);
  });

  $('.index-page').on('click', '.select2-selection', function () {
    $('.select2-search__field').mask('99:99');
    $('footer .save').attr('disabled', false);
  });

  $('#cancel').click(function () {
    $('.ui-switch input').prop('checked', false);
    $('.hours span.d-flex .ml-2').text('Closed');
    $('.hours span.d-flex .ml-2').removeClass('text-black');
    // $('.hours span.d-flex .ml-2').removeClass('font-weight-bold');

    $('.service span.d-flex .ml-2').text('Disabled');
    $('.service span.d-flex .ml-2').removeClass('text-black');
    // $('.service span.d-flex .ml-2').removeClass('font-weight-bold');

    $('table td.d-flex').html('');
    $('footer .save').attr('disabled', false);
  });

  $('#all-check').click(function () {
    if ($(this).prop('checked')) {
      $('.all-check-text').addClass('text-black');
      // $('.all-check-text').addClass('font-weight-bold');
      $('.all-check-text').removeClass('text-muted-light');
      $('.hours .status').text('Open');
      $('.hours .status').removeClass('text-muted-light');
      // $('.hours .status').addClass('font-weight-bold');
      $('.hours .status').addClass('text-black');
      $('.hours input[type="checkbox"]').prop('checked', true).change();
      $('.hours .week').html(hourHtmlStr);
      $('.select2').select2();
    } else {
      $('.all-check-text').removeClass('text-black');
      // $('.all-check-text').removeClass('font-weight-bold');
      $('.all-check-text').addClass('text-muted-light');
      $('.hours .status').text('Closed');
      // $('.hours .status').removeClass('font-weight-bold');
      $('.hours .status').removeClass('text-black');
      $('.hours .status').addClass('text-muted-light');
      $('.hours input[type="checkbox"]').prop('checked', false);
      $('.hours .week').html('');
      $('.hours').removeClass('md-height');
      $('.hours').addClass('sm-height');
    }
    $('footer .save').attr('disabled', false);
  });

  $('.continue').click(function () {
    $('.all-check-text').removeClass('text-black');
    // $('.all-check-text').removeClass('font-weight-bold');
    $('.all-check-text').addClass('text-muted-light');
    $('input[type="checkbox"]').prop('checked', false);
    $('.status').removeClass('text-black');
    $('.status').addClass('text-muted-light');
    // $('table .status').removeClass('font-weight-bold');
    $('.week').html('');
    $('.hours .status').text('Closed');
    $('.service .status').text('Disabled');
    $('footer .save').attr('disabled', true);
    $('footer').slideUp();
  });

  $('.save').click(function () {
    $('footer').slideUp();
    notification('Period of service updated successfully');
  });
});