$(document).ready(function() {
  unsavedManager(true, ['#content-body input', '#content-body select'], '');
  $('footer').hide();
  $('footer').removeClass("d-none");
  $('footer').slideDown();
  $('footer .save').attr("disabled", true);
  $('.payment-date').fdatepicker({
    initialDate: '12-12-2020',
    format: 'M dd, yyyy',
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
  });

  $('#select-customer').select2().on('select2:open', function () {
    let select2 = $(this).data('select2');
    if (!$('.customer-select2-link').length) {
      select2.$results.parents('.select2-results')
        .prepend('<button class="btn w-sm mb-1 customer-select2-link bg-primary-lt w-100">Add new customer</button>')
        .on('click', function (b) {
          $('#customer-add-modal').modal('show');
          $('#select-customer').select2('close');
        });
    }
  });
  $('#select-location').change(function() {
    $('footer .save').attr("disabled", false);
    $('#search-div').removeClass("d-none");
  });
  $('.discount-type').change(function() {
    $('footer .save').attr("disabled", false);
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
    $('footer .save').attr("disabled", false);
    calculate_Amount();
  });
  $('#discount-fixed').keyup(function() {
    $('footer .save').attr("disabled", false);
    calculate_Amount();
  });
  $('.mark-paid').click(function() {
    $('footer .save').attr("disabled", true);
    $('#ghost .paid-link')[0].click();
  });
  $('.mark-pending').click(function() {
    $('footer .save').attr("disabled", true);
    $('#ghost .pending-link')[0].click();
  });
  $('#ckb-tax1').change(function() {
    $('footer .save').attr("disabled", false);
    if ($(this).prop("checked")) {
      if($('#ckb-tax2').prop('checked')) {
        $('#ckb-tax2').prop('checked', false);
        $('#ckb-tax2').closest('.d-flex').find('span').eq(0).removeClass('text-black');
        $('#ckb-tax2').closest('.d-flex').find('span').eq(1).addClass('text-muted');
      }
      $('#ckb-tax1').closest('.d-flex').find('span').eq(0).addClass('text-black');
      $('#ckb-tax1').closest('.d-flex').find('span').eq(1).removeClass('text-muted');
    } else {
      $('#ckb-tax1').closest('.d-flex').find('span').eq(0).removeClass('text-black');
      $('#ckb-tax1').closest('.d-flex').find('span').eq(1).addClass('text-muted');
    }
  });
  $('#ckb-tax2').change(function() {
    $('footer .save').attr("disabled", false);
    if ($(this).prop("checked")) {
      if($('#ckb-tax1').prop('checked')) {
        $('#ckb-tax1').prop('checked', false);
        $('#ckb-tax1').closest('.d-flex').find('span').eq(0).removeClass('text-black');
        $('#ckb-tax1').closest('.d-flex').find('span').eq(1).addClass('text-muted');
      }
      $('#ckb-tax2').closest('.d-flex').find('span').eq(0).addClass('text-black');
      $('#ckb-tax2').closest('.d-flex').find('span').eq(1).removeClass('text-muted');
    } else {
      $('#ckb-tax2').closest('.d-flex').find('span').eq(0).removeClass('text-black');
      $('#ckb-tax2').closest('.d-flex').find('span').eq(1).addClass('text-muted');
    }
  });

  $('footer .footer-save').click(function() {
    $('footer .save').attr("disabled", true);
    if($('.badge-md').text() == "Paid")
      $('#ghost .refund-sale-link')[0].click();
    else if($('.badge-md').text() == "Partial Refund")
      $('#ghost .refund-sale-link')[0].click();
    else $('#ghost .paid-link')[0].click();
  });

  $('#delete-sale-modal .confirm').click(function() {
    $('footer .save').attr("disabled", true);
    $('#ghost .all-link')[0].click();
  });
  $('.print-label').click(function() {
    $('footer .save').attr("disabled", true);
    $('#ghost .title-item-name').text($('#title').text());
    if($('.badge-md').text() == "Pending")
        $('#ghost .back-url').text("/bookeeping/sales_pending");
    else if($('.badge-md').text() == "Paid")
        $('#ghost .back-url').text("/bookeeping/sales_paid");
    else if($('.badge-md').text() == "Partial Refund")
        $('#ghost .back-url').text("/bookeeping/sales_refund_partial");
    $('#ghost .print-link')[0].click(); 
  });
  $('.expand-icon').click(function() {
    if($(this).text() == "↓") $(this).text("→");
    else if($(this).text() == "→") $(this).text("↓");
  });
  event_format();
  calculate_Amount();
});
function add_product(item) {
  var add_item = `
  <tr>
    <td>
      <b>` + $(item).find('.composite-product-name').eq(0).text() + `</b><br>
      <span class="text-muted product-info">` + $(item).find('.composite-product-info').eq(0).text() + `</span>
    </td>
    <td class="text-right">L£ 4,000</td>
    <td class="text-right">
      <input type="text" class="form-control number-format quantity weight text-right" value="10"
        aria-label="quantity" value="" aria-describedby="basic-addon2">
    </td>
    <td class="text-right"><span class="text-right">L£<span class="amount pl-1">400,000</span></span></td>
    <td class="text-right">
      <a class="text-danger delete-composite i-con-h-a">
        <i class="i-con i-con-trash"><i></i></i>
      </a>
    </td>
  </tr>
  `;
  $('#products-table tbody').append(add_item);
  $('.po_typeahead').typeahead('val','');
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
  $(".each").keypress(return_decimal);
  $(".weight").off("keypress");
  $(".weight").keypress(return_decimal);
  $(".number-format").on('keyup', function (e) {
    if(e.keyCode == 65 || e.keyCode == 17) {
      return;
    }
    $(this).val($(this).val().replace(/,/g, ''));
    $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  });
  
  $('.quantity').keyup(function() {
    var price = parseInt($(this).parent().parent().find('td').eq(1).text().substring(3).replace(/,/g, ''));
    var qty = parseInt($(this).val().replace(/,/g, ''));
    var amt = price * qty;
    $(this).parent().parent().find('.amount').text(amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    calculate_Amount();
  });

  $('.delete-composite').click(function() {
    $(this).parent().parent().remove();
    calculate_Amount();
  });
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
    let lbp_val = (sub_total + vat_value) * (100 - percent) / 100.0;
    $('#lbp-value').text(lbp_val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    let e_rate = 1520;
    $('#usd-value').text(parseInt((lbp_val / e_rate)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  } else {
    let fixed;
    if($('#discount-fixed').val() != "")
      fixed = parseInt($('#discount-fixed').val().replace(/,/g, ''));
    else
      fixed = 0;
    let lbp_val = sub_total + vat_value - fixed;
    $('#lbp-value').text(lbp_val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    let e_rate = 1520;
    $('#usd-value').text(parseInt((lbp_val / e_rate)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
}