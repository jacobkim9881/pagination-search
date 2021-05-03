var time_type = "start";
var customer_type = "buy";
var change_text_cnt = 0;
$(document).ready(function() {
    unsavedManager(true, ['#content-body input', '#content-body select'], '');
    $('footer').hide();
    $('footer').removeClass("d-none");
    window.onscroll = function() {myFunction()};
    function myFunction() {
        if (window.pageYOffset >= 72) {
            var parentWidth = $('.info-parent').width();
            $('#info-card').addClass("sticky_top");
            $('#info-card').width(parentWidth);
        } else {
            $('#info-card').removeClass("sticky_top");
        }
    }
    $(window).resize(function() {
        var parentWidth = $('.info-parent').width();
        $('#info-card').width(parentWidth);
    });
    $('.start-date').fdatepicker({
        initialDate: '2-27-2021',
        format: 'M d, yyyy',
        disableDblClickSelection: true,
        leftArrow: '<<',
        rightArrow: '>>',
    });  
    $('.end-date').fdatepicker({
        initialDate: '2-27-2020',
        format: 'M d, yyyy',
        disableDblClickSelection: true,
        leftArrow: '<<',
        rightArrow: '>>',
    });
    $('footer .save').click(function() {
        $(this).attr("disabled", true);
        notification($('#discount-name').val() + " automatic discount added successfully.");
        $('#ghost .all-link')[0].click();
    });
    $('#discount-name').on('keyup', function() {change_Discount_name(this);});
    $('input[type="radio"]').on('click', function() {change_Discount_type(this);});
    $('#show-end-date').on('click', function() {show_Enddate(this);});
    $('#show-maximum-uses').on('click', function() {show_Maximum_uses(this);});
    $('input[type="checkbox"]').on('click', function() {change_Limit_number(this)});
    $('.product_typeahead').eq(1).on('click', function() {customer_type = "buy";});
    $('.category_typeahead').eq(1).on('click', function() {customer_type = "buy";});
    $('.product_typeahead').eq(2).on('click', function() {customer_type = "get";});
    $('.category_typeahead').eq(2).on('click', function() {customer_type = "get";});
    $('#buy-select-from').on('change', function() {customer_type = "buy"; change_From_table(this);});
    $('#get-select-from').on('change', function() {change_From_table(this);});
    $('.purchase-amount').on('keyup', function() {change_Minimum_requirements_text(this);});
    $('.quantity-amount').on('keyup', function() {change_Minimum_requirements_text(this);});
    $('.discount-percent').on('keyup', function() {change_Discount_value_text();});
    $('#show-end-date').on('click', function() {change_Date();});
    $('.discount-lbp').on('keyup', function() {change_Discount_value_text();});
    $('.start-date').on('change', function() {change_Date();});
    $('.end-date').on('change', function() {change_Date();});
    $('.start-flag').on('change', function() {change_Date();});
    $('.end-flag').on('change', function() {change_Date();});
    $('.start-time-select').on('change', function () {change_Date();});
    $('.end-time-select').on('change', function () {change_Date();});
    $('.buy-quantity').on('keyup', function() {change_buy_get_text();});
    $('.buy-amount').on('keyup', function() {change_buy_get_text();});
    $('.get-amount').on('keyup', function() {change_buy_get_text();});
    $('.discounted-percentage').on('keyup', function() {change_buy_get_text();});
    $('.max-uses').on('keyup', function() {change_buy_get_text();});
    setTimeout(() => {
        setTime();        
    }, 800);
    event_format();
});

