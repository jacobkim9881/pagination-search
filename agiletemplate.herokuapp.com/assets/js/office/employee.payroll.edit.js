$(document).ready(function() {
  unsavedManager(true, ['#content-body input', '#content-body select'], '');
  $('footer').hide();
  $('footer').removeClass("d-none");
  if(window.location.pathname.indexOf("edit") >= 0) $('footer').slideDown();
// location / employee change
  $('select').on('change', () => {
    $('footer .save').attr("disabled", false);
    $('footer').slideDown();
  });
  $('input').on('keyup', () => {
    $('footer .save').attr("disabled", false);
    $('footer').slideDown();
  });
  $('input').on('change', () => {
    $('footer .save').attr("disabled", false);
    $('footer').slideDown();
  });
  $('.select-store').on('change', () => {
    if($('.select-employee').val() != "") {
      $('#payroll-table tbody').removeClass("d-none");
    }
  });
  $('.select-employee').on('change', () => {
    $('#payroll-table tbody').removeClass("d-none");
    set_Payroll_title();
    calculate_Amount();
  });
// date-picker initialize
  $('.start-date').fdatepicker({
    initialDate: '3-15-2020',
    format: 'M dd, yyyy',
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
  }); 
  $('.start-date').on('change', () => {
    set_Payroll_title();
  });
  $('.end-date').fdatepicker({
    initialDate: '4-15-2020',
    format: 'M dd, yyyy',
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
  });
  $('.end-date').on('change', () => {
    set_Payroll_title();
  });
  $('.split-payment').click(function() {
    $('.second-payment').removeClass("d-none");
    $(this).addClass("text-muted");
    $(this).attr("disabled", true);
    $(this).removeClass("back-link");
    $(this).removeClass("i-con-h-a");
    calculate_Amount();
  });
  $('.la-close').click(function() {
    if($(this).hasClass("close-payment")) {
      $('.second-payment').addClass("d-none");
      $('.split-payment').attr("disabled", false);
      $('.split-payment').addClass("back-link");
      $('.split-payment').addClass("i-con-h-a");
      $('.split-payment').removeClass("text-muted");
      calculate_Amount();
    } else {
      $('#supplier-close-modal').modal("show");
    }
  });
  $('.save').on('click', function() {
    $(this).attr("disabled", true);
    $('#ghost .details-link')[0].click();
  });
  $('.cancel-details').on('click', function() {
    if($('footer .save').attr("disabled")) {
      $('#ghost .details-link')[0].click();
    } else {
      $('#page-leave-modal').modal("show").on('click', (ev) => {
        if($(ev.target).hasClass("leave")) {
          $('footer .save').attr("disabled", true);
          $('footer').slideUp();
          $('#ghost .details-link')[0].click();
        }
      });
    }
  });
// events with delay initialize
  setTimeout(() => {
    event_format();
  }, 500);
});

function return_integer(event) {
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44 || event.charCode == 45;
}
function return_decimal(event) {
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44 || event.charCode == 190;
}
function event_format() {
  $(".each").off("keypress");
  $(".each").keypress(return_integer);
  $(".number-format").on('keyup', function (e) {
    if(e.keyCode == 65 || e.keyCode == 17) {
      return;
    }
    if($(this).val() != "" && $(this).val() != "-") {
      let value = string_to_number($(this).val());
      $(this).val(number_to_string(value));
    }
  });
  // reason input
  $('.added-row input').keyup(function(e) {
    if($(this).closest('tr').next().length == 0)
    {
      $(this).closest('tr').eq(0).removeClass("added-row");
      $("#reason-pay-table > tbody").append(
        `
        <tr class="added-row">
          <td class="table-padding">
            <div class="input-group w-100">
              <input type="text" class="form-control reason_typeahead" style="padding-left: 1rem;"
              placeholder="Type in reason" data-plugin="typeahead" id="search-reason-text" selectItem="onSelect($event, input)">
            </div>
          </td>
          <td class="text-right table-padding">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="currency-type input-group-text"><span class="currency-type">L£</span></span>
                </div>
                <input type="text" class="form-control text-right number-format each additional-amount mb-0" placeholder="0">
            </div>
          </td>
          <td class="text-right table-padding">
            <a class="text-danger delete-composite i-con-h-a">
              <i class="i-con i-con-trash"><i></i></i>
            </a>
          </td>
        </tr>
        `
      );
      event_format();
    }
    calculate_Amount();
  });
  
  $('.delete-composite').click(function() {
    $(this).closest('tr').prev().addClass("added-row");
    $(this).parent().parent().remove();
    event_format();
    calculate_Amount();
  });
}

function set_Payroll_title() {
  let title = `<b>${$(".select-employee option:selected" ).text()}</b> payroll for `;
  let start_date_full = $('.start-date').val().replace(",", "");
  let start_date = start_date_full.substring(0, start_date_full.length - 5);
  let start_year = start_date_full.substring(start_date_full.length - 4);
  let end_date_fill = $('.end-date').val().replace(",", "");
  let end_year = end_date_fill.substring(start_date_full.length - 4);
  title += `<b>${start_date}`;
  if(start_year != end_year) title += ` ${start_year} `;
  title += ` - ${end_date_fill}</b>`;
  $('.payroll-title').html(title);
}

function calculate_Amount() {
  var sub_total = 0, adjusted_pay = 0;
  if(!$('#payroll-table tbody').hasClass("d-none")) {
    var table_rows = $("#payroll-table tbody>tr");
    for (let i = 0; i < table_rows.length; i ++) {
      var cur_value = parseInt(table_rows.eq(i).find(".pay-amount").text().replace(/,/g, ''));
      sub_total += cur_value;
    }
  }
  $('.sub-total').text(number_to_string(sub_total));
  var reason_rows = $('#reason-pay-table tbody>tr');
  for (let i = 0; i < reason_rows.length - 1; i ++) {
    if(reason_rows.eq(i).find(".additional-amount").val() != "" && reason_rows.eq(i).find(".additional-amount").val() != "-") {
      var cur_value = string_to_number(reason_rows.eq(i).find(".additional-amount").val());
      adjusted_pay += cur_value;
    }
  }
  $('.additional-pay').text(number_to_string(adjusted_pay));
  var total_pay = sub_total + adjusted_pay;
  $('.total-pay').text(number_to_string(total_pay));
  if($('.second-payment').hasClass("d-none")) 
    $('.payment-amount').val(number_to_string(total_pay));
  else
    $('.payment-amount').val(number_to_string(total_pay / 2));
}

function string_to_number(str) {
  if(str[0] == "-")
    return -parseInt(str.substring(1).replace(/,/g, ''));
  else
    return parseInt(str.replace(/,/g, ''));
}
function number_to_string(number) {
  if(number < 0)
    return "-" + number.toString().substring(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  else
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}