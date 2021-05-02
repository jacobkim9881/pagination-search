var value_type = 1;
var add_variant_visable = 2;
var edit_variant_visible = 2;
var varients_data = [];
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  if($('#ghost .title-item-name').text()) {
    $('#title').text("Edit " + $('#ghost .title-item-name').text());
  } else $('#title').text("Edit Dairy Khoury Ayran 250g");
  unsavedManager(true, ['#content-body input', '#content-body select'], '');
  $('footer').slideDown();
  event_format();
  new Tags(document.getElementById('variant-tags1'));
  new Tags(document.getElementById('variant-tags2'));
  new Tags(document.getElementById('variant-tags3'));
  $('#vat-id-number').mask('999999-999');
  $('.mobile').mask('99 999 999');
  $('#import-start').click(function () {
    $('.carousel-item').removeClass('active').eq(0).addClass('active');
  });
  $('#import-supplier-start').click(function () {
      var percent = 0;
      setInterval(function () {
          percent < 100 ? percent++ : '';
          $('.progress-bar').css('width', percent + '%');
          $('.progress-bar-percent').text(percent + '% complete');
      }, 50);
  });
  $('.select2-multiple').select2({ tags: true, tokenSeparators: [','] });
  $('#supplier_name').select2().on('select2:open', function () {
    let select2 = $(this).data('select2');
    if (!$('.supplier-select2-link').length) {
      select2.$results.parents('.select2-results')
        .prepend('<button class="btn w-sm mb-1 supplier-select2-link bg-primary-lt w-100">Add new supplier</button>')
        .on('click', function (b) {
          $('#supplier-add-modal').modal('show');
          $('#supplier_name').select2('close');
        });
    }
  });
  $('#category_name').select2().on('select2:open', function () {
    let select2 = $(this).data('select2');
    if (!$('.category-select2-link').length) {
      select2.$results.parents('.select2-results')
        .prepend('<button class="btn w-sm mb-1 category-select2-link bg-primary-lt w-100">Add new Category</button>')
        .on('click', function (b) {
          $('#add-category-modal').modal('show');
          $('#category_name').select2('close');
        });
    }
  });
  $('#sub-category').select2();

  $('#composite-switch').change(function () {
    $(this).closest('div').find('.font-weight-bold').toggleClass('text-black');
    $(this).closest('div').find('.description').toggleClass('text-muted');
    if ($(this).prop('checked')) {
      $('#add-variant').hide();
      $('.text-varient').text('Composite products cannot have variants');
      $('#composite-section').removeClass('d-none');
      $('#div-default-purchase-cost').addClass('d-none');
      $('#supplier_name').select2().next().hide();
      $('#composite-supplier-name').removeClass('d-none');
      $('#txt-composite-cost').html('Calculated as the sum of cost of components');
      $('#txt-product-for-sale').text('Product for sale');
      $('#variant-table').hide();
      console.log($('.ability-table tr').eq(2).children().eq(1).html());
      if($(window).width() < 770) {
        $('#ability-table').html(`
          <table class="table table-borderless ability_table" id="table" data-detail-view="false" data-mobile-responsive="true" style="margin-top: 0px;">
              <thead style="display: none;">
                <tr>
                <th style="" data-field="0"><div class="th-inner ">Available</div><div class="fht-cell"></div></th><th style="" data-field="1"><div class="th-inner ">Location</div><div class="fht-cell"></div></th></tr></thead>
              <tbody id="table-row-border" class="contain-subrow"><tr data-index="0"><td style="border-bottom: solid 1px #00000008 !important; border-top: none;" colspan="2"><div class="card-views"><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Available:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined">` + $('#ability-table tr').eq(1).find('.product-availablity-chk').parent().html() + `</span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Location:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><span>West Side Location</span></span></div></div></td></tr><tr data-index="1"><td style="border-bottom: solid 1px #00000008 !important; border-top: none;" colspan="2"><div class="card-views"><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Available:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined">` + $('#ability-table tr').eq(2).find('.product-availablity-chk').parent().html() + `</span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Location:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><span>East Side Location</span></span></div></div></td></tr><tr data-index="2"><td style="border-bottom: solid 1px #00000008 !important; border-top: none;" colspan="2"><div class="card-views"><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Available:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined">` + $('#ability-table tr').eq(5).find('.product-availablity-chk').parent().html() + `</span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Location:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><span>South Side Location</span></span></div></div></td></tr></tbody>
          </table>
        `);
      }
      else {
        $('#ability-table').html(`<table class="table table-borderless ability_table" data-plugin="bootstrapTable" id="table"
        data-detail-view="false"
        data-mobile-responsive="true">
        <thead>
            <tr>
                <th style="width:15%;">Available</th>
                <th>Location</th>
            </tr>
        </thead>
        <tbody id="table-row-border" class="contain-subrow">
            <tr>
                <td>` + $('#ability-table tr').eq(1).find('.product-availablity-chk').parent().html() + `</td>
                <td><span>West Side Location</span></td>
            </tr>
            <tr>
                <td>` + $('#ability-table tr').eq(2).find('.product-availablity-chk').parent().html() + `</td>
                <td><span>East Side Location</span></td>
            </tr>
            <tr>
                <td>` + $('#ability-table tr').eq(5).find('.product-availablity-chk').parent().html() + `</td>
                <td><span>South Side Location</span></td>
            </tr>
          </tbody>
        </table>`);
      }
      event_format();
      $('.product-availablity-chk').trigger('change');
    }
    else {
      var chk_col = 0;
      if($('#production-switch').prop('checked')) {
        chk_col = 1;
        console.log($('.use-production'));
        $('.use-production').removeClass('text-black');
        $('.use-production').parent().children().eq(1).addClass('text-muted');
      }
      $('#add-variant').show();
      $('.text-varient').text('Use variants if an item has different sizes, colors or other options');
      $('#composite-section').addClass('d-none');
      $('#div-default-purchase-cost').removeClass('d-none');
      $('#supplier_name').select2().next().show();
      $('#composite-supplier-name').addClass('d-none');
      $('#txt-composite-cost').html('Value updates automatically when you receive inventory');
      $('#txt-product-for-sale').text('Product not for sale');
      $('#variant-table').show();
      $('#production-switch').prop('checked', false);
      if($(window).width() < 770) {
        $('#ability-table').html(`
          <table class="table table-borderless ability_table" id="table" data-mobile-responsive="true" style="margin-top: 0px;">
              <thead style="display: none;"><tr><th style="" data-field="0"><div class="th-inner "></div><div class="fht-cell"></div></th><th style="" data-field="1"><div class="th-inner ">Available</div><div class="fht-cell"></div></th><th style="" data-field="2"><div class="th-inner ">Location</div><div class="fht-cell"></div></th><th style="" data-field="3"><div class="th-inner ">Stock</div><div class="fht-cell"></div></th><th style="" data-field="4"><div class="th-inner ">Low Stock</div><div class="fht-cell"></div></th><th style="" data-field="5"><div class="th-inner ">Optimal Stock</div><div class="fht-cell"></div></th></tr></thead>
              <tbody id="table-row-border" class="contain-subrow"><tr data-index="0"><td style="border-bottom: solid 1px #00000008 !important; border-top: none;" colspan="6"><div class="row"><div class="col-1 pl-1 align-items-center d-flex"></div><div class="card-views col-11"><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Available:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined">
                          ` + $('#ability-table tr').eq(1).find('.product-availablity-chk').parent().html() + `
                          </span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow">Location:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><span>West Side Location</span></span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Stock:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><span class="stock">0</span></span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Low Stock:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><input type="text" class="form-control low-stock" placeholder="0"></span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Optimal Stock:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><input type="text" class="form-control optimal-stock" placeholder="0"></span></div></div></div></td></tr><tr class="main-row" data-index="1"><td style="border-bottom: solid 1px #00000008 !important; border-top: none;" colspan="6"><div class="row"><div class="col-1 px-0 card-view-value pl-1 align-items-center d-flex" data-toggle="collapse" data-target=".group-of-rows-1"><i class="la la-angle-down"></i></div><div class="card-views col-11"><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Available:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined">
                          ` + $('#ability-table tr').eq(2).find('.product-availablity-chk').parent().html() + `
                          </span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow">Location:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><span>East Side Location</span></span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Stock:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><span class="stock">0</span></span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Low Stock:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><input type="text" class="form-control low-stock" placeholder="0"></span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Optimal Stock:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><input type="text" class="form-control optimal-stock" placeholder="0"></span></div></div></div></td></tr><tr class="demo out collapse group-of-rows-1" data-index="2"><td class="subrow-dark hiddenRow" style="border-bottom: solid 1px #00000008 !important; border-top: none;" colspan="6"><div class="row"><div class="col-1 pl-1 align-items-center d-flex"></div><div class="card-views col-11"><div style="display: flex;" class="card-view"><span style="line-height: 40px;" class="card-view-title collapse group-of-rows-1 subrow undefined">Available:&nbsp;</span><span style="line-height: 40px;" class="card-view-value font-weight-bold undefined"><div class="collapse group-of-rows-1"></div></span></div><div style="display: flex;" class="card-view"><span style="line-height: 40px;" class="card-view-title collapse group-of-rows-1 subrow undefined">Location:&nbsp;</span><span style="line-height: 40px;" class="card-view-value font-weight-bold undefined"><div class="collapse group-of-rows-1"><span class="subrow location-name">Storage room A</span></div></span></div><div style="display: flex;" class="card-view"><span style="line-height: 40px;" class="card-view-title collapse group-of-rows-1 subrow undefined">Stock:&nbsp;</span><span style="line-height: 40px;" class="card-view-value font-weight-bold undefined"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><span class="stock">0</span></div></span></div><div style="display: flex;" class="card-view"><span style="line-height: 40px;" class="card-view-title collapse group-of-rows-1 subrow undefined">Low Stock:&nbsp;</span><span style="line-height: 40px;" class="card-view-value font-weight-bold undefined"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control low-stock" placeholder="0"></div></span></div><div style="display: flex;" class="card-view"><span style="line-height: 40px;" class="card-view-title collapse group-of-rows-1 subrow undefined">Optimal Stock:&nbsp;</span><span style="line-height: 40px;" class="card-view-value font-weight-bold undefined"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control optimal-stock" placeholder="0"></div></span></div></div></div></td></tr><tr class="demo out collapse group-of-rows-1" data-index="3"><td class="subrow-dark hiddenRow" style="border-bottom: solid 1px #00000008 !important; border-top: none;" colspan="6"><div class="row"><div class="col-1 pl-1 align-items-center d-flex"></div><div class="card-views col-11"><div style="display: flex;" class="card-view"><span style="line-height: 40px;" class="card-view-title collapse group-of-rows-1 subrow undefined">Available:&nbsp;</span><span style="line-height: 40px;" class="card-view-value font-weight-bold undefined"><div class="collapse group-of-rows-1"></div></span></div><div style="display: flex;" class="card-view"><span style="line-height: 40px;" class="card-view-title collapse group-of-rows-1 subrow undefined">Location:&nbsp;</span><span style="line-height: 40px;" class="card-view-value font-weight-bold undefined"><div class="collapse group-of-rows-1"><span class="subrow location-name">Sales Floor</span></div></span></div><div style="display: flex;" class="card-view"><span style="line-height: 40px;" class="card-view-title collapse group-of-rows-1 subrow undefined">Stock:&nbsp;</span><span style="line-height: 40px;" class="card-view-value font-weight-bold undefined"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><span class="stock">0</span></div></span></div><div style="display: flex;" class="card-view"><span style="line-height: 40px;" class="card-view-title collapse group-of-rows-1 subrow undefined">Low Stock:&nbsp;</span><span style="line-height: 40px;" class="card-view-value font-weight-bold undefined"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control low-stock" placeholder="0"></div></span></div><div style="display: flex;" class="card-view"><span style="line-height: 40px;" class="card-view-title collapse group-of-rows-1 subrow undefined">Optimal Stock:&nbsp;</span><span style="line-height: 40px;" class="card-view-value font-weight-bold undefined"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control optimal-stock" placeholder="0"></div></span></div></div></div></td></tr><tr data-index="4"><td style="border-bottom: solid 1px #00000008 !important; border-top: none;" colspan="6"><div class="row"><div class="col-1 pl-1 align-items-center d-flex"></div><div class="card-views col-11"><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Available:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined">
                          ` + $('#ability-table tr').eq(2).find('.product-availablity-chk').parent().html() + `
                          </span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow">Location:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><span>South Side Location</span></span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Stock:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><span class="stock">0</span></span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Low Stock:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><input type="text" class="form-control low-stock" placeholder="0"></span></div><div style="display: flex;" class="card-view"><span class="card-view-title subrow undefined">Optimal Stock:&nbsp;</span><span style="" class="card-view-value font-weight-bold undefined"><input type="text" class="form-control optimal-stock" placeholder="0"></span></div></div></div></td></tr></tbody>
          </table>
        `);
      }
      else {
        $('#ability-table').html(`
        <table class="table table-borderless ability_table" data-plugin="bootstrapTable" id="table" 
            data-mobile-responsive="true">
            <thead>
                <tr>
                    <th></th>
                    <th>Available</th>
                    <th>Location</th>
                    <th>Stock</th>
                    <th>Low Stock</th>
                    <th>Optimal Stock</th>
                </tr>
            </thead>
            <tbody id="table-row-border" class="contain-subrow">
                <tr>
                    <td></td>
                    <td>` + $('#ability-table tr').eq(1).children().eq(chk_col).html() + `</td>
                    <td><span>West Side Location</span></td>
                    <td><span class="stock">0</span></td>
                    <td> <input type="text" class="form-control low-stock" placeholder="0"> </td>
                    <td> <input type="text" class="form-control optimal-stock" placeholder="0"></td>
                </tr>
                <tr class="main-row">
                    <td data-toggle="collapse" data-target=".group-of-rows-1"><i class="la la-angle-down accordion-toggle"></i></td>
                    <td>` + $('#ability-table tr').eq(2).children().eq(chk_col).html() + `</td>
                    <td><span>East Side Location</span></td>
                    <td><span class="stock">0</span></td>
                    <td> <input type="text" class="form-control low-stock" placeholder="0"> </td>
                    <td> <input type="text" class="form-control optimal-stock" placeholder="0"> </td>
                    <tr class="demo out collapse group-of-rows-1"> 
                        <td class="subrow-dark hiddenRow"></td>
                        <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"></div></td>
                        <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"><span class="subrow location-name"><span>Storage room A</span></div></td>
                        <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><span class="stock">0</span></div></td>
                        <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control low-stock" placeholder="0"></div></td>
                        <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control optimal-stock" placeholder="0"></div></td>
                    </tr>
                    <tr class="demo out collapse group-of-rows-1"> 
                        <td class="subrow-dark hiddenRow"></td>
                        <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"></div></td>
                        <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"><span class="subrow location-name"><span>Sales Floor</span></div></td>
                        <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><span class="stock">0</span></div></td>
                        <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control low-stock" placeholder="0"></div></td>
                        <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control optimal-stock" placeholder="0"></div></td>
                    </tr>
                </tr>
                <tr>
                    <td></td>
                    <td>` + $('#ability-table tr').eq(3 + chk_col * 2).children().eq(chk_col).html() + `</td>
                    <td><span>South Side Location</span></td>
                    <td><span class="stock">0</span></td>
                    <td><input type="text" class="form-control low-stock" placeholder="0"></td>
                    <td> <input type="text" class="form-control optimal-stock" placeholder="0"> </td>
                </tr>
            </tbody>
        </table>`);
      }
      event_format();
      $('.product-availablity-chk').trigger('change');
    }
    $('footer .save').attr('disabled', false);
    
  });
  $('#production-switch').change(function () {
    if (!$('#composite-switch').prop('checked')) {
      $('#production-switch').prop('checked', false);
    }
    if ($('#composite-switch').prop('checked') && $(this).prop('checked')) {
      $(this).closest('div').find('.font-weight-bold').toggleClass('text-black');
      $(this).closest('div').find('.description').toggleClass('text-muted');
      $('#txt-composite-cost').text('Value updates automatically when you produce or receive this product');

      $('#ability-table').html(`<table class="table table-borderless ability_table" data-plugin="bootstrapTable" id="table"
          data-mobile-responsive="true">
          <thead>
              <tr>
                  <th></th>
                  <th>Available</th>
                  <th>Location</th>
                  <th>Stock</th>
                  <th>Low Stock</th>
                  <th>Optimal Stock</th>
              </tr>
          </thead>
          <tbody id="table-row-border" class="contain-subrow">
              <tr>
                  <td></td>
                  <td>` + $('#ability-table tr').eq(1).children().eq(0).html() + `</td>
                  <td><span>West Side Location</span></td>
                  <td><span class="stock">0</span></td>
                  <td> <input type="text" class="form-control low-stock" placeholder="0"> </td>
                  <td> <input type="text" class="form-control optimal-stock" placeholder="0"></td>
              </tr>
              <tr class="main-row">
                  <td data-toggle="collapse" data-target=".group-of-rows-1"><i class="la la-angle-down accordion-toggle"></i></td>
                  <td>` + $('#ability-table tr').eq(2).children().eq(0).html() + `</td>
                  <td><span>East Side Location</span></td>
                  <td><span class="stock">0</span></td>
                  <td> <input type="text" class="form-control low-stock" placeholder="0"> </td>
                  <td> <input type="text" class="form-control optimal-stock" placeholder="0"> </td>
                  <tr class="demo out collapse group-of-rows-1"> 
                      <td class="subrow-dark hiddenRow"></td>
                      <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"></div></td>
                      <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"><span class="subrow location-name"><span>Storage room A</span></div></td>
                      <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><span class="stock">0</span></div></td>
                      <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control low-stock" placeholder="0"></div></td>
                      <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control optimal-stock" placeholder="0"></div></td>
                  </tr>
                  <tr class="demo out collapse group-of-rows-1"> 
                      <td class="subrow-dark hiddenRow"></td>
                      <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"></div></td>
                      <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"><span class="subrow location-name"><span>Sales Floor</span></div></td>
                      <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><span class="stock">0</span></div></td>
                      <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control low-stock" placeholder="0"></div></td>
                      <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control optimal-stock" placeholder="0"></div></td>
                  </tr>
              </tr>
              <tr>
                  <td></td>
                  <td>` + $('#ability-table tr').eq(3).children().eq(0).html() + `</td>
                  <td><span>South Side Location</span></td>
                  <td><span class="stock">0</span></td>
                  <td><input type="text" class="form-control low-stock" placeholder="0"></td>
                  <td> <input type="text" class="form-control optimal-stock" placeholder="0"> </td>
              </tr>
          </tbody>
      </table>
      `);
      event_format();
      $('.product-availablity-chk').trigger('change');
    }
    else if ($('#composite-switch').prop('checked') && !$(this).prop('checked')) {
      $(this).closest('div').find('.font-weight-bold').toggleClass('text-black');
      $(this).closest('div').find('.description').toggleClass('text-muted');
      $('#txt-composite-cost').text('Calculated as the sum of cost of components');
      $('#ability-table').html(`<table class="table table-borderless ability_table" data-plugin="bootstrapTable" id="table"
      data-detail-view="false"
      data-mobile-responsive="true">
      <thead>
          <tr>
              <th style="width:15%;">Available</th>
              <th><span>Location</span></th>
          </tr>
      </thead>
      <tbody id="table-row-border" class="contain-subrow">
          <tr>
              <td>` + $('#ability-table tr').eq(1).children().eq(1).html() + `</td>
              <td><span>West Side Location</span></td>
          </tr>
          <tr>
              <td>` + $('#ability-table tr').eq(2).children().eq(1).html() + `</td>
              <td><span>East Side Location</span></td>
          </tr>
          <tr>
              <td>` + $('#ability-table tr').eq(5).children().eq(1).html() + `</td>
              <td><span>South Side Location</span></td>
          </tr>
        </tbody>
      </table>`);
      event_format();
      $('.product-availablity-chk').trigger('change');
    }
    else {
      $('#txt-composite-cost').text('Value updates automatically when you receive inventory');
    }
  });

  $('.edit').click(function () {
    location.href = '/products/products_edit';
  });

  $('.create-order').click(function () {
    location.href = '/inventory/purchase';
  });

  $('.stock-adjust').click(function () {
    location.href = '/inventory/stock';
  });

  $('.duplicate-product').click(function () {
    location.href = '/products/products_new';
  });

  $('.delete').click(function () {
    $('#delete-modal').modal('show');
  });

  $('#btn-delete').click(function () {
    $('#delete-modal').modal('hide');
    $('#toolbar').hide();
    $('input[type="checkbox"]:checked').each(function () {
      if (this.value != 'all' && this.value != 'name') {
        $(this).parent().parent().parent().remove();
      }
    });
    $('table input[type="checkbox"]').prop('checked', false);
    notification('Dairy Khoury Labneh 400g deleted successfully');
  });

  $('#btn-multi-delete').click(function () {
    $('#multi-delete-modal').modal('show');
    var selected_count = parseInt($('#selected-count').text());
    $('#selected-cnt').val(selected_count);
    if (selected_count == 1) {
      $('#modal-multi-title').html('Delete ' + selected_count + ' product');
      $('#body-title').html('Are you sure you about this product? This can’t be undone.');
    } else {
      $('#modal-multi-title').html('Delete ' + selected_count + ' products');
      $('#body-title').html('Are you sure you about these products? These can’t be undone.');
    }
  });

  $('#btn-delete-confirm').click(function () {
    $('#multi-delete-modal').modal('hide');
    $('#toolbar').hide();
    $('input[type="checkbox"]:checked').each(function () {
      if (this.value != 'all' && this.value != 'name') {
        $(this).parent().parent().parent().remove();
      }
    });
    $('table input[type="checkbox"]').prop('checked', false);
    var selected_cnt = parseInt($('#selected-cnt').val());
    if (selected_cnt == 1) {
      notification('1 product deleted successfully');
    } else {
      notification(selected_cnt + ' products deleted successfully');
    }

  });

  $('#table tbody tr').click(function (ev) {
    if (ev.target.nodeName !== 'I' && ev.target.nodeName !== 'INPUT' && ev.target.nodeName !== 'A') {
      location.href = '/products/products_edit';
    }
  });

  $('#product-category').change(function () {
    if ($(this).val() === 'new') {
      $('#add-category-modal').modal('show');
    }
  });

  $('#product-supplier').change(function () {
    if ($(this).val() === 'new') {
      $('#add-supplier-modal').modal('show');
    }
  });

  $('.edit-category').click(function () {
    $('delete-btn').removeClass('d-none');
    $('#category-edit-title').html('Edit category');
  });

  $('.delete-action').click(function () {
    $('delete-btn').addClass('d-none');
    $('#category-edit-title').html('Add category');
    $('#delete-modal').modal('hide');
  });

  $('.back').click(function () {
    location.href = '/products/products_all';
  });

  var product_add_sortby = 'each';

  $('input[name=point-round]').change(function () {
    if ($(this).val() == 's_each') {
      value_type = 1;
      $('#sales').text('all sales outlets');
      $('.stock').text('0');
      $('.low-stock').val('');
      $('.optimal-stock').val('');
      product_add_sortby = 'each';
      event_format();
    } else if ($(this).val() == 's_weight') {
      value_type = 2;
      $('#sales').text('all sales outlets');
      $('.stock').text('0.000');
      $('.low-stock').val('');
      $('.optimal-stock').val('');
      product_add_sortby = 'weight';
      event_format();
    }
  });

  $('#composite-table').on('keyup', '.quantity', function () {
    $(this).val($(this).val().replace(/,/g, ''));
    $(this).parent().next().text(1500 * $(this).val());
    updateInventoryTotalCost();
    var index = $(this).val().indexOf('.');
    var temp = "";
    if(index != -1) {
        temp = $(this).val().substring(0, index);
        $(this).val(temp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + $(this).val().substring(index));
    }
    else {
        $(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }
    $('.cost').trigger('change');
    $('#composite-product-total-cost').trigger('change');
  });

  $('.barcode-add').click(function () {
    if ($('.added-barcode-div').length < 2) {
      var htmlStr = `
        <div class="col-6 form-group added-barcode-div">
        <label class="d-flex justify-content-between">
          <span>Barcode</span>
          <a class="text-dark barcode-remove">
            <i class="i-con i-con-close">
            </i>
          </a>
        </label>
        <div class="input-group">
          <input type="number" class="form-control">
            <div class="input-group-append">
              <button class="btn btn-primary">Generate</button>
            </div>
          </div>
        </div>
        `;

      $(htmlStr).insertBefore('#div-sku');
    }
    if ($('.added-barcode-div').length == 1) {
      $('#div-sku').removeClass('col-md-6');
    } else {
      $('#div-sku').addClass('col-md-6');
    }
    if ($('.added-barcode-div').length == 2) {
      $('.barcode-add').removeClass('text-primary');
      $('.barcode-add').addClass('text-secondary');
    }
  });

  $(document).on('click', '.i-con-close', function () {
    $('.barcode-add').removeClass('text-secondary');
    $('.barcode-add').addClass('text-primary');
  });

  $(document).on("click", ".barcode-remove", function () {
    $(this).closest('.form-group').remove();
    if ($('.added-barcode-div').length == 1) {
      $('#div-sku').removeClass('col-md-6');
    } else {
      $('#div-sku').addClass('col-md-6');
    }
  });

  $(document).on("change", "#ckb-tax1", function () {
    if (this.checked) {
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

  $(document).on("change", "#ckb-tax2", function () {
    if (this.checked) {
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

  $(document).on("click", "#chk-product-for-sale", function () {
    if (this.checked) {
      $('#txt-product-for-sale').html('Product for sale');
      $('#text-but-not-for-sale').hide();
      $(this).closest('div').find('.font-weight-bold').toggleClass('text-black');
      $(this).closest('div').find('.description').toggleClass('text-muted');
    } else {
      $('#txt-product-for-sale').html('Product not for sale');
      $('#text-but-not-for-sale').show();
      $(this).closest('div').find('.font-weight-bold').toggleClass('text-black');
      $(this).closest('div').find('.description').toggleClass('text-muted');
    }
  });

  $(document).on("change", "#ckb-loyalty50", function () {
    $(this).closest('div').find('.font-weight-bold').toggleClass('text-black');
    $(this).closest('div').find('.description').toggleClass('text-muted');
    if (this.checked) {
      console.log('loyalty50');
      if($('#ckb-loyalty10').prop('checked')) {
        $('#ckb-loyalty10').closest('div').find('.font-weight-bold').toggleClass('text-black');
        $('#ckb-loyalty10').closest('div').find('.description').toggleClass('text-muted');
      } else if($('#ckb-loyalty1').prop('checked')) {
        $('#ckb-loyalty1').closest('div').find('.font-weight-bold').toggleClass('text-black');
        $('#ckb-loyalty1').closest('div').find('.description').toggleClass('text-muted');
      }
      $('#ckb-loyalty10').prop('checked', false);
      $('#ckb-loyalty1').prop('checked', false);
    }
  });

  $(document).on("change", "#ckb-loyalty10", function () {
    $(this).closest('div').find('.font-weight-bold').toggleClass('text-black');
    $(this).closest('div').find('.description').toggleClass('text-muted');
    if (this.checked) {
      console.log('loyalty10');
      if($('#ckb-loyalty1').prop('checked')) {
        $('#ckb-loyalty1').closest('div').find('.font-weight-bold').toggleClass('text-black');
        $('#ckb-loyalty1').closest('div').find('.description').toggleClass('text-muted');
      } else if($('#ckb-loyalty50').prop('checked')) {
        $('#ckb-loyalty50').closest('div').find('.font-weight-bold').toggleClass('text-black');
        $('#ckb-loyalty50').closest('div').find('.description').toggleClass('text-muted');
      }
      $('#ckb-loyalty1').prop('checked', false);
      $('#ckb-loyalty50').prop('checked', false);
    }
  });

  $(document).on("change", "#ckb-loyalty1", function () {
    $(this).closest('div').find('.font-weight-bold').toggleClass('text-black');
    $(this).closest('div').find('.description').toggleClass('text-muted');
    if (this.checked) {
      console.log('loyalty1');
      if($('#ckb-loyalty10').prop('checked')) {
        $('#ckb-loyalty10').closest('div').find('.font-weight-bold').toggleClass('text-black');
        $('#ckb-loyalty10').closest('div').find('.description').toggleClass('text-muted');
      } else if($('#ckb-loyalty50').prop('checked')) {
        $('#ckb-loyalty50').closest('div').find('.font-weight-bold').toggleClass('text-black');
        $('#ckb-loyalty50').closest('div').find('.description').toggleClass('text-muted');
      }
      $('#ckb-loyalty10').prop('checked', false);
      $('#ckb-loyalty50').prop('checked', false);
    }
  });

  $(document).on("change", "#ckb-modifier1", function () {
    $(this).closest('div').find('.font-weight-bold').toggleClass('text-black');
    $(this).closest('div').find('.description').toggleClass('text-muted');
  });

  $(document).on("change", "#ckb-modifier2", function () {
    $(this).closest('div').find('.font-weight-bold').toggleClass('text-black');
    $(this).closest('div').find('.description').toggleClass('text-muted');
  });

  $(document).on("change", "#ckb-modifier3", function () {
    $(this).closest('div').find('.font-weight-bold').toggleClass('text-black');
    $(this).closest('div').find('.description').toggleClass('text-muted');
  });

  $('footer .save').click(function () {
    var product_name = $('#product-name').val();
    if(product_name == "Chocolate")
      $('#existed-product').modal('show');
    else {
      $(this).attr('disabled', true);
      notification(product_name + " updated successfully");
      $('#ghost .all-link')[0].click();
    }
  });
  $('.delete-confirm').click(function() {
    $('footer .save').attr('disabled', true);
    var product_name = $('#product-name').val();
    notification(product_name + " deleted successfully");
    $('#ghost .all-link')[0].click();
  });

  // $('#view-original').click(function() {
  //   $('footer .save').attr('disabled', true);
  //   $(this).attr('disabled', true);
  //   $('#ghost .edit-link')[0].click();
  // });

  $('#add-variant-modal #btn-add-variant').click(function () {
    if(add_variant_visable == 3) return;
    var add_element = $('#add-variant-modal .list-row').find('.d-none').eq(0);
    add_element.removeClass('d-none');
    add_variant_visable ++;
    if(add_variant_visable == 3) {
      $(this).attr('disabled', true);
      $('#add-variant-modal #btn-add-variant').addClass('text-grey');
      $('#add-variant-modal #btn-add-variant').removeClass('text-primary');
    }
    update_Order();
  });
  $('#edit-variant-modal #btn-add-variant').click(function () {
    console.log('edit', 'add_variant');
    if(edit_variant_visible == 3) return;
    var add_element = $('#edit-variant-modal .list-row').find('.d-none').eq(0);
    add_element.removeClass('d-none');
    edit_variant_visible ++;
    if(edit_variant_visible == 3) {
      $(this).attr('disabled', true);
      $('#edit-variant-modal #btn-add-variant').addClass('text-grey');
      $('#edit-variant-modal #btn-add-variant').removeClass('text-primary');
    }
    update_Order();
  });

  $('#add-variant-modal .add-variant-delete').click(function () {
    var first_item = $(this).parent().parent().parent().parent()[0];
    if($('.list-row .list-item')[0] == first_item) {
      $(this).parent().parent().parent().parent().find('input').val('');
    } else {
      $(this).parent().parent().parent().parent().addClass('d-none');
      $(this).parent().parent().parent().parent().removeClass('d-flex');
    }
    $('#btn-add-variant').removeAttr('disabled');
    $('#btn-add-variant').removeClass('text-grey');
    $('#btn-add-variant').addClass('text-primary');
    add_variant_visable --;
    update_Order();
  });
  $('#edit-variant-modal .add-variant-delete').click(function () {
    var first_item = $(this).parent().parent().parent().parent()[0];
    if($('.list-row .list-item')[0] == first_item) {
      $(this).parent().parent().parent().parent().find('input').val('');
    } else {
      $(this).parent().parent().parent().parent().addClass('d-none');
      $(this).parent().parent().parent().parent().removeClass('d-flex');
    }
    $('#btn-add-variant').removeAttr('disabled');
    $('#btn-add-variant').removeClass('text-grey');
    $('#btn-add-variant').addClass('text-primary');
    edit_variant_visible --;
    update_Order();
  });

  // $('#existed-product .btn-secondary').click(function () {
  //   $('#ghost .edit-link')[0].click();
  // });

  $('#add-variant-modal .add').click(function () {
    for(let i = 0; i < 3; i ++) {
      if($('.list-item').eq(i).hasClass("d-none") || $('.list-item').eq(i).find('input[name="variant-name"]').val() == "") break;
      $('.varient-titles').text($('.varient-titles').text() + " / ");
      $('.varient-titles').text($('.varient-titles').text() + $('.list-item').eq(i).find('input[name="variant-name"]').val());
      varients_data.push({ variant: $('.list-item').eq(i).find('input[name="variant-name"]').val(), options: $('.list-item').eq(i).find('.simple-tags').attr("data-simple-tags").substring(1).split(',') });
    }
    $('.varient-titles').text($('.varient-titles').text().substring(3));
    $('#variant-table').removeClass('d-none');
    $('#variant-table tbody').html(``);
    varient_render(0, []);
    $('.variant-delete').click(function () {
      $(this).parent().parent().remove();
      availability_table_render(0);
      if($('#variant-table').find('tr').not(".d-none").length == 2) {
        $('#variant-table').addClass('d-none');
        $('#variant-table tbody').html(``);
        $('#add-variant').removeClass("d-none");
        return false;
      }
      return true;
    });
    availability_table_render(1);
    event_format();
    $('.product-availablity-chk').trigger('change');
    $('#add-variant').addClass("d-none");
    $('footer .save').removeAttr('disabled');
    
  });

  $('#div-category-name').on('click', '#select2-category_name-container', function () {
    $('#select2-category_name-results').prepend('<li class="select2-results__option select2-results__option--highlighted" id="select2-category_name-result-bbym-new" role="treeitem" aria-selected="false">\
      <button class="btn w-sm mb-1 bg-primary-lt">Add new category</button><br>asdf</li>');
  });
  $(document).on('click', '#select2-category_name-result-bbym-new>button', function () {
    $('#add-category-modal').modal('show');
    $(this).val('');
  });
  $('#category').change(function () {
    if ($(this).val() == 'new') {
      $('#add-category-modal').modal('show');
      $(this).val('');
    }
  });

  function updateInventoryTotalCost() {
    let total = 0;
    $('#composite-table td.cost').each(function () {
      total += Number($(this).text().replace(/,/g, ''));
    });
    $('#composite-product-total-cost').text(total);
    $('#cost').val(total);
    $('#cost').trigger('change');
  }

  $('#cost').change(function() {
    $(this).val($(this).val().replace(/,/g, ''));
    $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  });

  $('#composite-table').on('click', '.delete-composite', function () {
    $(this).closest('tr').remove();
    updateInventoryTotalCost();
  });

  $('#is-sub-category').click(function () {
    if ($(this).prop('checked')) {
      $('#category-name-container').removeClass('d-none');
    } else {
      $('#category-name-container').addClass('d-none');
    }
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

  // $('#leave-modal .continue').click(function () {
  //   $('footer .save').attr('disabled', true);
  //   $('#pjax-back-link')[0].click();
  // })

  $('.la').click(function () {
    var obj = $(this);
    if (obj.hasClass('la-angle-up')) {
      obj.removeClass('la-angle-up');
      obj.addClass('la-angle-down');
    } else {
      obj.addClass('la-angle-up');
      obj.removeClass('la-angle-down');
    }
  });
  
  $('#SKU-number').mask('AAA-AAA-AAA');

  $('.edit-variant').click(function() {
    var i;
    for (i = 0; i < varients_data.length; i ++) {
      $('#edit-variant-modal').find('input[name="variant-name"]').eq(i).val(varients_data[i].variant);
      var tags_str = "";
      for(let el in varients_data[i].options) {
        tags_str = tags_str + varients_data[i].options[el] + ",";
      }
      tags_str = tags_str.substring(0, tags_str.length - 1);
      console.log(tags_str);
      $('#variant-tags'+(i+4)).attr("data-simple-tags", tags_str);
    }
    for (; i < 3; i ++) {
      $('#edit-variant-modal').find(".list-item").eq(i).addClass("d-none");
    }
    new Tags(document.getElementById('variant-tags4'));
    new Tags(document.getElementById('variant-tags5'));
    new Tags(document.getElementById('variant-tags6'));
    $('#edit-variant-modal').modal('show');
  });

  $('.variant_save').click(function() {
    $('.varient-titles').text("");
    varients_data = [];
    for(let i = 0; i < 3; i ++) {
      if($('#edit-variant-modal').find(".list-item").eq(i).hasClass("d-none")) continue;
      $('.varient-titles').text($('.varient-titles').text() + " / ");
      $('.varient-titles').text($('.varient-titles').text() + $('#edit-variant-modal').find('.list-item').eq(i).find('input[name="variant-name"]').val());
      varients_data.push({ variant: $('#edit-variant-modal').find('.list-item').eq(i).find('input[name="variant-name"]').val(), options: $('#variant-tags'+(i+4)).attr("data-simple-tags").split(',') });
    }
    console.log(varients_data);
    $('.varient-titles').text($('.varient-titles').text().substring(3));
    $('#variant-table tbody').html(``);
    varient_render(0, []);
    $('.variant-delete').click(function () {
      $(this).parent().parent().remove();
      availability_table_render(0);
      if($('#variant-table').find('tr').not(".d-none").length == 2) {
        $('#variant-table').addClass('d-none');
        $('#variant-table tbody').html(``);
        $('#add-variant').removeClass("d-none");
        return false;
      }
      return true;
    });
    availability_table_render(0);
    event_format();
  });
  if($(window).width() < 770) {
    setTimeout(function() {event_format()}, 3000);
  } else {
    setTimeout(function() {event_format()}, 2000);
  }
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
  if(value_type == 1) {
    $(".low-stock").off("keypress");
    $(".low-stock").keypress(return_integer);
    $(".optimal-stock").off("keypress");
    $(".optimal-stock").keypress(return_integer);
    $(".low-stock").attr("placeholder", "0");
    $(".optimal-stock").attr("placeholder", "0");
  }
  else if(value_type == 2) {
    $(".low-stock").off("keypress");
    $(".low-stock").keypress(return_decimal);
    $(".optimal-stock").off("keypress");
    $(".optimal-stock").keypress(return_decimal);
    $(".low-stock").attr("placeholder", "0.000");
    $(".optimal-stock").attr("placeholder", "0.000");
  }
  $(".number-format").on('keyup', function (e) {
    if(e.keyCode == 65 || e.keyCode == 17 || e.keyCode == 46 || e.keyCode == 190) {
      return;
    }
    $(this).val($(this).val().replace(/,/g, ''));
    $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  });
  // $(".low-stock").on('change', function(e) {
  //   if(value_type == 1) {
  //     console.log($(this).val());
  //   }
  // });

  $('.low-stock').on('keyup', function (e) {
    $(this).val($(this).val().replace(/,/g, ''));
    var index = $(this).val().indexOf('.');
    var temp = "";
    if(index != -1) {
        temp = $(this).val().substring(0, index);
        $(this).val(temp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + $(this).val().substring(index));
    }
    else {
        $(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }
  });
  $('.low-stock').focusout(function () {
    if (value_type == 2 && $(this).val()) {
        var num = $(this).val();
        if(!$(this).val().includes('.')) {
            num = $(this).val() + '.000';
        } else if(($(this).val().length - $(this).val().indexOf('.')) == 2) {
          if($(this).val()[0] == ".")
            num = "0" + $(this).val() + "00";
          else
            num = $(this).val() + '00';
        } else if(($(this).val().length - $(this).val().indexOf('.')) == 3) {
          if($(this).val()[0] == ".")
            num = "0" + $(this).val() + "0";
          else
            num = $(this).val() + '0';
        }
        $(this).val(num);
    }
  });
  $('.optimal-stock').on('keyup', function (e) {
    $(this).val($(this).val().replace(/,/g, ''));
    var index = $(this).val().indexOf('.');
    var temp = "";
    if(index != -1) {
        temp = $(this).val().substring(0, index);
        $(this).val(temp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + $(this).val().substring(index));
    }
    else {
        $(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }
  });
  $('.optimal-stock').focusout(function () {
      if (value_type == 2 && $(this).val()) {
          var num = $(this).val();
          if(!$(this).val().includes('.')) {
              num = $(this).val() + '.000';
          } else if(($(this).val().length - $(this).val().indexOf('.')) == 2) {
            if($(this).val()[0] == ".")
              num = "0" + $(this).val() + "00";
            else
              num = $(this).val() + '00';
          } else if(($(this).val().length - $(this).val().indexOf('.')) == 3) {
            if($(this).val()[0] == ".")
              num = "0" + $(this).val() + "0";
            else
              num = $(this).val() + '0';
          }
          $(this).val(num);
      }
  });

  $('.each').on('keyup', function (e) {
    $(this).val($(this).val().replace(/,/g, ''));
    var index = $(this).val().indexOf('.');
    var temp = "";
    if(index != -1) {
        temp = $(this).val().substring(0, index);
        $(this).val(temp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + $(this).val().substring(index));
    }
    else {
        $(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }
  });
  $('.cost').on('change', function (e) {
    $(this).text($(this).text().replace(/,/g, ''));
    var index = $(this).text().indexOf('.');
    var temp = "";
    if(index != -1) {
        temp = $(this).text().substring(0, index);
        $(this).text(temp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + $(this).text().substring(index));
    }
    else {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }
  });
  $('#composite-product-total-cost').on('change', function (e) {
    $(this).text($(this).text().replace(/,/g, ''));
    var index = $(this).text().indexOf('.');
    var temp = "";
    if(index != -1) {
        temp = $(this).text().substring(0, index);
        $(this).text(temp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + $(this).text().substring(index));
    }
    else {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }
  });
  $('.weight').on('keyup', function (e) {
    $(this).val($(this).val().replace(/,/g, ''));
    var index = $(this).val().indexOf('.');
    var temp = "";
    if(index != -1) {
        temp = $(this).val().substring(0, index);
        $(this).val(temp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + $(this).val().substring(index));
    }
    else {
        $(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }
  });
    
  $('.weight').focusout(function () {
    if ($(this).val()) {
        var num = $(this).val();
        if(!$(this).val().includes('.')) {
            num = $(this).val() + '.000';
        } else if(($(this).val().length - $(this).val().indexOf('.')) == 2) {
          if($(this).val()[0] == ".")
            num = "0" + $(this).val() + "00";
          else
            num = $(this).val() + '00';
        } else if(($(this).val().length - $(this).val().indexOf('.')) == 3) {
          if($(this).val()[0] == ".")
            num = "0" + $(this).val() + "0";
          else
            num = $(this).val() + '0';
        }
        $(this).val(num);
    }
  });
  $('select').change(function() {
    if($(this)[0] == $('#sub-category')[0]) return;
    if($(this)[0] == $('#vat-select')[0]) return;
    
  });
  
  $('#content input').keydown(function () {
    if($(this).hasClass("variant_input")) return;
    if($(this).attr("name") == "variant-name") return;
    if($(this)[0] == $('#name')[0]) return;
    if($(this)[0] == $('#company-legal-name')[0] || $(this)[0] == $('#contact-first-name')[0] || $(this)[0] == $('#contact-last-name')[0] || $(this)[0] == $('#mobile')[0] || $(this)[0] == $('#phone')[0] || $(this)[0] == $('#exchange-rate')[0] || $(this)[0] == $('#vat-id-number')[0] || $(this)[0] == $('#vat-percentage')[0]) return;
    $('footer .save').removeAttr('disabled');
    
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
    
  });

  $('#create-category').click(function() {
    $('#select2-category_name-container').text($('#name').val());
    $('footer .save').removeAttr('disabled');
    
  });
  $('#create-supplier').click(function() {
    $('#select2-supplier_name-container').text($('#company-legal-name').val());
    $('footer .save').removeAttr('disabled');
    
  });

  $('.product-availablity-chk').change(function() {
    var total_chk_cnt = $(this).closest('tbody').find('input[type="checkbox"]').length;

    var current_row = $(this).closest('tr');
    if($(this).children().eq(0).prop("checked") == true){
      $(this).children().eq(0).attr("checked", true);
      current_row.find('input[type="text"]').prop("disabled", false);
      current_row.find('span').removeClass("text-muted");
      if(current_row.hasClass("main-row")) {
        current_row.next().find('input[type="text"]').prop("disabled", false);
        current_row.next().find('span').removeClass("text-muted");
        current_row.next().next().find('input[type="text"]').prop("disabled", false);
        current_row.next().next().find('span').removeClass("text-muted");
      }
    }
    else if($(this).children().eq(0).prop("checked") == false) {
      console.log('unchecked');
      $(this).children().eq(0).attr("checked", false);
      current_row.find('input[type="text"]').prop("disabled", true);
      console.log(current_row.find('span'));
      current_row.find('span').addClass("text-muted");
      if(current_row.hasClass("main-row")) {
        current_row.next().find('input[type="text"]').prop("disabled", true);
        current_row.next().find('span').addClass("text-muted");
        current_row.next().next().find('input[type="text"]').prop("disabled", true);
        current_row.next().next().find('span').addClass("text-muted");
      }
    }
    var enable_chk_cnt = $(this).closest('tbody').find('input[checked="checked"]').length;
    if(enable_chk_cnt == total_chk_cnt) $('#sales').text("all sales outlets");
    else if(enable_chk_cnt == 1) $('#sales').text(enable_chk_cnt + " sales outlet");
    else $('#sales').text(enable_chk_cnt + " sales outlets");
  });
}

function add_product(item) {
  console.log($(item).find('.type').text());
  var add_item = `
  <tr>
    <td>
      <b>` + $(item).find('.composite-product-name').eq(0).text() + `</b><br>
      <span class="text-muted product-info">` + $(item).find('.composite-product-info').eq(0).text() + `</span>
    </td>
    <td class="text-right" width="100px">
      <input type="text" class="form-control text-right quantity each" placeholder="0"
        aria-label="quantity" value="" aria-describedby="basic-addon2">
    </td>
    <td class="text-right cost each">0</td>
    <td class="text-right">
      <a class="text-danger delete-composite i-con-h-a">
        <i class="i-con i-con-trash"><i></i></i>
      </a>
    </td>
  </tr>
  `;
  if($(item).find('.type').text().indexOf("weight") != -1) {
    add_item = `
      <tr>
        <td>
          <b>` + $(item).find('.composite-product-name').eq(0).text() + `</b><br>
          <span class="text-muted product-info">` + $(item).find('.composite-product-info').eq(0).text() + `</span>
        </td>
        <td class="text-right" width="100px">
          <input type="text" class="form-control text-right quantity weight" placeholder="0.000"
            aria-label="quantity" value="" aria-describedby="basic-addon2">
        </td>
        <td class="text-right cost each">0</td>
        <td class="text-right">
          <a class="text-danger delete-composite i-con-h-a">
            <i class="i-con i-con-trash"><i></i></i>
          </a>
        </td>
      </tr>
      `;
  }
  $('#composite-table tbody').append(add_item);
  event_format();
  $('.product_typeahead').typeahead('val','');
}
function varient_render(curLen, names) {
  if (curLen == varients_data.length) {
    let html = '<tr>' +
      '<td>' + names[0];
    for (let i in names) {
      if (i == 0) continue;
      html += ' / ' + names[i];
    }
    html = html + `</td>
      <td>
        <span class="text-muted">L£ 0</span>
      </td>
      <td>
        <div class= "input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon2">L£</span>
          </div>
          <input type="text" class="number-format form-control" aria-label="Recipient username" aria-describedby="basic-addon2" placeholder="-" value="` + $('#price').val() + `">
        </div>
      </td >
      <td>
          <div class="input-group">
              <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon2">L£</span>
              </div>
              <input type="text" placeholder='-' class="number-format form-control"
                      aria-label="Recipient's username" aria-describedby="basic-addon2" value="` + $('#default-purchase-cost').val() + `">
          </div>
      </td>
      <td>
        <input type="text" class="form-control" value="` + (10000 + parseInt(Math.random() * 90000)) + `">
      </td>
      <td>
        <input type="number" class="form-control">
      </td>
      <td>
        <a class="text-danger i-con-h-a variant-delete">
          <i class="i-con i-con-trash"><i></i></i>
        </a>
      </td>
    </tr>`;
    $('#variant-table tbody').append(html);
    return;
  }
  for (let i in varients_data[curLen].options) {
    names[curLen] = varients_data[curLen].options[i];
    varient_render(curLen + 1, names);
  }
}
varient_render(0, []);
$(function() {
  $(".list-row").sortable({
    items: ".list-item",
    revert: 300,
    cursor: 'grabbing',
    // helper: 'clone',
    appendTo: '.list-row',
    containment: 'window',
    forcePlaceholderSize: true,
    stop: function(event, ui) {
      update_Order();
    }
  })
});
function update_Order() {
    $('#add-variant-modal').find('label').eq(0).text("Variant 1");
    if($('#add-variant-modal').find('.list-item').eq(1).hasClass('d-none')) {
      $('#add-variant-modal').find('label').eq(2).text("Variant 2");
      $('#add-variant-modal').find('label').eq(1).text("Variant 3");
    }
    else {
      $('#add-variant-modal').find('label').eq(1).text("Variant 2");
      $('#add-variant-modal').find('label').eq(2).text("Variant 3");
    }

    $('#edit-variant-modal').find('label').eq(0).text("Variant 1");
    if($('#edit-variant-modal').find('.list-item').eq(1).hasClass('d-none')) {
      $('#edit-variant-modal').find('label').eq(2).text("Variant 2");
      $('#edit-variant-modal').find('label').eq(1).text("Variant 3");
    }
    else {
      $('#edit-variant-modal').find('label').eq(1).text("Variant 2");
      $('#edit-variant-modal').find('label').eq(2).text("Variant 3");
    }
}
function availability_table_render(type) {
  var table_data = `
  <table class="table table-borderless ability_table" data-plugin="bootstrapTable" id="table" 
      data-mobile-responsive="true">
      <thead>
          <tr>
              <th></th>
              <th>Available</th>
              <th>Location</th>
              <th>Variant</th>
              <th>Stock</th>
              <th>Low Stock</th>
              <th>Optimal Stock</th>
          </tr>
      </thead>
      <tbody id="table-row-border" class="contain-subrow">
  `;

  if($("#variant-table").find('tr').length == 2) {
    table_data += `
        <tr>
            <td></td>
            <td>` + $('#ability-table tr').eq(1).children().eq(1).html() + `</td>
            <td><span>West Side Location</span></td>
            <td><span><span></td>
            <td><span class="stock">0</span></td>
            <td> <input type="text" class="form-control low-stock" placeholder="0"> </td>
            <td> <input type="text" class="form-control optimal-stock" placeholder="0"></td>
        </tr>
        <tr class="main-row">
            <td data-toggle="collapse" data-target=".group-of-rows-1"><i class="la la-angle-down accordion-toggle"></i></td>
            <td>` + $('#ability-table tr').eq(2).children().eq(1).html() + `</td>
            <td><span>East Side Location</span></td>
            <td><span></span></td>
            <td><span class="stock">0</span></td>
            <td> <input type="text" class="form-control low-stock" placeholder="0"> </td>
            <td> <input type="text" class="form-control optimal-stock" placeholder="0"></td>
            <tr class="demo out collapse group-of-rows-1"> 
                <td class="subrow-dark hiddenRow"></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"><span class="subrow location-name">Storage room A</span></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"><span class="subrow location-name"></span></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><span class="stock">0</span></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control low-stock" placeholder="0"></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control optimal-stock" placeholder="0"></div></td>
            </tr>
            <tr class="demo out collapse group-of-rows-1"> 
                <td class="subrow-dark hiddenRow"></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"><span class="subrow location-name">Sales Floor</span></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1"><span class="subrow location-name"></span></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><span class="stock">0</span></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control low-stock" placeholder="0"></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-1" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control optimal-stock" placeholder="0"></div></td>
            </tr>
        </tr>
        <tr>
              <td></td>
              <td>` + $('#ability-table tr').eq(5).children().eq(1).html() + `</td>
              <td><span>South Side Location</span></td>
              <td><span></span></td>
              <td><span class="stock">0</span></td>
              <td> <input type="text" class="form-control low-stock" placeholder="0"> </td>
              <td> <input type="text" class="form-control optimal-stock" placeholder="0"></td>
        </tr>
    `
  }
  else {
    for(let i = 0; i < $("#variant-table").find('tr').length - 2; i ++) {
      table_data += `
          <tr>
              <td></td>
              <td>` + $('#ability-table tr').eq(1).children().eq(1).html() + `</td>
              <td><span>West Side Location</span></td>
              <td><span>` + $("#variant-table").find('tr').eq(i + 1).children().eq(0).text() + `<span></td>
              <td><span class="stock">0</span></td>
              <td> <input type="text" class="form-control low-stock" placeholder="0"> </td>
              <td> <input type="text" class="form-control optimal-stock" placeholder="0"></td>
          </tr>
      `;
    }
    for(let i = 0; i < $("#variant-table").find('tr').length - 2; i ++) {
      table_data += `
          <tr class="main-row">
            <td data-toggle="collapse" data-target=".group-of-rows-` + (i + 1) + `"><i class="la la-angle-down accordion-toggle"></i></td>
            <td>` + $('#ability-table tr').eq(1 + type).children().eq(1).html() + `</td>
            <td><span>East Side Location</span></td>
            <td><span>` + $("#variant-table").find('tr').eq(i + 1).children().eq(0).text() + `</span></td>
            <td><span class="stock">0</span></td>
            <td> <input type="text" class="form-control low-stock" placeholder="0"> </td>
            <td> <input type="text" class="form-control optimal-stock" placeholder="0"></td>
            <tr class="demo out collapse group-of-rows-1"> 
                <td class="subrow-dark hiddenRow"></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-` + (i + 1) + `1"></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-` + (i + 1) + `"><span class="subrow location-name">Storage room A</span></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-` + (i + 1) + `"><span class="subrow location-name"></span></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-` + (i + 1) + `" style="padding-left:0.75rem; padding-right:0.75rem;"><span class="stock">0</span></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-` + (i + 1) + `" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control low-stock" placeholder="0"></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-` + (i + 1) + `" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control optimal-stock" placeholder="0"></div></td>
            </tr>
            <tr class="demo out collapse group-of-rows-1"> 
                <td class="subrow-dark hiddenRow"></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-` + (i + 1) + `"></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-` + (i + 1) + `"><span class="subrow location-name">Sales Floor</span></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-` + (i + 1) + `"><span class="subrow location-name"></span></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-` + (i + 1) + `" style="padding-left:0.75rem; padding-right:0.75rem;"><span class="stock">0</span></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-` + (i + 1) + `" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control low-stock" placeholder="0"></div></td>
                <td class="subrow-dark hiddenRow"><div class="collapse group-of-rows-` + (i + 1) + `" style="padding-left:0.75rem; padding-right:0.75rem;"><input type="text" class="form-control optimal-stock" placeholder="0"></div></td>
            </tr>
          </tr>
      `;
    }
    for(let i = 0; i < $("#variant-table").find('tr').length - 2; i ++) {
      table_data += `
          <tr>
              <td></td>
              <td>` + $('#ability-table tr').eq(2 + type * 3).children().eq(1).html() + `</td>
              <td><span>South Side Location</span></td>
              <td><span>` + $("#variant-table").find('tr').eq(i + 1).children().eq(0).text() + `</span></td>
              <td><span class="stock">0</span></td>
              <td> <input type="text" class="form-control low-stock" placeholder="0"> </td>
              <td> <input type="text" class="form-control optimal-stock" placeholder="0"></td>
          </tr>
      `;
    }
  }
  table_data += `</tbody></table>`;
  $('#ability-table').html(table_data);
  event_format();
}