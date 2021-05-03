var amount_flag = 0;
$(document).ready(function () {
  unsavedManager(true, ['#content-body input', '#content-body select'], '');
  $('footer').hide();
  $('footer').removeClass("d-none");
  $('select').change(function() {
    $('footer').slideDown();
  });
  $('.transfer-date').fdatepicker({
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
  $('#content input').keydown(function () {
    $('footer .save').removeAttr('disabled');
    $('footer').slideDown();
  });
  
  $('input').change(function() {
    $('footer .save').removeAttr('disabled');
    $('footer').slideDown();
  });
  $('textarea').keydown(function() {
    $('footer .save').removeAttr('disabled');
    $('footer').slideDown();
  });
  $('#select-origin').change(function() {
    if($(this).val() != "") {
      $('#origin-div').removeClass("d-none");
      $(this).parent().addClass("d-none");
      $(this).parent().parent().find('.la-close').removeClass("d-none");
      $('#search-div').removeClass("d-none");
    }
  });
  $('#select-destination').change(function() {
    if($(this).val() != "") {
      $('#destination-div').removeClass("d-none");
      $(this).parent().addClass("d-none");
      $(this).parent().parent().find('.la-close').removeClass("d-none");
    }
  });
  $('#origin-card .la-close').click(function() {
    $('#origin-div').addClass("d-none");
    $('#origin-select-div').removeClass("d-none");
    $('#select-origin').val(null).trigger('change');
    $('#search-div').addClass("d-none");
    $(this).addClass("d-none");
    $('#products-table > tbody').html("");
  });
  $('#destination-card .la-close').click(function() {
    $("#destination-div").addClass("d-none");
    $("#destination-select-div").removeClass("d-none");
    $('#select-destination').val(null).trigger('change');
    $(this).addClass("d-none");
  });
  $('.notes').keydown(function() {
    if ($(this).val().length > 499) {
      ev.preventDefault();
    }
    $(this).parent().find('.length').text($(this).val().length + 1);
  });
  $('.discount-type').change(function() {
    if($(this).val() == "discount") {
      $('.discount-field').removeClass("d-none");
      $('.fixed-field').addClass("d-none");
      $('#discount-percent').text("");
      $('#discount-amount').text("%");
    } else {
      $('.fixed-field').removeClass("d-none");
      $('.discount-field').addClass("d-none");
      $('#fixed-amount').text("L£");
      $('#discount-fixed').text("");
    }
    calculate_Amount();
  });
  $('#discount-percent').keyup(function() {
    calculate_Amount();
  });
  $('#discount-fixed').keyup(function() {
    calculate_Amount();
  });

  $('footer .save').click(function() {
    $(this).attr("disabled", true);
    if(amount_flag == 0)
      $('#ghost .progress-link')[0].click();
    else
      $('#ghost .progress-link')[1].click();
  });
  event_format();
});

function add_product(item) {
  var add_item = `
  <tr style="min-height: 63px; height:63px;">
    <td>
      <b>` + $(item).find('.composite-product-name').eq(0).text() + `</b><br>
      <span class="text-muted product-info">` + $(item).find('.composite-product-info').eq(0).text() + `</span>
    </td>
    <td class="text-right">` + $(item).find('.origin-stock').eq(0).text() + `</td>
    <td class="text-right">` + $(item).find('.destination-stock').eq(0).text() + `</td>
    <td class="text-right">
      <input type="text" class="form-control number-format quantity ` + $(item).find('.number-type').eq(0).text() + ` text-right" value="10"
        aria-label="quantity" value="" aria-describedby="basic-addon2">
    </td>
    <td class="text-right d-none"><span class="d-flex justify-content-end">L£<span class="amount pl-1">200,000</span></span></td>
    <td class="text-right">
      <a class="text-danger delete-composite i-con-h-a">
        <i class="i-con i-con-trash"><i></i></i>
      </a>
    </td>
  </tr>
  `;
  $('#products-table tbody').append(add_item);
  $('.transfer_typeahead').typeahead('val','');
  calculate_Amount();
  event_format();
}
function return_integer(event) {
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44;
}
function return_decimal(event) {
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44 || event.charCode == 190;
}
function event_format() {
  $(".each").off("keypress");
  $(".each").keypress(return_integer);
  $(".weight").off("keypress");
  $(".weight").keypress(return_decimal);
  $(".number-format").on('keyup', function (e) {
    if(e.keyCode == 65 || e.keyCode == 17) {
      return;
    }
    $(this).val($(this).val().replace(/,/g, ''));
    $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  });
  
  $('.cost').keyup(function() {
    var cost = $(this).val().replace(/,/g, '');
    var quantity = $(this).parent().parent().parent().find('.quantity').eq(0).val().replace(/,/g, '');
    var total_amount = cost * quantity;
    $(this).parent().parent().parent().find('.amount').eq(0).text(total_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    calculate_Amount();
  });
  
  $('.quantity').keyup(function() {
    var cost = $(this).parent().parent().find('.cost').eq(0).val().replace(/,/g, '');
    var quantity = $(this).val().replace(/,/g, '');
    var total_amount = cost * quantity;
    $(this).parent().parent().find('.amount').eq(0).text(total_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    calculate_Amount();
  });

  $('.delete-composite').click(function() {
    $(this).parent().parent().remove();
    calculate_Amount();
  });

  $('input[value="billable"]').click(function() {
    $('#total-table').parent().parent().parent().parent().removeClass("d-none");
    $('#result_table').parent().parent().parent().parent().removeClass("d-none");
    $('.amount').parent().parent().removeClass("d-none");
    $('.th-amount').removeClass("d-none");
    amount_flag = 1;
  });

  $('input[value="non-billable"]').click(function() {
    $('#total-table').parent().parent().parent().parent().addClass("d-none");
    $('#result_table').parent().parent().parent().parent().addClass("d-none");
    $('.amount').parent().parent().addClass("d-none");
    $('.th-amount').addClass("d-none");
    amount_flag = 0;
  });

  if(amount_flag == 1) {
    console.log($('.amount').parent().parent());
    $('.amount').parent().parent().removeClass("d-none");
  }
}

function calculate_Amount()
{
  var sub_total = 0, subject_vat = 0, vat_value = 0;
  var table_rows = $("#products-table tbody>tr");
  for (let i = 0; i < table_rows.length; i ++) {
    var cur_value = parseInt(table_rows.eq(i).find(".amount").text().replace(/,/g, ''));
    sub_total += cur_value;
    let info_str = table_rows.eq(i).find(".product-info").text();
    if(info_str.indexOf("VAT") >= 0) {
      info_str = info_str.substring(info_str.indexOf("VAT"));
      let vat_amount = info_str.substring(4, 6);
      subject_vat += cur_value;
      vat_value += cur_value * vat_amount / 100.0;
    }
  }

  $('#subtotal-value').text(sub_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $('#subject-value').text(subject_vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $('#vat-value').text(vat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  if($('.discount-type').val() == "discount") {
    let percent;
    if($('#discount-percent').val() != "")
      percent = parseInt($('#discount-percent').val());
    else
      percent = 0;
    $('#total-amount').text(((sub_total + vat_value) * (100 - percent) / 100.0 ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  } else {
    let fixed;
    if($('#discount-fixed').val() != "")
      fixed = parseInt($('#discount-fixed').val().replace(/,/g, ''));
    else
      fixed = 0;
    $('#total-amount').text((sub_total + vat_value - fixed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
}

function remove_event(event) {
  $('.transfer_typeahead').typeahead('val','');
  event.preventDefault();
}