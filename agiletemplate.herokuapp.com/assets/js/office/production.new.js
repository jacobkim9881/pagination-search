var main_item_cnt = 1;
$(document).ready(function() {
    unsavedManager(true, ['#content-body input', '#content-body select'], '');
    $('footer').hide();
    $('footer').removeClass("d-none");
    $('.production-date').fdatepicker({
        initialDate: '12-12-2020',
        format: 'M dd, yyyy',
        disableDblClickSelection: true,
        leftArrow: '<<',
        rightArrow: '>>',
    });
    $('.expiration-date').fdatepicker({
        initialDate: '12-12-2020',
        format: 'M dd, yyyy',
        disableDblClickSelection: true,
        leftArrow: '<<',
        rightArrow: '>>',
    });
    $('#select-location').change(function() {
        $('#products-div').removeClass("d-none");
        $('footer').slideDown();
    });
    $('footer .save').click(function() {
        $(this).attr("disabled", true);
        $('#ghost .details-link')[0].click();
    });
  
    $('.notes').keydown(function() {
      if ($(this).val().length > 499) {
        ev.preventDefault();
      }
      $(this).parent().find('.length').text($(this).val().length + 1);
    });
});
function add_product(item) {
    var add_item = `
    <tr>
        <td data-target=".group-of-rows-` + main_item_cnt + `" data-toggle="collapse"><i class="la la-angle-down accordion-toggle"></i></td>
        <td>
            <b>` + $(item).find('.composite-product-name').eq(0).text() + `</b><br>
            <span class="text-muted product-info">` + $(item).find('.composite-product-info').eq(0).text() + `</span>
        </td>
        <td class="text-right">10</td>
        <td class="text-right">L£ 10,000</td>
        <td>
            <input type="text" class="form-control number-format quantity each text-right" placeholder="0">
        </td>
        <td class="text-right">
            <a class="text-danger delete-composite i-con-h-a">
                <i class="i-con i-con-trash"><i></i></i>
            </a>
        </td>
        <tr class="demo out collapse group-of-rows-` + main_item_cnt + `" style="line-height: 25px;"> 
            <td class="subrow-dark" style="padding: 0 0.5rem"><div class="collapse group-of-rows-` + main_item_cnt + `"></div>
            </td>
            <td class="subrow-dark" style="padding: 0 1.25rem">
                <div class="collapse group-of-rows-` + main_item_cnt + ` d-flex flex-wrap">
                    <b class="w-100">Pineapple Cheese Cake</b>
                    <span class="text-muted product-info">SKU 10008 | 5280003102913 | VAT 11%</span>
                </div>
            </td>
            <td class="subrow-dark text-right" style="padding: 0 0.5rem"><div class="collapse group-of-rows-` + main_item_cnt + `">10</div></td>
            <td class="subrow-dark text-right" style="padding: 0 0.5rem"><div class="collapse group-of-rows-` + main_item_cnt + `">L£ 10,000</div></td>
            <td class="subrow-dark" style="padding: 0 0.5rem">
                <div class="collapse group-of-rows-` + main_item_cnt + `">
                    <input type="text" class="form-control number-format quantity each text-right" value="12.3" placeholder="0">
                </div>
            </td>
            <td class="subrow-dark" style="padding: 0 0.5rem">
                <div class="collapse group-of-rows-` + main_item_cnt + `">
                </div>
            </td>
        </tr>
        <tr class="demo out collapse group-of-rows-` + main_item_cnt + `" style="line-height: 25px;"> 
            <td class="subrow-dark" style="padding: 0 0.5rem"><div class="collapse group-of-rows-` + main_item_cnt + `"></div>
            </td>
            <td class="subrow-dark" style="padding: 0 1.25rem">
                <div class="collapse group-of-rows-` + main_item_cnt + ` d-flex flex-wrap">
                    <b class="w-100">Pineapple Cheese Cake</b>
                    <span class="text-muted product-info">SKU 10008 | 5280003102913 | VAT 11%</span>
                </div>
            </td>
            <td class="subrow-dark text-right" style="padding: 0 0.5rem"><div class="collapse group-of-rows-` + main_item_cnt + `">10</div></td>
            <td class="subrow-dark text-right" style="padding: 0 0.5rem"><div class="collapse group-of-rows-` + main_item_cnt + `">L£ 10,000</div></td>
            <td class="subrow-dark" style="padding: 0 0.5rem">
                <div class="collapse group-of-rows-` + main_item_cnt + `">
                    <input type="text" class="form-control number-format quantity each text-right" value="12" placeholder="0">
                </div>
            </td>
            <td class="subrow-dark" style="padding: 0 0.5rem">
                <div class="collapse group-of-rows-` + main_item_cnt + `">
                </div>
            </td>
        </tr>
    </tr>
    `;
    main_item_cnt ++;
    $('#products-table tbody').append(add_item);
    $('.po_typeahead').typeahead('val','');
    event_format();
  }
  function return_decimal(event) {
    return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44 || event.charCode == 190;
  }
  function return_integer(event) {
    return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44;
  }
  function event_format() {
    $(".each").off("keypress");
    $(".each").keypress(return_decimal);
    $(".number-format").on('keyup', function (e) {
      if(e.keyCode == 65 || e.keyCode == 17) {
        return;
      }
      $(this).val($(this).val().replace(/,/g, ''));
      $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    });
    $('.number-format').on('click', function () {
        console.log('click');
        $(this).select();
    });
    $('.delete-composite').click(function() {
        if($(this).parent().hasClass("collapse")) {
            var main_row = $(this).parent().parent().parent().prev();
            while($(main_row).hasClass("demo")) {
                main_row = $(main_row).prev();
            }
            $(this).parent().parent().parent().remove();
            var search_row = $(main_row).next();
            let subrow_cnt = 0;
            while($(search_row).hasClass("demo")) {
                subrow_cnt ++;
                search_row = $(search_row).next();
            } 
            if(subrow_cnt == 0) $(main_row).remove();
        }
        else {
            var cls_name = $(this).parent().parent().find('td').eq(0).attr("data-target");
            $('tr' + cls_name).remove();
            $(this).parent().parent().remove();
        }
    });
    $('td[data-toggle="collapse"]').off("click");
    $('td[data-toggle="collapse"]').click(function (ev) {
        var obj = $(this).find('i').eq(0);
        if (obj.hasClass('la-angle-up')) {
            obj.removeClass('la-angle-up');
            obj.addClass('la-angle-down');
        } else {
            obj.addClass('la-angle-up');
            obj.removeClass('la-angle-down');
        }
    });
}