function setTime() {
    var today = new Date().toLocaleDateString().split('/');
    var time = new Date().toLocaleTimeString().split(':');
    var hour;
    if (time[0] * 1 > 12) {
        hour = time[0] * 1 - 12;
    } else {
        hour = time[0] * 1;
    }
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', ' Oct', 'Nov', 'Dec'];
    $('.start-date').val(month[today[0] - 1] + ' ' + today[1] + ', ' + today[2]);
    $('#start-time').attr("data-placeholder", hour + ":" + time[1]);
    $('#end-time').attr("data-placeholder", hour + ":" + time[1]);
    if (time[0] * 1 > 12) {
        $('.start-flag').prop('selectedIndex', 1);
        $('.end-flag').prop('selectedIndex', 1);
    } else {
        $('.start-flag').prop('selectedIndex', 0);
        $('.end-flag').prop('selectedIndex', 0);
    }
    $('#select2-start-time-container').text(hour + ":" + time[1]);
    $('#select2-end-time-container').text(hour + ":" + time[1]);
}
function setEndTime() {
    if(time_type == "end") return;
    $('#select2-end-time-container').text("11:59");
    if($('.end-date').val() < $('.start-date').val())
        $('.end-date').val($('.start-date').val());
    $('.end-flag').val("PM");
}
function update_default_text() {
    calculate_Change_cnt();
    if(change_text_cnt > 1) {
        $('.non-info').addClass("d-none");
        $('.default-text').removeClass("d-none");
    } else if(change_text_cnt == 1) {
        $('.non-info').removeClass("d-none");
        $('.default-text').addClass("d-none");
    }
}
function calculate_Change_cnt() {
    change_text_cnt = 0;
    if($('.discount-name').text() != "") change_text_cnt = 1;
    let texts = $('.summary-text li');
    for(let i in texts) {
        if(texts.eq(i).find('span').text() != "") change_text_cnt ++;
    }
}
function change_Date() {
    setEndTime();
    calculate_Change_cnt();
    if($('input[name="discount-type"][value="buy"]').prop("checked") && change_text_cnt == 1) {
        $('.start-date-text').text("");
        return; 
    }
    if($('input[name="discount-type"][value="percentage"]').prop("checked") && $('.discount-percent').val() == "") {
        $('.start-date-text').text("");
        return; 
    }
    if($('input[name="discount-type"][value="fixed"]').prop("checked") && $('.discount-lbp').val() == "") {
        $('.start-date-text').text("");
        return; 
    }
    let start_date = $('.start-date').val().replace(/,/g, '');
    let end_date = $('.end-date').val().replace(/,/g, '');
    let cur_date = $('.start-date').val().replace(/,/g, '').split(' ');
    if(parseInt(cur_date[1]) < 10) cur_date[1] = "0" + cur_date[1];
    let str_Date = cur_date[0] + " " + cur_date[1] + " " + cur_date[2];
    if((new Date()).toString().indexOf(str_Date >= 0))
    {
        if($('#show-end-date').prop("checked")) {
            if($('.start-date').val() == $('.end-date').val()) {
                $('.start-date-text').text("Active from today at " + $('#select2-start-time-container').text() + " " + $('.start-flag').val() + " to " + $('#select2-end-time-container').text() + " " + $('.end-flag').val());        
            } else {
                $('.start-date-text').text("Active from today at " + $('#select2-start-time-container').text() + " " + $('.start-flag').val() + " to " + end_date.substring(0, end_date.length - 4) + " at " + $('#select2-end-time-container').text() + " " + $('.end-flag').val());    
            }
        }
        else
            $('.start-date-text').text("Active from today at " + $('#select2-start-time-container').text() + " " + $('.start-flag').val());
    } else {
        if($('#show-end-date').prop("checked")) {
            if($('.start-date').val() == $('.end-date').val()) {
                $('.start-date-text').text("Active from " + start_date.substring(0, start_date.length - 4) + " at " + $('#select2-start-time-container').text() + " " + $('.start-flag').val() + " to " + $('#select2-end-time-container').text() + " " + $('.end-flag').val());    
            } else {
                $('.start-date-text').text("Active from " + start_date.substring(0, start_date.length - 4) + " at " + $('#select2-start-time-container').text() + " " + $('.start-flag').val() + " to " + end_date.substring(0, end_date.length - 4) + " at " + $('#select2-end-time-container').text() + " " + $('.end-flag').val());    
            }
        }
        else
            $('.start-date-text').text("Active from " + start_date.substring(0, start_date.length - 4) + " at " + $('#select2-start-time-container').text() + " " + $('.start-flag').val());
    }
}
function change_Discount_value_text() {
    $('.discount-value-text').css("white-space", "inherit");
    if($('input[name="discount-type"][value="percentage"]').prop("checked")) {
        if($('.discount-percent').val() == "") {
            $('.discount-value-text').text("");
            $('.customer-eligibility-text').text("");
        }
        else {
            let discount_text = $('.discount-percent').val() + "% off ";
            if($('input[name="apply-to"][value="order"]').prop("checked")) $('.discount-value-text').text(discount_text + "all products");
            else if($('input[name="apply-to"][value="categories"]').prop("checked")) {
                let rows_cnt = $('#category-search-div').eq(0).find('tbody>tr').length;
                if(rows_cnt == 0)
                    $('.discount-value-text').text(discount_text + "specific categories");
                else if(rows_cnt == 1)
                    $('.discount-value-text').text(discount_text + $('#category-search-div').eq(0).find('tbody>tr').eq(0).find('td').eq(0).text());
                else $('.discount-value-text').text(discount_text + rows_cnt + " categories");
            }
            else if($('input[name="apply-to"][value="products"]').prop("checked")) {
                let rows_cnt = $('#products-search-div').eq(0).find('tbody>tr').length;
                if(rows_cnt == 0)
                    $('.discount-value-text').text(discount_text + "specific products");
                else if(rows_cnt == 1)
                    $('.discount-value-text').text(discount_text + $('#products-search-div').eq(0).find('tbody>tr').eq(0).find('td').eq(0).find('b').text());
                else $('.discount-value-text').text(discount_text + rows_cnt + " products");
            }
        }
    } else if($('input[name="discount-type"][value="fixed"]').prop("checked")) {
        if($('.discount-lbp').val() == "") {
            $('.discount-value-text').text("");
            $('.customer-eligibility-text').text("");
        }
        else {
            let discount_text = "LBP " + $('.discount-lbp').val().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " off ";
            if($('input[name="apply-to"][value="order"]').prop("checked")) $('.discount-value-text').text(discount_text + "all products");
            else if($('input[name="apply-to"][value="categories"]').prop("checked")) {
                let rows_cnt = $('#category-search-div').eq(0).find('tbody>tr').length;
                if(rows_cnt == 0)
                    $('.discount-value-text').text(discount_text + "specific categories");
                else if(rows_cnt == 1)
                    $('.discount-value-text').text(discount_text + $('#category-search-div').eq(0).find('tbody>tr').eq(0).find('td').eq(0).text());
                else $('.discount-value-text').text(discount_text + rows_cnt + " categories");
            }
            else if($('input[name="apply-to"][value="products"]').prop("checked")) {
                let rows_cnt = $('#products-search-div').eq(0).find('tbody>tr').length;
                if(rows_cnt == 0)
                    $('.discount-value-text').text(discount_text + "specific products");
                else if(rows_cnt == 1)
                    $('.discount-value-text').text(discount_text + $('#products-search-div').eq(0).find('tbody>tr').eq(0).find('td').eq(0).find('b').text());
                else $('.discount-value-text').text(discount_text + rows_cnt + " products");
            }
        }
    } else {
        $('.discount-value-text').css("white-space", "pre-line");
        $('.discount-value-text').text("");
        $('.customer-eligibility-text').text("");
        $('.start-date-text').text("");
        change_buy_get_text();
    }
    change_Date();
    update_default_text();
}
function change_Minimum_requirements_text(ev) {
    if($(ev).val() == "") $('.minimum-requirements-text').text("");
    else if($(ev).val() == "none") $('.minimum-requirements-text').text("");
    else {
        if($(ev).parent().parent().attr("id") == "purchase-amount-div")
            $('.minimum-requirements-text').text("Minimum purchase of LBP " + $('.purchase-amount').val().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        else if($(ev).parent().parent().attr("id") == "quantity-amount-div") {
            if($(ev).val() == "1") $('.minimum-requirements-text').text("Minimum purchase of " + $(ev).val() + " item");
            else $('.minimum-requirements-text').text("Minimum purchase of " + $(ev).val().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " items");
        }
    }
    update_default_text();
}
function change_Discount_name(ev) {
    $('.discount-name').text($(ev).val());
    update_default_text();
}
function change_Discount_type(ev) {
    if($(ev).attr("name") == "apply-to") {
        if($(ev).val() == "categories") {
            $('#category-search-div').removeClass("d-none");
            $('#products-search-div').addClass("d-none");
            $('.apply-text').text("Applies only to selected categories");
        }
        else if($(ev).val() == "products") {
            $('#category-search-div').addClass("d-none");
            $('#products-search-div').removeClass("d-none");
            $('.apply-text').text("Applies only to selected products");
        } else {
            $('#category-search-div').addClass("d-none");
            $('#products-search-div').addClass("d-none");
            $('.apply-text').text("Applies to all products");
        }
        change_Discount_value_text();
    } else if($(ev).attr("name") == "requirements") {
        if($(ev).val() == "purchase") {
            $('#purchase-amount-div').removeClass("d-none");
            $('#quantity-amount-div').addClass("d-none");
            change_Minimum_requirements_text($(ev).parent().parent().find('.purchase-amount'));
        }
        else if($(ev).val() == "quantity") {
            $('#purchase-amount-div').addClass("d-none");
            $('#quantity-amount-div').removeClass("d-none");
            change_Minimum_requirements_text($(ev).parent().parent().find('.quantity-amount'));
        } else {
            $('#purchase-amount-div').addClass("d-none");
            $('#quantity-amount-div').addClass("d-none");
            change_Minimum_requirements_text(ev);
        }
    } else if($(ev).attr("name") == "discount-type") {
        if($(ev).val() == "percentage") {
            $('#value-card').removeClass("d-none");
            $('#buy-card').addClass("d-none");
            $('#requirement-card').removeClass("d-none");
            $('#discount-percentage').removeClass("d-none");
            $('#discount-fixed').addClass("d-none");
        } else if($(ev).val() == "fixed") {
            $('#value-card').removeClass("d-none");
            $('#buy-card').addClass("d-none");
            $('#requirement-card').removeClass("d-none");
            $('#discount-percentage').addClass("d-none");
            $('#discount-fixed').removeClass("d-none");
        } else if($(ev).val() == "buy") {
            $('#value-card').addClass("d-none");
            $('#buy-card').removeClass("d-none");
            $('#requirement-card').addClass("d-none");
            change_buy_get_text();
        }
        change_Discount_value_text();
    } else if($(ev).attr("name") == "discounted-value") {
        if($(ev).val() == "percentage") {
            $('#discount-precentage').removeClass("d-none");
        } else if($(ev).val() == "free") {
            $('#discount-precentage').addClass("d-none");
        }
        change_buy_get_text();
    } else if($(ev).attr("name") == "customer") {
        if($(ev).val() == "purchase") {
            $('.x-text').text("Customer spends");
            $('#buy-discount-percentage .quantity-div').addClass("d-none");
            $('#buy-discount-percentage .amount-div').removeClass("d-none");
        } else if($(ev).val() == "quantity") {
            $('.x-text').text("Customer buy");
            $('#buy-discount-percentage .quantity-div').removeClass("d-none");
            $('#buy-discount-percentage .amount-div').addClass("d-none");
        }
        change_buy_get_text();
    }
}
function change_buy_get_text() {
    $('.discount-value-text').text("");
    $('.customer-eligibility-text').text("");
    $('.start-date-text').text("");
    update_default_text();
    if($('input[name="customer"][value="quantity"]').prop("checked"))
        if($('.buy-quantity').val() == "") return;
    if($('input[name="customer"][value="purchase"]').prop("checked"))
        if($('.buy-amount').val() == "") return;
    if($('.get-amount').val() == "") return;
    if($('input[name="discounted-value"][value="percentage"]').prop("checked"))
        if($('.discounted-percentage').val() == "") return;
    let result_text = "";
    if($('input[name="customer"][value="quantity"]').prop("checked")) {
        if($('.buy-quantity').val() == "1") result_text += "Buy 1 item\n";
        else result_text += "Buy " + $('.buy-quantity').val().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " items\n";
    } else {
        result_text += "Spend LBP " + $('.buy-amount').val().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "\n";
    }
    if($('.get-amount').val() == "1") result_text += "Get 1 item ";
    else result_text += "Get " + $('.get-amount').val() + " items ";
    if($('input[name="discounted-value"][value="percentage"]').prop("checked"))
        result_text += "at " + $('.discounted-percentage').val() + "% off\n";
    else result_text += "free";
    if($('#show-maximum-uses').prop("checked")) {
        if($('.max-uses').val() == "") {}
        else if($('.max-uses').val() == "1") result_text += "1 use per order";
        else result_text += $('.max-uses').val() + " uses per order";
    }
    $('.discount-value-text').text(result_text);
    change_Date();
    update_default_text();
}
function add_category(item) {
    var add_item = `
    <tr class="border-bottom">
      <td>
        <b>` + $(item).find('.category-name').eq(0).text() + `</b>
      </td>
      <td class="text-right">
        <a class="text-danger delete-composite i-con-h-a">
          <i class="i-con i-con-trash"><i></i></i>
        </a>
      </td>
    </tr>
    `;
    if($('input[value="buy"]').prop("checked")) {
        if(customer_type == "buy") {
            $('.buy-category-search-div').find('#category-table tbody').append(add_item);
        }
        else if(customer_type == "get") {
            $('.get-category-search-div').find('#category-table tbody').append(add_item);
        }
    }
    else {
        $('#category-table tbody').append(add_item);
        change_Discount_value_text();
    }
    $('.category_typeahead').typeahead('val','');
    event_format();
}
function add_product(item) {
    var add_item = `
    <tr class="border-bottom">
      <td>
        <b>` + $(item).find('.composite-product-name').eq(0).text() + `</b><br>
        <span class="product-info text-muted">` + $(item).find('.composite-product-info').eq(0).text() + `</span>
      </td>
      <td class="text-right">
        <a class="text-danger delete-composite i-con-h-a">
          <i class="i-con i-con-trash"><i></i></i>
        </a>
      </td>
    </tr>
    `;
    if($('input[value="buy"]').prop("checked")) {
        if(customer_type == "buy") {
            $('.buy-products-search-div').find('#products-table tbody').append(add_item);
        }
        else if(customer_type == "get") {
            $('.get-products-search-div').find('#products-table tbody').append(add_item);
        }
    }
    else {
        $('#products-table tbody').append(add_item);
        change_Discount_value_text();
    }
    $('.product_typeahead').typeahead('val','');
    event_format();
}
function return_decimal(event) {
    return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44 || event.charCode == 190;
}
function return_integer(event) {
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44;
}
function event_format() {
    $('.delete-composite').click(function() {
        $(this).parent().parent().remove();
        change_Discount_value_text();
    });
  
    $(".weight").off("keypress");
    $(".weight").keypress(return_decimal);
    $(".each").off("keypress");
    $(".each").keypress(return_integer);
    $(".number-format").on('keyup', function (e) {
        if(e.keyCode == 65 || e.keyCode == 17) {
            return;
        }
        $(this).val($(this).val().replace(/,/g, ''));
        $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    });
}
function add_employee(item) {
    var add_item = `
    <tr class="border-bottom">
      <td>
        <b>` + $(item).find('.employee-name').eq(0).text() + `</b><br>
        <span class="product-info text-muted">` + $(item).find('.employee-type').eq(0).text() + `
      </td>
      <td class="text-right">
        <a class="text-danger delete-composite i-con-h-a">
          <i class="i-con i-con-trash"><i></i></i>
        </a>
      </td>
    </tr>
    `;
    $('#employee-table tbody').append(add_item);
    $('.employee_typeahead').typeahead('val','');
    change_Discount_value_text();
    event_format();
}
function add_customer(item) {
    var add_item = `
    <tr class="border-bottom">
      <td>
        <b>` + $(item).find('.customer-name').eq(0).text() + `</b><br>
        <span class="product-info text-muted">` + $(item).find('.customer-type').eq(0).text() + `
      </td>
      <td class="text-right">
        <a class="text-danger delete-composite i-con-h-a">
          <i class="i-con i-con-trash"><i></i></i>
        </a>
      </td>
    </tr>
    `;
    $('#customer-table tbody').append(add_item);
    $('.customer_typeahead').typeahead('val','');
    change_Discount_value_text();
    event_format();
}
function show_Enddate(ev) {
    setEndTime();
    if($(ev).prop("checked")) $('#end-date-div').removeClass("d-none");
    else $('#end-date-div').addClass("d-none");
}
function show_Maximum_uses(ev) {
    if($(ev).prop("checked")) $('#maximum-uses').removeClass("d-none");
    else $('#maximum-uses').addClass("d-none");
    change_buy_get_text();
}
function change_From_table(ev) {
    if($(ev).attr("id") == "buy-select-from") {
        if($('#buy-select-from').val() == 0) {
            $('.buy-category-search-div').removeClass("d-none");
            $('.buy-products-search-div').addClass("d-none");
        } else {
            $('.buy-category-search-div').addClass("d-none");
            $('.buy-products-search-div').removeClass("d-none");
        }
    } else if($(ev).attr("id") == "get-select-from") {
        if($('#get-select-from').val() == 0) {
            $('.get-category-search-div').addClass("d-none");
            $('.get-products-search-div').removeClass("d-none");
        } else {
            $('.get-category-search-div').removeClass("d-none");
            $('.get-products-search-div').addClass("d-none");
        }
    }
}
$(document).on('keyup', '.select2-search__field', function (e) {
    if(time_type == "start") {
        $('#select2-start-time-container').text($('.select2-search__field').val());
        if($('#select2-start-time-container').text().length == 5) {
          var curtime = "";
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
        }
    } else if(time_type == "end") {
        $('#select2-end-time-container').text($('.select2-search__field').val());
        if($('#select2-end-time-container').text().length == 5) {
          var curtime = "";
          if($('#select2-end-time-container').text().substr(0,2) > "12") {
            curtime = "11";
          }
          else {
            curtime = $('#select2-end-time-container').text().substr(0,2);
          }
          if($('#select2-end-time-container').text().substr(3,2) > "59") {
            curtime = curtime + ":59";
          }
          else {
            curtime = curtime + ":" + $('#select2-end-time-container').text().substr(3,2);
          }
          $('#select2-end-time-container').text(curtime);
          $('.select2-search__field').val(curtime);
        }
    }
    change_Date();
});
$(document).on('click', '.select2-selection', function (ev) {
    $('.select2-search__field').mask('99:99');
    if($(ev.target).attr("id") == "select2-start-time-container") {time_type = "start";}
    else if($(ev.target).attr("id") == "select2-end-time-container") {time_type = "end";}
    change_Date();
});