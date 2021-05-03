$(document).ready(function () {
  $('footer .cancel').click(function() {
    $('#ghost .all-link')[0].click();
  });
  $('footer .count-pending').click(function() {
    $('#ghost .count-link')[0].click();
  });
  $('footer .count-progress').click(function() {
    $('#ghost .count-link')[0].click();
  });
  $('.print-label').click(function() {
    $('#ghost .print-link')[0].click();
  });
  $('footer .delete').click(function() {
    $('#delete-count-modal').modal("show");
  });
  $('#delete-count-modal .confirm').click(function() {
    $('#ghost .all-link')[0].click();
  });
  $('.edit').click(function() {
    $('#ghost .edit-link')[0].click();
  });
});

function add_product(item) {
  var add_item = `
  <tr>
    <td>
      <b>` + $(item).find('.composite-product-name').eq(0).text() + `</b><br>
      <span class="text-muted product-info">` + $(item).find('.composite-product-info').eq(0).text() + `</span>
    </td>
    <td class="text-right">5</td>
  `;
  $('#products-table tbody').append(add_item);
  $('.product_typeahead').typeahead('val','');
  event_format();
}
function return_integer(event) {
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44;
}
function event_format() {
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