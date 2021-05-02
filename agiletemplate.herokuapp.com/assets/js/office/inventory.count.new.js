$(document).ready(function () {
  unsavedManager(true, ['#content-body input', '#content-body select'], '');
  $('footer').hide();
  $('footer').removeClass("d-none");
  $('#select-store').change(function() {
    $('footer').slideDown();
    $('#search-div').removeClass("d-none");
    $('#products-table tbody').html("");
  });
  $('.notes').keydown(function() {
    $('footer').slideDown();
    if ($(this).val().length > 499) {
      ev.preventDefault();
    }
    $(this).parent().find('.length').text($(this).val().length + 1);
  });
  $('footer .save').click(function() {
    $(this).removeClass("save");
    $('#ghost .pending-link')[0].click();
  });
  $('footer .save-count').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .count-link')[0].click();
  });
  $('input[value="partial"]').click(function() {
    $('#products-div').removeClass("d-none");
    $('.add-buttons').removeClass("d-none");
    $('.explain').addClass("d-none");
    $('#products-table tbody').html("");
  });
  $('input[value="full-count"]').click(function() {
    $('#products-div').addClass("d-none");
    $('.add-buttons').addClass("d-none");
    $('.explain').removeClass("d-none");
    $('#products-table tbody').html("");
  });
});

function add_product(item) {
  var add_item = `
  <tr style="min-height: 63px; height:63px;">
    <td>
      <b>` + $(item).find('.composite-product-name').eq(0).text() + `</b><br>
      <span class="text-muted product-info">` + $(item).find('.composite-product-info').eq(0).text() + `</span>
    </td>
    <td class="text-right">5</td>
    <td class="text-right">
        <a class="text-danger delete-composite i-con-h-a">
          <i class="i-con i-con-trash"><i></i></i>
        </a>
    </td>
  </tr>
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
  $('.delete-composite').click(function() {
    $(this).parent().parent().remove();
  });
}