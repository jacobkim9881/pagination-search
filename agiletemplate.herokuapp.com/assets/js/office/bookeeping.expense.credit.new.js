var currency_type = 1;
var back_url = 1;
var non_vat_product = 0;
$(document).ready(function () {
  unsavedManager(true, ['#content-body input', '#content-body select'], '');
  $('footer').hide();
  $('footer').removeClass("d-none");
  $('select').change(function() {
    $('footer').slideDown();
  });
  $('.ref-number').mask('999-99999');
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
  $('.end-date').fdatepicker({
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
    if($(this).hasClass("variant_input")) return;
    if($(this).attr("name") == "variant-name") return;
    if($(this)[0] == $('#name')[0]) return;
    if($(this)[0] == $('#company-legal-name')[0] || $(this)[0] == $('#contact-first-name')[0] || $(this)[0] == $('#contact-last-name')[0] || $(this)[0] == $('#mobile')[0] || $(this)[0] == $('#phone')[0] || $(this)[0] == $('#exchange-rate')[0] || $(this)[0] == $('#vat-id-number')[0] || $(this)[0] == $('#vat-percentage')[0]) return;
    $('footer .save').removeAttr('disabled');
    $('footer').slideDown();
  });
  
  $('input').change(function() {
    if(($(this)[0] == $('#production-switch')[0]) && (!$('#composite-switch').prop("checked"))) return;
    if($(this).hasClass("variant_input")) return;
    if($(this)[0] == $('#company-legal-name')[0]) return;
    if($(this).attr("name") == "variant-name") return;
    if($(this)[0] == $('#company-legal-name')[0] || $(this)[0] == $('#contact-first-name')[0] || $(this)[0] == $('#contact-last-name')[0] || $(this)[0] == $('#mobile')[0] || $(this)[0] == $('#phone')[0] || $(this)[0] == $('#exchange-rate')[0] || $(this)[0] == $('#vat-id-number')[0] || $(this)[0] == $('#vat-percentage')[0]) return;
    if($(this)[0] == $('#is-sub-category')[0]) return;
    if($(this)[0] == $('#name')[0]) return;
    if($(this).attr("name") == "currency") return;
    if($(this).attr("name") == "isVat") return;
    $('footer .save').removeAttr('disabled');
    $('footer').slideDown();
  });
  $('textarea').keydown(function() {
    $('footer .save').removeAttr('disabled');
    $('footer').slideDown();
  });
  $('#select-supplier').change(function() {
    $("#products-table > tbody").html("");
    if($(this).val() == "Jack") {
      currency_type = 2;
      $('#exchange-div').removeClass("d-none");
      $('.account-currency').text("USD");
      $('.currency-type').text("$");
      $("#result_table tbody>tr").eq(1).addClass("d-none");
      $("#result_table tbody>tr").eq(2).removeClass("d-none");
      $("#usd-value").text("0");
      $("#lbp-value").text("0");
      $('#usd-div').removeClass("d-none");
      $('#lbp-div').addClass("d-none");
    } else {
      currency_type = 1;
      $('#exchange-div').addClass("d-none");
      $('.account-currency').text("LBP");
      $('.currency-type').text("L£");
      var table_rows = $("#result_table tbody>tr");
      $("#result_table tbody>tr").eq(1).removeClass("d-none");
      $("#result_table tbody>tr").eq(2).addClass("d-none");
      $('#total-amount').text("0");
      $('#lbp-div').removeClass("d-none");
      $('#usd-div').addClass("d-none");
    }
    $('#supplier-info').removeClass("d-none");
    $('#find-supplier').addClass("d-none");
    $('#products-div').removeClass("d-none");
    $('#subtotal-value').text("0");
    $('.total-credit').text("0");
    $('.total-credit-lbp').text("0");
  });

  $('.la-close').click(function() {
    if($(this).hasClass("close-payment")) {
      $('.second-payment').addClass("d-none");
      $('.split-payment').attr("disabled", false);
      $('.split-payment').addClass("back-link");
      $('.split-payment').addClass("i-con-h-a");
      calculate_Amount();
    } else {
      $('#supplier-close-modal').modal("show");
    }
  });
  $('.orders-expenses').click(function() {
    $('#ghost .expenses-link')[0].click();
  });
  $('#supplier-close-modal .continue').click(function() {
    $('#select-supplier').val(null).trigger('change');
    $('#supplier-info').addClass("d-none");
    $('#find-supplier').removeClass("d-none");
    $('#products-div').addClass("d-none");
  });
  $('.notes').keydown(function() {
    if ($(this).val().length > 499) {
      ev.preventDefault();
    }
    $(this).parent().find('.length').text($(this).val().length + 1);
  });
  $('#create-supplier').click(function() {
    $('footer').slideDown();
    $('footer .save').attr("disabled", false);
  });
  $('.exchange-rate').keyup(function() {
    calculate_Amount();
  });
  
  $('footer .save').click(function() {
    $(this).attr("disabled", true);
    $('#ghost .details-link')[0].click();
  });
  $('#supplier-add-modal [name=currency]').change(function () {
    if ($(this).val() == 'usd') {
      $('#supplier-add-modal .excharge-rate').removeClass('d-none');
    } else {
      $('#supplier-add-modal .excharge-rate').addClass('d-none');
    }
  });

  $('#supplier-add-modal [name=isVat]').change(function () {
    if ($(this).val() == 'yes') {
      $('#supplier-add-modal .vat-id').removeClass('d-none');
      $('#supplier-add-modal .vat-percentage').removeClass('d-none');
      $('#supplier-add-modal .vat-type').removeClass('d-none');
    } else {
      $('#supplier-add-modal .vat-id').addClass('d-none');
      $('#supplier-add-modal .vat-percentage').addClass('d-none');
      $('#supplier-add-modal .vat-type').addClass('d-none');
    }
  });

  $('#additional-credit').keyup(function() {
    calculate_Amount();
  });
  calculate_Amount();
  event_format();
});

