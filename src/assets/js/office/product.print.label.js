$(document).ready(function () {
  unsavedManager(true, ['#content-body input', '#content-body select'], '');

  $('footer').slideDown();
  $('#content-body').change(function () {
    $('footer').slideDown();
  });
  $('footer').show();
  $('footer .cancel').click(function () {
    $('input[type="number"]').val('25');
    $('.product_typeahead').val('');
    $('#content').find(':checkbox').eq(0).prop('checked', true);
    $('#content').find(':checkbox').eq(1).prop('checked', true);
    // back();
  });
  $('footer .save').click(function () {
    // back();
    // notification($(this).attr('title'));
  });

  $('#content-body').on('click', '.product-delete', function () {
    var index = $('tr').index($(this).closest('tr'));
    $(this).closest('tr').remove();
    $('.print-item').eq(index - 1).remove();
    if($('.print-item').length == 0) {
      $('.no-item').addClass("d-flex");
      $('.no-item').removeClass("d-none");
    } else {
      $('.no-item').removeClass("d-flex");
      $('.no-item').addClass("d-none");
    }
  });

  $('.add-product').click(function () {
    $('.product_typeahead').typeahead('val','');
    $('.product-table table tbody').append(tr_html);
    $('.print-items').append(print_html);
    event_format();
  });
  $('#switch-print-name').change(function () {
    if($(this).prop("checked")) {
      $('.bg-dark').removeClass("d-none");
      $('.label-name').css('visibility', 'visible');
    } else {
      $('.bg-dark').addClass("d-none");
      $('.label-name').css('visibility', 'hidden');
    }
    $('.label-print-name').toggleClass('text-black');
    $('.description').toggleClass('text-muted');
  });

  $('#switch-print-price').change(function () {
    $('.label-price').toggleClass("text-white");
    $('.label-print-price').toggleClass('text-dark');
    $('.description').toggleClass('text-muted');
  });
  $('.Barcode-Sku').change(function () {
    if ($(this).val() == 3) {
      $('footer .save').attr('disabled', true);
      $('.label-sku').css("visibility", "hidden");
      $('.label-barcode').css("visibility", "hidden");
      $('.img-barcode').css("visibility", "hidden");
    }
    else if ($(this).val() == 2) {
      $('footer .save').attr('disabled', false);
      $('.label-barcode').css("visibility", "hidden");
      $('.img-barcode').css("visibility", "hidden");
      $('.label-sku').css("visibility", "visible");
    }
    else if ($(this).val() == 1) {
      $('footer .save').attr('disabled', false);
      $('.img-barcode').css("visibility", "visible");
      $('.label-barcode').css("visibility", "visible");
      $('.label-sku').css("visibility", "hidden");
    }
    else if ($(this).val() == 0) {
      $('footer .save').attr('disabled', false);
      $('.label-sku').css("visibility", "visible");
      $('.label-barcode').css("visibility", "visible");
      $('.img-barcode').css("visibility", "visible");
    }
  });

  $('#back-title').text($('#ghost .title-item-name').text());
  $('#back-title').parent().attr("href", $('#ghost .back-url').text());

  $(document).on('scroll', function() {
    $('#sub-title').addClass("sticky-title");
    $('#content-aside').addClass("sticky-aside");
    $('#back-link-sticky').addClass("sticky-back-link");
  });

  $('#content-body').on('keyup', '.product_typeahead', function (e) {
    if (e.keyCode == 13) {
      $('.product-table table tbody').append(tr_html);
      $('.product_typeahead').typeahead('val','');
    }
  });
  setTimeout(() => {
    event_format()
  }, 1000);
});
function add_product(item) {
  if(!$('#add-category-modal').hasClass('show') && !$('#add-supplier-modal').hasClass('show')) {
    $('.product_typeahead').typeahead('val','');
    tr_html = `
    <tr>
        <td >
            <span class="font-weight-bold">` + $(item).find('.composite-product-name').eq(0).text() + `</span><br>
            <span class="text-muted product-info" style="font-size: 0.65rem;">` + $(item).find('.composite-product-info').eq(0).text() + `</span>
        </td>
        <td class="text-right"><span>1,000</span></td>
        <td class="text-right">
            <input type="number" class="form-control text-right w-80 float-right" value="1" placeholder="0">
        </td>
        <td class="text-right">
            <a class="text-danger i-con-h-a product-delete">
              <i class="mr-2 i-con i-con-trash" style="margin-right: -10px !important;"><i></i></i>
            </a>
        </td>
      </tr>`;
    $('.product-table table tbody').append(tr_html);
    var info_text = $(item).find('.composite-product-info').eq(0).text();
    var sku_text = info_text.substring(0, info_text.indexOf(" | "));
    info_text = info_text.substring(info_text.indexOf(" | ") + 3);
    var barcode_text = info_text.substring(0, info_text.indexOf(" | "));
    print_html =  `
    <div class="print-item">
        <div class="col-md-12 text-center mt-2 mb-0">
            <span class="text-center text-dark">(28 mm × 89 mm) × <span class="number-of-copies">1</span> copies</span>
        </div>
        <div class="card m-3 mt-0" style="border:1px solid; height: 196px;">
            <div class="card-body text-center p-0">
                <div class="d-flex align-items-center justify-content-between flex-wrap" style="height: 130px;">
                    <div class="card-header bg-dark text-white text-center w-100" style="border-bottom:1px solid; ">
                        <span class="text-center text-white label-name" style="font-size: 22px;">` + $(item).find('.composite-product-name').eq(0).text() + `</span>
                    </div>
                    <span class="text-center text-dark label-price w-100" style="font-size: 50px; font-weight: bold;">L£ 1,000</span>
                </div>
                <div class="row" style="height: 66px;">
                    <div class="col-md-7 text-center">
                        <img src="../assets/img/logo/System-logo.svg" class="w-100 ml-3" height="100%" alt="">
                    </div>
                    <div class="col-md-5 text-center">
                        <span class="text-center label-sku" style="font-size: 0.65rem;">` + sku_text + `</span>
                        <div class="text-center pl-2 w-10 d-flex img-barcode">
                          <img src="../assets/img/barcode.svg" class="text-center label-barcode" style="width: 30%; height: 10%;">
                          <img src="../assets/img/barcode.svg" class="text-center label-barcode" style="width: 30%; height: 10%;">
                          <img src="../assets/img/barcode.svg" class="text-center label-barcode" style="width: 30%; height: 10%;">
                        </div>
                        <span class="text-center label-barcode" style="font-size: 0.65rem;">` + barcode_text + `</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    $('.print-items').append(print_html);
    event_format();
  }
}

function event_format() {
  $('input[type="number"]').mask("99");
  $('input[type="number"]').on('keyup', function() {
    var index = $('input[type="number"]').index($(this));
    // var value = String($(this).val() * 1000);
    // $('.label-price').eq(index).text("L£ " + value.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('.number-of-copies').eq(index).text($(this).val());
  });
  $('#custom-search-box-category').keyup(function () {
      var rex = new RegExp($(this).val(), 'i');
      $('.category_searchable tr').hide();
      $('.category_searchable tr').filter(function () {
          return rex.test($(this).text());
      }).show();
  });
  $('#custom-search-box-supplier').keyup(function () {
      var rex = new RegExp($(this).val(), 'i');
      $('.supplier_searchable tr').hide();
      $('.supplier_searchable tr').filter(function () {
          return rex.test($(this).text());
      }).show();
  });
  $('.product_typeahead.tt-input').on('keyup', function(e) {
    console.log($(window).height() - $(this).offset().top);
    console.log($(".dropdown-menu", $(e.target).parent()).height());
    if(($(window).height() - $(this).offset().top - 70) < $(".dropdown-menu", $(e.target).parent()).height()) {
      $(".dropdown-menu", $(e.target).parent()).css('margin-top', `calc(calc(${ $(".dropdown-menu", $(e.target).parent()).height()}px + 50px) * -1)`);
    } else {
      $(".dropdown-menu", $(e.target).parent()).css('margin-top', `5px`);
    }
  });
}