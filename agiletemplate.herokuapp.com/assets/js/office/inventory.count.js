var product_name, product_info;
var added_product_cnt = 0;
var total_changed = 0; not_changed = 0;
$(document).ready(function () {
  unsavedManager(true, ['#content-body input', '#content-body select'], '');
  $('footer').hide();
  $('footer').removeClass('d-none');

  event_format();
  $('.stock-count').keypress(return_decimal);
  $('.add-count').click(function() {
    $('footer').slideDown();
    var table_rows = $('#products-table tbody>tr');
    for(let i = 0; i < table_rows.length; i ++) {
      if(product_name == table_rows.eq(i).find('.product-name').eq(0).text()) {
        var add_cnt = parseInt($('.stock-count').val() == "" ? 1 : $('.stock-count').val());
        var cur_stock = parseInt(table_rows.eq(i).find('.stock-qty').val() == "" ? 1 : table_rows.eq(i).find('.stock-qty').val());
        cur_stock += add_cnt;
        table_rows.eq(i).find('.stock-qty').val(cur_stock);
        $('.product_typeahead').typeahead('val','');
        return;
      }
    }
    var add_item = `
    <tr>
      <td>
        <b class="product-name">` + product_name + `</b><br>
        <span class="text-muted product-info">` + product_info + `</span>
      </td>
      <td class="text-center"><input type="text" class="form-control each stock-qty text-center" placeholder="1" value="` + $('.stock-count').val() + `"></td>
      <td class="text-right">
        <a class="text-danger delete-composite i-con-h-a">
          <i class="i-con i-con-trash"><i></i></i>
        </a>
      </td>
    </tr>
    `;
    $('#products-table tbody').append(add_item);
    $('.product_typeahead').typeahead('val','');
    $('.stock-count').val("1");
    $('.add-count').blur();
    added_product_cnt ++;
    event_format();
  });
  $('footer .save').click(function() {
    if(added_product_cnt == 1) $('.added-cnt').text(added_product_cnt + " product was");
    else $('.added-cnt').text(added_product_cnt + " products were");
    if(added_product_cnt > 0)
      $('#save-modal').modal("show");
    else {
      $('footer .save').attr("disabled", true);
      $('#ghost .progress-link')[0].click();
    }
  });
  $('.stock-qty').keydown(function() {
    $('footer').slideDown();
  });
  $('footer .save-complete').click(function() {
    total_changed = 0; not_changed = 0;
    var table_rows = $('#products-table tbody>tr');
    for(let i = 0; i < table_rows.length; i ++) {
      var stock_val = table_rows.eq(i).find('.stock-qty').eq(0).val();
      if(stock_val != "") {
        total_changed ++;
      } else {
        not_changed ++;
      }
    }
    if(total_changed == 0) $('.total-changed').parent().addClass("d-none");
    else $('.total-changed').parent().removeClass("d-none");
    if(total_changed == 1) $('.total-changed').text(total_changed + " product");      
    else $('.total-changed').text(total_changed + " products");
    if(not_changed == 0) $('.not-changed').parent().addClass("d-none");
    else $('.not-changed').parent().removeClass("d-none");
    if(not_changed == 1) $('.not-changed').text(not_changed + " product was");
    else $('.not-changed').text(not_changed + " products were");
    if(added_product_cnt == 0) $('.add-changed').parent().addClass("d-none");
    else $('.add-changed').parent().removeClass("d-none");
    if(added_product_cnt == 1) $('.add-changed').text(added_product_cnt + " product was");
    else $('.add-changed').text(added_product_cnt + " products were");
    $('#confirm-modal').modal("show");
  });
  $('#save-modal .confirm').click(function() {
    $('footer .save').attr("disabled", true);
    $('#ghost .progress-link')[0].click();
  });
  $('#confirm-modal .confirm').click(function() {
    $('footer .save').attr("disabled", true);
    $('#ghost .complete-link')[0].click();
  });
});

function add_product(item) {
  product_name = $(item).find('.composite-product-name').eq(0).text();
  product_info = $(item).find('.composite-product-info').eq(0).text();
}

function return_integer(event) {
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44;
}
function return_decimal(event) {
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44 || event.charCode == 190;
}

function event_format() {
  $('.stock-qty').keypress(return_decimal);
  $('.delete-composite').click(function() {
    $(this).parent().parent().remove();
    added_product_cnt --;
  });
}