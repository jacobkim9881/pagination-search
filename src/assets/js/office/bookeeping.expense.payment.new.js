var currency_type = 1, payment_type = 1;
var back_url = 1;
var non_vat_product = 0;
$(document).ready(function () {
  unsavedManager(true, ['#content-body input', '#content-body select'], '');
  $('footer').hide();
  $('footer').removeClass("d-none");
  $('select').change(function() {
    $('footer').slideDown();
  });
  $('.start-date').fdatepicker({
    initialDate: '12-12-2020',
    format: 'M dd, yyyy',
    // keyboardNavigation: false,
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
  });
  $('.end-date').fdatepicker({
    initialDate: '12-12-2020',
    format: 'M dd, yyyy',
    // keyboardNavigation: false,
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
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
  $('#select-supplier').change(function() {
    if($(this).val() == "John") {
      currency_type = 1;
      payment_type = 1;
      $('#exchange-div').addClass("d-none");
      $('.account-currency').text("LBP");
      $('.currency-type').text("L£");
      $('#total-amount').text("0");
      $('#credit-div').removeClass("d-none");
      
      $('.origin-amount').text("2,000,000");
      $('.balance-amount').text("2,000,000");
      $('.balance-amount').eq(0).text("1,000,000");
    } else if($(this).val() == "Jack") {
      currency_type = 2;
      payment_type = 2;
      $('#exchange-div').removeClass("d-none");
      $('.account-currency').text("USD");
      $('.currency-type').text("$");
      $("#usd-value").text("0");
      $("#lbp-value").text("0");

      let rate = $('.exchange-rate').val().replace(/,/g, '');
      $('.origin-amount').text(parseInt(2000000 / rate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $('.balance-amount').text(parseInt(2000000 / rate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $('.balance-amount').eq(0).text(parseInt(1000000 / rate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    } else {
      currency_type = 1;
      payment_type = 1;
      $('#exchange-div').addClass("d-none");
      $('.account-currency').text("LBP");
      $('.currency-type').text("L£");
      $('#total-amount').text("0");
      
      $('.origin-amount').text("2,000,000");
      $('.balance-amount').text("2,000,000");
      $('.balance-amount').eq(0).text("1,000,000");
    }
    $('#supplier-info').removeClass("d-none");
    $('#find-supplier').addClass("d-none");
    $('#products-div').removeClass("d-none");
    $('#apply-amount').val("");
    $('#paid-amount').text("");
    $('#remain-amount').text("");
    $('.each-payment').val("");
    change_Currency_type();
    calculate_Outstanding();
  });

  $('.la-close').click(function() {
    if($(this).hasClass("close-payment")) {
      $('.second-payment').addClass("d-none");
      $('.split-payment').attr("disabled", false);
      $('.split-payment').addClass("back-link");
      $('.split-payment').addClass("i-con-h-a");
      $('.split-payment').removeClass("text-muted");
      var payment_amout = parseInt($('.payment-amount').eq(0).val().replace(/,/g, '')) + parseInt($('.payment-amount').eq(1).val().replace(/,/g, ''));
      $('.payment-amount').val(payment_amout.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    } else {
      $('#supplier-close-modal').modal("show");
      $('#apply-amount').val("");
      $('#paid-amount').text();
      $('#remain-amount').text();
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
    $('#credit-div').addClass("d-none");
    $('#paid-amount').text("0");
    $('#remain-amount').text("0");
  });
  $('.notes').keydown(function() {
    if ($(this).val().length > 499) {
      ev.preventDefault();
    }
    $(this).parent().find('.length').text($(this).val().length + 1);
  });

  $('.exchange-rate').keyup(function() {
    let rate = $('.exchange-rate').val().replace(/,/g, '');
    $('.origin-amount').text(parseInt(2000000 / rate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('.balance-amount').text(parseInt(2000000 / rate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('.balance-amount').eq(0).text(parseInt(1000000 / rate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  });

  $('#select-currency').change(function() {
    change_Currency_type();
  });

  $('footer .save').click(function() {
    $(this).removeClass("save");
    $('#ghost .details-link')[0].click();
  });
  $('.split-payment').click(function() {
    if($(this).hasClass("text-muted")) return;
    let payment_amount = 0;
    if($('.payment-amount').eq(0).val() != "") {
      payment_amount = parseInt($('.payment-amount').eq(0).val().replace(/,/g, ''));
      console.log(payment_amount);
    }
    $('.second-payment').removeClass("d-none");
    $('.payment-amount').val((payment_amount / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(this).addClass("text-muted");
    $(this).attr("disabled", true);
    $(this).removeClass("back-link");
    $(this).removeClass("i-con-h-a");
  });
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
    if($(this).val().replace(/,/g, '') == "0") $(this).val("");
  });
  $('.each-payment').keyup(function() {
    let cur_payment = parseInt($(this).val().replace(/,/g, ''));
    let balance_payment = parseInt($(this).parent().parent().parent().find('.balance-amount').text().replace(/,/g, ''));
    let rate = parseInt($('.exchange-rate').val().replace(/,/g, ''));
    if(currency_type == 1 && payment_type == 2) {
      balance_payment /= rate;
    } else if(currency_type == 2 && payment_type == 1) {
      balance_payment *= rate;
    }
    if(cur_payment > balance_payment) {
      cur_payment = parseInt(balance_payment);
      $(this).val(cur_payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
  });
  $('.credit-amount').keyup(function() {
    calculate_Total();
  });

  $('.payment-amount').change(function() {
    repayment_Value();
  });
  $('.payment-amount').keyup(function() {
    repayment_Value();
  });

  $('#apply-amount').keyup(function() {
    seperate_Value();
    calculate_Outstanding();
  });

  $('.each-payment').keyup(function() {
    calculate_Total();
    calculate_Outstanding();
  });
  calculate_Total();
  calculate_Outstanding();
});

function return_integer(event) {
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44;
}
function return_decimal(event) {
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44 || event.charCode == 190;
}

function calculate_Outstanding() {
  if(!$('#products-div').hasClass("d-none")) {
    var transaction_rows = $('#products-table tbody>tr');
    var total_value = 0;
    let rate = parseInt($('.exchange-rate').val().replace(/,/g, ''));
    for(let i = 0; i < transaction_rows.length; i ++) {
      let amt_to_pay = 0;
      if($(transaction_rows).eq(i).find('.each-payment').val() != "")
        amt_to_pay = parseInt($(transaction_rows).eq(i).find('.each-payment').val().replace(/,/g, ''));
      let balance_amt = parseInt($(transaction_rows).eq(i).find('.balance-amount').text().replace(/,/g, ''));
      if(currency_type == 1 && payment_type == 2) {
        amt_to_pay *= rate;
      } else if(currency_type == 2 && payment_type == 1) {
        amt_to_pay /= rate;
      }
      total_value += (balance_amt - parseInt(amt_to_pay));
    }
    $('#remain-amount').text(total_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
}

function calculate_Total() {
  var transaction_rows = $('#products-table tbody>tr');
  var total_pay = 0;
  for(let i = 0; i < transaction_rows.length; i ++) {
    let amt_to_pay = 0;
    if($(transaction_rows).eq(i).find('.each-payment').val() != "")
      amt_to_pay = parseInt($(transaction_rows).eq(i).find('.each-payment').val().replace(/,/g, ''));
    total_pay += amt_to_pay;
  }
  if(!$('#credit-div').hasClass("d-none")) {
    var credit_pay = 0;
    if($('.credit-amount').val() != "") {
      credit_pay = parseInt($('.credit-amount').val().replace(/,/g, ''));
    }
    total_pay -= credit_pay;
  }
  $('#apply-amount').val(total_pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

  let apply_amt = 0;
  if($('#apply-amount').val() != "")
    apply_amt = parseInt($('#apply-amount').val().replace(/,/g, ''));
  $('#paid-amount').text($('#apply-amount').val());
  if($('.second-payment').hasClass("d-none")) {
    $('.payment-amount').val($('#apply-amount').val());
  } else {
    $('.payment-amount').val((apply_amt / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
}

function seperate_Value() {
  let apply_amt = 0;
  if($('#apply-amount').val() != "")
    apply_amt = parseInt($('#apply-amount').val().replace(/,/g, ''));
  if(currency_type == 2) {
    let ex_rate = $('.exchange-rate').val().replace(/,/g, '');
    $('#paid-amount').text((ex_rate * apply_amt).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  } else {
    $('#paid-amount').text($('#apply-amount').val());
  }
  if($('.second-payment').hasClass("d-none")) {
    $('.payment-amount').val($('#apply-amount').val());
  } else {
    $('.payment-amount').val((apply_amt / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  var transaction_rows = $('#products-table tbody>tr');
  $('.each-payment').val("");
  for(let i = 0; i < transaction_rows.length; i ++) {
    if(apply_amt == 0) break;
    let amt_to_pay = parseInt($(transaction_rows).eq(i).find('.balance-amount').text().replace(/,/g, ''));
    if(amt_to_pay > apply_amt) {
      amt_to_pay = apply_amt;
    }
    $(transaction_rows).eq(i).find('.each-payment').val(amt_to_pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    apply_amt -= amt_to_pay;
  }
}

function change_Currency_type() {
  if($('#select-currency').val() == "") return;
  if($('#select-currency').val().indexOf("LBP") >= 0 && payment_type == 2) {
    payment_type = 1;
    $('.payment-amount').parent().find('.currency-type').text("L£");
    $('#apply-amount').parent().find('.currency-type').text("L£");
    $('.each-payment').parent().find('.currency-type').text("L£");
    $('#paid-amount').parent().find('.currency-type').text("L£");
    change_Payment_value();
    calculate_Total();
    calculate_Outstanding();
  } else if($('#select-currency').val().indexOf("USD") >= 0 && payment_type == 1) {
    payment_type = 2;
    $('.payment-amount').parent().find('.currency-type').text("$");
    $('#apply-amount').parent().find('.currency-type').text("$");
    $('.each-payment').parent().find('.currency-type').text("$");
    $('#paid-amount').parent().find('.currency-type').text("$");
    change_Payment_value();
    calculate_Total();
    calculate_Outstanding();
  }
}

function change_Payment_value() {
  var transaction_rows = $('#products-table tbody>tr');
  let rate = parseInt($('.exchange-rate').val().replace(/,/g, ''));
  for(let i = 0; i < transaction_rows.length; i ++) {
    let amt_to_pay = 0;
    if($(transaction_rows).eq(i).find('.each-payment').val() != "")
      amt_to_pay = parseInt($(transaction_rows).eq(i).find('.each-payment').val().replace(/,/g, ''));
    if(payment_type == 2) {
      amt_to_pay /= rate;
    } else if(payment_type == 1) {
      amt_to_pay *= rate;
    }
    $(transaction_rows).eq(i).find('.each-payment').val(parseInt(amt_to_pay).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
}

function repayment_Value() {
  let amt_to_apply = parseInt($('#apply-amount').val().replace(/,/g, ''));
  if($('.payment-amount').eq(0).hasClass("focus-visible")) {
    let cur_value = parseInt($('.payment-amount').eq(0).val());
    $('.payment-amount').eq(1).val((amt_to_apply - cur_value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  } else if($('.payment-amount').eq(1).hasClass("focus-visible")) {
    let cur_value = parseInt($('.payment-amount').eq(1).val());
    $('.payment-amount').eq(0).val((amt_to_apply - cur_value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
}