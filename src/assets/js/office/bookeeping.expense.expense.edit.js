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
  $('#select-supplier').select2().on('select2:open', function () {
    let select2 = $(this).data('select2');
    if (!$('.supplier-select2-link').length) {
      select2.$results.parents('.select2-results')
        .prepend('<button class="btn w-sm mb-1 supplier-select2-link bg-primary-lt w-100">Add new supplier</button>')
        .on('click', function (b) {
          $('#supplier-add-modal').modal('show');
          $('#select-supplier').select2('close');
        });
    }
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
    if($(this).val() == "Jack") {
      currency_type = 2;
      $('#exchange-div').removeClass("d-none");
      $('.account-currency').text("USD");
      $('.currency-type').text("$");
      $("#result_table tbody>tr").eq(1).addClass("d-none");
      $("#result_table tbody>tr").eq(2).removeClass("d-none");
      $("#usd-value").text("0");
      $("#lbp-value").text("0");
    } else {
      currency_type = 1;
      $('#exchange-div').addClass("d-none");
      $('.account-currency').text("LBP");
      $('.currency-type').text("L£");
      $("#result_table tbody>tr").eq(1).removeClass("d-none");
      $("#result_table tbody>tr").eq(2).addClass("d-none");
      $('#total-amount').text("0");
    }
    $('#supplier-info').removeClass("d-none");
    $('#find-supplier').addClass("d-none");
    $('#products-div').removeClass("d-none");
    $('#subtotal-value').text("0");
    $('#subject-value').text("0");
    $('#vat-value').text("0");
    $("#products-table > tbody").html(
      `
      <tr>
        <td>
          <div class="input-group w-100">
              <input type="text" class="form-control service_typeahead" style="padding-left: 1rem;"
                  placeholder="Electricity"
                  data-plugin="typeahead" id="search-reason-text" selectItem="onSelect($event, input)">
          </div>
        </td>
        <td>
            <input type="text" class="form-control" placeholder="Month of January 2020">
        </td>
        <td class="text-right">
            <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">` + (currency_type == 1 ? "L£" : "$") + `</span>
            </div>
            <input type="text" class="form-control number-format cost each text-right" value="200">
            </div>
        </td>
        <td class="text-right">
          <input type="text" class="form-control number-format quantity weight text-right" value="10"
            aria-label="quantity" value="" aria-describedby="basic-addon2">
        </td>
        <td class="text-right"><span class="d-flex float-right">` + (currency_type == 1 ? "L£" : "$") + ` <span class="amount pl-1">2000</span></span></td>
        <td class="text-right">
        </td>
      </tr>
      <tr class="added-row">
        <td>
          <div class="input-group w-100">
              <input type="text" class="form-control service_typeahead" style="padding-left: 1rem;"
                  placeholder="Type or select prod/service "
                  data-plugin="typeahead" id="search-reason-text" selectItem="onSelect($event, input)">
          </div>
        </td>
        <td>
            <input type="text" class="form-control" placeholder="Description">
        </td>
        <td class="text-right">
            <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">` + (currency_type == 1 ? "L£" : "$") + `</span>
            </div>
            <input type="text" class="form-control number-format cost each text-right" value="0">
            </div>
        </td>
        <td class="text-right">
          <input type="text" class="form-control number-format quantity weight text-right" value="0"
            aria-label="quantity" value="" aria-describedby="basic-addon2">
        </td>
        <td class="text-right"><span class="d-flex float-right">` + (currency_type == 1 ? "L£" : "$") + ` <span class="amount pl-1">0</span></span></td>
        <td class="text-right">
          <a class="text-danger delete-composite i-con-h-a">
            <i class="i-con i-con-trash"><i></i></i>
          </a>
        </td>
      </tr>
      `
    );
    event_format();
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
  $('.discount-type').change(function() {
    if($(this).val() == "discount") {
      $('.discount-field').removeClass("d-none");
      $('.fixed-field').addClass("d-none");
      $('#discount-percent').text("");
      $('#discount-amount').text("%");
    } else {
      $('.fixed-field').removeClass("d-none");
      $('.discount-field').addClass("d-none");
      if(currency_type == 1) {
        $('#fixed-amount').text("L£");
      } else {
        $('#fixed-amount').text("$");
      }
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
  $('.exchange-rate').keyup(function() {
    calculate_Amount();
  });
  
  $('.draft').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .draft-link')[0].click();
  });

  $('.cancel-change').click(function() {
    $('#page-leave-modal').modal("show");
  });

  $('#page-leave-modal .leave').click(function() {
    $('#ghost .details-link')[0].click();
  });

  $('footer .save').click(function() {
    $(this).removeClass("save");
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
  
  $('#ckb-tax1').change(function() {
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
  $('.split-payment').click(function() {
    $('.second-payment').removeClass("d-none");
    $(this).addClass("text-muted");
    $(this).attr("disabled", true);
    $(this).removeClass("back-link");
    $(this).removeClass("i-con-h-a");
    calculate_Amount();
  });
  event_format();
  calculate_Amount();
});

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
  
  $('.cost').keyup(function() {
    let cost = parseInt($(this).val().replace(/,/g, ''));
    let quantity = parseInt($(this).parent().parent().parent().find('.quantity').val());
    let total = cost * quantity;
    $(this).parent().parent().parent().find('.amount').text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    calculate_Amount();
  });

  $('.quantity').keyup(function() {
    let quantity = parseInt($(this).val().replace(/,/g, ''));
    let cost = parseInt($(this).parent().parent().find('.cost').val());
    let total = cost * quantity;
    $(this).parent().parent().find('.amount').text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    calculate_Amount();
  });

  $('.delete-composite').click(function() {
    $(this).parent().parent().remove();
    calculate_Amount();
  });

  $('.added-row input').change(function() {
    if($(this).closest('tr').next().length == 0)
    {
      $(this).closest('tr').eq(0).removeClass("added-row");
      $("#products-table > tbody").append(
        `
        <tr class="added-row">
          <td>
            <div class="input-group w-100">
                <input type="text" class="form-control service_typeahead" style="padding-left: 1rem;"
                    placeholder="Type or select prod/service "
                    data-plugin="typeahead" id="search-reason-text" selectItem="onSelect($event, input)">
            </div>
          </td>
          <td>
              <input type="text" class="form-control" placeholder="Description">
          </td>
          <td class="text-right">
              <div class="input-group">
              <div class="input-group-prepend">
                  <span class="input-group-text">` + (currency_type == 1 ? "L£" : "$") + `</span>
              </div>
              <input type="text" class="form-control number-format cost each text-right" value="0">
              </div>
          </td>
          <td class="text-right">
            <input type="text" class="form-control number-format quantity weight text-right" value="0"
              aria-label="quantity" value="" aria-describedby="basic-addon2">
          </td>
          <td class="text-right"><span class="d-flex float-right">` + (currency_type == 1 ? "L£" : "$") + ` <span class="amount pl-1">0</span></span></td>
          <td class="text-right">
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
    } else {
      non_vat_product = 1;
    }
  }

  $('#subtotal-value').text(sub_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $('#subject-value').text(subject_vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $('#vat-value').text(vat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  if(currency_type == 1) {
    if($('.discount-type').val() == "discount") {
      let percent;
      if($('#discount-percent').val() != "")
        percent = parseInt($('#discount-percent').val());
      else
        percent = 0;
      var total_amt = (sub_total + vat_value) * (100 - percent) / 100.0;
      $('#total-amount').text(total_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      if($('.second-payment').hasClass("d-none")) {
        $('.payment-amount').val(total_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      } else {
        $('.payment-amount').val((total_amt / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      }
    } else {
      let fixed;
      if($('#discount-fixed').val() != "")
        fixed = parseInt($('#discount-fixed').val().replace(/,/g, ''));
      else
        fixed = 0;
      var total_amt = sub_total + vat_value - fixed;
      $('#total-amount').text(total_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      if($('.second-payment').hasClass("d-none")) {
        $('.payment-amount').val(total_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      } else {
        $('.payment-amount').val((total_amt / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      }
    }
  } else {
    if($('.discount-type').val() == "discount") {
      let percent;
      if($('#discount-percent').val() != "")
        percent = parseInt($('#discount-percent').val());
      else
        percent = 0;
      let usd_val = (sub_total + vat_value) * (100 - percent) / 100.0;
      $('#usd-value').text(usd_val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      let e_rate = parseInt($('.exchange-rate').val().replace(/,/g, ''));
      $('#lbp-value').text((usd_val * e_rate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      if($('.second-payment').hasClass("d-none")) {
        $('.payment-amount').val(usd_val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      } else {
        $('.payment-amount').val((usd_val / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      }
    } else {
      let fixed;
      if($('#discount-fixed').val() != "")
        fixed = parseInt($('#discount-fixed').val().replace(/,/g, ''));
      else
        fixed = 0;
      let usd_val = sub_total + vat_value - fixed;
      $('#usd-value').text(usd_val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      let e_rate = parseInt($('.exchange-rate').val().replace(/,/g, ''));
      $('#lbp-value').text((usd_val * e_rate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      if($('.second-payment').hasClass("d-none")) {
        $('.payment-amount').val(usd_val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));   
      } else {
        $('.payment-amount').val((usd_val / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));   
      }
    }
  }
}
