var changed_items_cnt = 0;
$(document).ready(function() {
  if($('#ghost .back-url').text() != "") {
    $('#pjax-back-link').attr("href", $('#ghost .back-url').text());
    $('span.back-link').text("Sales");
  }
  event_format();
});
function return_decimal(event) {
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44 || event.charCode == 190;
}
function event_format() {
  $(".weight").off("keypress");
  $(".weight").keypress(return_decimal);
  $(".number-format").on('keyup', function (e) {
    if(e.keyCode == 65 || e.keyCode == 17) {
      return;
    }
    $(this).val($(this).val().replace(/,/g, ''));
    $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  });

  $('.quantity').keydown(function() {
    if($(this).val().replace(/,/g, '') == "0") $(this).val("");
  });

  $('.refund-amount.number-format').keydown(function() {
    if($(this).val().replace(/,/g, '') == "0") $(this).val("");
  });
  
  $('.quantity').keyup(function() {
    if($(this).val() == "") $(this).val("0");
    var price = parseInt($(this).parent().parent().parent().find('td').eq(1).text().substring(3).replace(/,/g, ''));
    var qty = parseInt($(this).val().replace(/,/g, ''));
    var max_qty = parseInt($(this).parent().parent().parent().find('.max-quantity').text().replace(/,/g, ''));
    if(qty > max_qty) {
      qty = max_qty;
      $(this).val(max_qty.toString());
    }
    var amt = price * qty;
    $(this).parent().parent().parent().find('.amount').text(amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    change_States();
    calculate_Amount();
    change_States();
  });

  $('#checkbox').change(function() {
    if($(this).prop("checked")) {
      $('.restock').addClass("d-none");
      $('#select-restock-store').attr("disabled", false);
    } else {
      $('.restock').removeClass("d-none");
      $('#select-restock-store').attr("disabled", true);
    }
  });

  $('.refund-amount').keyup(function() {
    change_States();
    if($('.refund-amount.number-format').val().replace(/,/g, '') == "") $('span.refund-amount').text("0");
    else $('span.refund-amount').text($('.refund-amount.number-format').val());
  });

  $('.cancel').click(function() {
    $('#ghost .paid-link')[0].click();
  });

  $('.refund-partial').click(function() {
    var table_rows = $("#products-table tbody>tr");
    for (let i = 0; i < table_rows.length; i ++) {
      var cur_stock = parseInt(table_rows.eq(i).find(".quantity").val().replace(/,/g, ''));
      var total_stock = parseInt(table_rows.eq(i).find(".max-quantity").text().replace(/,/g, ''));
      if(cur_stock != total_stock) {
        $('#ghost .refund-partial-link')[0].click();
        return;
      }
    }
    $('#ghost .refunded-link')[0].click();
  });
}
function change_States()
{
  changed_items_cnt = 0;
  for(let i = 0; i < $('.quantity.number-format').length; i ++) {
    if($('.quantity.number-format').eq(i).val() != "0") {
      changed_items_cnt += parseInt($('.quantity.number-format').eq(i).val());
    }
  }
  if(changed_items_cnt > 0) {
    $('#no-details').addClass("d-none");
    $('#summary-details').removeClass("d-none");
    $('#restock-div').removeClass("d-none");
    $('#restock-div').addClass("w-100");
  } else {
    $('#no-details').removeClass("d-none");
    $('#summary-details').addClass("d-none");
    $('#restock-div').addClass("d-none");
  }
  if($('.refund-amount.number-format').val().replace(/,/g, '') != $('#refund-total').text().replace(/,/g, '')) $('#alert-div').removeClass("d-none");
  else $('#alert-div').addClass("d-none");
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
  if(changed_items_cnt == 1) {
    $('.changed-items').text(changed_items_cnt + " item");
    $('.restock_cnt').text(changed_items_cnt + " item");
  }
  else {
    $('.changed-items').text(changed_items_cnt + " items");
    $('.restock_cnt').text(changed_items_cnt + " items");
  }
  $('#vat-value').text(vat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $('#refund-total').text(sub_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  // $('#available-refund').text(sub_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $('.refund-amount').text(sub_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $('.refund-amount').val(sub_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}