function add_product(item) {
  var add_item = `
  <tr>
    <td>
      <b>` + $(item).find('.composite-product-name').eq(0).text() + `</b><br>
      <span class="text-muted product-info">` + $(item).find('.composite-product-info').eq(0).text() + `</span>
    </td>
    <td class="text-right">
        <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text">` + (currency_type == 1 ? "L£" : "$") + `</span>
        </div>
        <input type="text" class="form-control number-format cost each text-right" value="` + (currency_type == 1 ? "20,000" : "13") + `">
        </div>
    </td>
    <td class="text-right">
      <input type="text" class="form-control number-format quantity weight text-right" value="10"
        aria-label="quantity" value="" aria-describedby="basic-addon2">
    </td>
    <td class="text-right"><span class="d-flex float-right">` + (currency_type == 1 ? "L£" : "$") + ` <span class="amount pl-1">` + (currency_type == 1 ? "200,000" : "130") + `</span></span></td>
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
  $('.number-format').keydown(function() {
    if($(this).val() == "0") $(this).val("");
  });
  $('.number-format').change(function() {
    if($(this).val() == "") $(this).val("0");
  });
  $('.quantity').keyup(function() {
    let cost = $(this).parent().parent().find('.cost').val().replace(/,/g, '');
    let quantity = $(this).val().replace(/,/g, '');
    $(this).parent().parent().find('.amount').text((cost * quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    calculate_Amount();
  });
  $('.cost').keyup(function() {
    let quantity = $(this).parent().parent().parent().find('.quantity').val().replace(/,/g, '');
    let cost = $(this).val().replace(/,/g, '');
    $(this).parent().parent().parent().find('.amount').text((cost * quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    calculate_Amount();
  });

  $('.delete-composite').click(function() {
    console.log($(this).parent().parent());
    $(this).parent().parent().remove();
    calculate_Amount();
  });
}

function calculate_Amount()
{
  var sub_total = 0;
  var table_rows = $("#products-table tbody>tr");
  for (let i = 0; i < table_rows.length; i ++) {
    var cur_value = parseInt(table_rows.eq(i).find(".amount").text().replace(/,/g, ''));
    sub_total += cur_value;
  }
  $('.sub-total').text(sub_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  let add_credit = 0;
  if($('#additional-credit').val() != "")
    add_credit = parseInt($('#additional-credit').val().replace(/,/g, ''));
    $('.total-credit').text((sub_total + add_credit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    let rate = $('.exchange-rate').val().replace(/,/g, '');
    $('.total-credit-lbp').text(((sub_total + add_credit) * rate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}