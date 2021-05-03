$(document).ready(function () {
  unsavedManager(true, ['#content-body input', '#content-body select'], '');
  $('footer').hide();
  $('footer').removeClass("d-none");
  $('#select-store').change(function() {
    $('footer').slideDown();
    $('#search-div').removeClass("d-none");
    $('#products-table tbody').html("");
  });
  $('#select-reason').change(function() {
    $('footer').slideDown();
    if($(this).val() == "IC") {
      $('.th-expected').removeClass("d-none");
      $('.th-counted').removeClass("d-none");
      $('.th-instock').addClass("d-none");
      $('.th-remove').addClass("d-none");
      $('.th-after').addClass("d-none");
      $('.after').addClass("d-none");
    }
    else {
      $('.th-expected').addClass("d-none");
      $('.th-counted').addClass("d-none");
      $('.th-instock').removeClass("d-none");
      $('.th-remove').removeClass("d-none");
      $('.th-after').removeClass("d-none");
      $('.after').removeClass("d-none");
    }
  });
  $('.notes').keydown(function() {
    $('footer').slideDown();
    if ($(this).val().length > 499) {
      ev.preventDefault();
    }
    $(this).parent().find('.length').text($(this).val().length + 1);
  });
  $('footer .cancel').click(function() {
    $('#page-leave-modal').modal("show");
  });
  $('footer .save').click(function() {
    $(this).removeClass("save");
    if($('#select-reason').val() == "IC") {
      $('#ghost .detail-link')[0].click();
    } else {
      $('#ghost .detail-link')[1].click();
    }
  });
});

function add_product(item) {
  var add_item = `
  <tr>
    <td>
      <b>` + $(item).find('.composite-product-name').eq(0).text() + `</b><br>
      <span class="text-muted product-info">` + $(item).find('.composite-product-info').eq(0).text() + `</span>
    </td>`;
  if($('#select-reason').val() == "IC") {
    add_item += `
    <td class="text-right">5</td>
    <td><input type="text" class="form-control each number-format text-right" placeholder="0"></td>
    <td class="text-right d-none after">5</td>
    <td class="text-right">
        <a class="text-danger delete-composite i-con-h-a">
          <i class="i-con i-con-trash"><i></i></i>
        </a>
    </td>
    </tr>
    `;
  } else {
    add_item += `
    <td class="text-right">5</td>
    <td><input type="text" class="form-control each number-format text-right" placeholder="0"></td>
    <td class="text-right after">5</td>
    <td class="text-right">
        <a class="text-danger delete-composite i-con-h-a">
          <i class="i-con i-con-trash"><i></i></i>
        </a>
    </td>
    </tr>
    `;
  }
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