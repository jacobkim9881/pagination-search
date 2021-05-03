var update_fields = [];
var cntrlIsPressed = false;
var shiftIsPressed = false;
var prev_row = -1;
var cur_row = -1;
var cur_element;
$(document).ready(function () {
  unsavedManager(true, ['#content-body input', '#content-body select'], '');
  // footerControl();
  let editEls = {
    "Product title": val => `<input type="text" class="w-100" value="${val}">`,
    "Category": val => `
          <select class="w-100" id="category_name" value="0" 
              data-plugin="select2" data-option="{}"
              data-placeholder="Select category">
              <option></option>
              <option value="Grandparent">Grandparent</option>
              <option value="Parent">Parent</option>
              <option value="Children">Children</option>
          </select>`,
    "Supplier": val => `<input type="text" class="w-100" value="${val}">`,
    "Expiration date": val => `
        <div class="input-group w-100">
          <input type="text" class="start-date" value="${val}">
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="i-con i-con-calendar"><i></i></i>
            </span>
          </div>
        </div>
    `,
    "Available for sale": val => `<input type="checkbox" checked=${val}>`,
    "Available for sale-label": val => `<input type="checkbox" checked=${val}>`,
    "Price": val => `
          <div class="input-group w-100 d-flex flex-nowrap">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon2">L£</span>
            </div>
            <input type="number" value="${val}" class="number-format w-100 price"
              aria-label="Recipient's username" aria-describedby="basic-addon2">
          </div>`,
    "Price-label": val => `<p style="text-align:left;">L£<span style="float:right;">${val}</span></p>`,
    "Cost": val => `
          <div class="input-group w-100 d-flex flex-nowrap">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon2">L£</span>
            </div>
            <input type="number" value="${val}" class="number-format w-100 cost"
              aria-label="Recipient's username" aria-describedby="basic-addon2">
          </div>`,
    "Cost-label": val => `<p class="w-100" style="text-align:left;">L£<span style="float:right;">${val}</span></p>`,
    "Charge taxes": val => `<input type="checkbox" checked=${val}>`,
    "Charge taxes-label": val => `<input type="checkbox" checked=${val}>`,
    "SKU": val => `<input type="text" class="w-100" value="${val}">`,
    "Barcode": val => `<input type="text" class="w-100" value="${val}">`,
    "Track stock": val => `<input type="text" class="w-100" value="${val}">`
  }
  // $(".number-format").keyup(function(e) {
  //   if(e.keyCode == 65 || e.keyCode == 17 || e.keyCode == 46 || e.keyCode == 190) {
  //     return;
  //   }
  //   $(this).val($(this).val().replace(/,/g, ''));
  //   $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  // });
  // $(".number-format").change(function() {
  //   $(this).val($(this).val().replace(/,/g, ''));
  //   $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  // });

  $('.start-date').fdatepicker({
    initialDate: '12-12-2020',
    format: 'M dd, yyyy',
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
  });

  $('.column-buttons').on('click', '.i-con-close', function () {
    $('footer').slideDown();
    $(this).parent().remove();
    $('.drop-down-field').find("button:contains('" + $(this).parent().text().trim() + "')").eq(0).attr('disabled', false);
    if ($(this).parent().text().trim() == "Product title") {
      $('tbody td:first-child').each(function () {
        $(this).parent().replaceWith(`<td class="table-fixed-layout">${$(this).parent().find('input').val()}</td>`)
      })
    }
    else {
      var row = $(this).parent().text().trim().toLocaleLowerCase().replace(" ", "-").replace(" ", "-");
      $('.' + row).addClass('d-none');
    }
  });

  $('.drop-down-field').on('click', 'button', function () {
    if ($(this).attr('disabled', false)) {
      $('footer').slideDown();
      $(this).attr('disabled', true);
      var btn_html = '<button class="btn btn-light btn-field mr-2">' + $(this).text() + '<i class="i-con i-con-close" ></i ></button>';
      $('.btn-all-field').append(btn_html);
      if ($(this).text().trim() == "Product title") {
        $('tbody tr td:first-child').each(function () {
          $(this).replaceWith('<td><input type="text" class="w-100" value="' + $(this).text() + '"></td>')
        });
      }
      else {
        var row = $(this).text().trim().toLocaleLowerCase().replace(" ", "-").replace(" ", "-");
        $('.' + row).removeClass('d-none');
      }
    }
  });

  $('.bulk-table').change(function () {
    $('footer').slideDown();
  });

  $('.save').click(function () {
    $(this).attr('disabled', true);
    notification('4 products saved successfully');
    $('#ghost .all-link')[0].click();
  });
  $('.bulk-table tbody td').click(function (ev) {
    if ($(this).hasClass('table-fixed-layout')) return;
    cur_row = $(this).closest('tr').index();
    if(shiftIsPressed == true) {
      $('.focus-border').removeClass('focus-border');
      update_fields = [];
      if(prev_row > cur_row) { var tmp = prev_row; prev_row = cur_row; cur_row = tmp;}
      for(let i = prev_row; i <= cur_row; i ++) {
        update_fields.push($('tbody tr').eq(i).children().eq($(this).index()));
        $('tbody tr').eq(i).children().eq($(this).index()).addClass('focus-border');
      }
    }
    else if(cntrlIsPressed == true) {
      $(this).addClass('focus-border');
      update_fields.push($(this));
    }
    else {
      if(ev.target.tagName == "input") return;
      if($(this).hasClass('focus-border')) return;

      $('.bulk-table td:not(.table-fixed-layout)').each(function () {
        if ($(this).hasClass('d-none')) return;
        var $input = $(this).find('select, input');
        if ($input.length == 0) return;
        if (editEls[$input.closest('table').find('th').eq($(this).index()).text() + '-label'] == undefined) {
          $(this).html($input.val())
        } else {
          $(this).html(editEls[$input.closest('table').find('th').eq($(this).index()).text() + '-label']($input.val()))
        }
      });
      $('.focus-border').removeClass('focus-border');
      update_fields = [];
      $(this).addClass('focus-border');
      update_fields.push($(this));
    }
    // $(this).addClass('selected');
    // $selecteds.push($(this));
    prev_row = $(this).closest('tr').index();
  })
  // $('.bulk-table tbody td').focusout(function (event) {
  //   if ($(this).hasClass('table-fixed-layout') || shift) return;
  //   $(this).removeClass('selected');
  //   $selecteds.splice($selecteds.indexOf($(this), 1));
  // })
  function toggleEdit($td) {
    if ($td.hasClass('table-fixed-layout')) return;
    $td.removeClass('selected');
    $('.bulk-table td:not(.table-fixed-layout)').each(function () {
      if ($(this).hasClass('d-none')) return;
      var $input = $(this).find('select, input');
      if ($input.length == 0) return;
      if (editEls[$input.closest('table').find('th').eq($(this).index()).text() + '-label'] == undefined) {
        $(this).html($input.val())
      } else {
        $(this).html(editEls[$input.closest('table').find('th').eq($(this).index()).text() + '-label']($input.val()))
      }
    });
    let text = $td.text();
    var select2_text = text;
    if ($td.find('p')) text = $td.find('span').text();
    else if ($td.find('input')) text = $td.find('input').attr('checked');
    $td.html(editEls[$td.closest('table').find('th').eq($td.index()).text()](text));
    $('#category_name').select2({
      width: "100%"
    });
    $('#category_name').val(select2_text).trigger('change');
    $('input').keyup(function() {
      for(let i in update_fields) {
        if(!update_fields[i].find('span').eq(0).hasClass("input-group-text"))
          update_fields[i].find('span').eq(0).text($(this).val());
      }
    });
    $('select').on('select2:select', function (e) {
      var data = e.params.data.text;
      for(let i in update_fields) {
        if($(this).parent() == update_fields[i]) continue;
        else update_fields[i].text(data);
      }
    });
  }
  $('.bulk-table tbody td').dblclick(function (ev) {
    if(ev.target.tagName == "INPUT") return;
    cur_element = $(this);
    toggleEdit($(this)) 
  });
  $('.bulk-table tbody td').keydown(function (event) {
    if (event.which == 16) shiftIsPressed = true;
    else if(event.which == 17) cntrlIsPressed = true;
  });
  $('.bulk-table tbody td').keyup(function (event) {
    if (event.which == 16) { shiftIsPressed = false; return; }
    else if (event.which == 17) { cntrlIsPressed = false; return; }
    else if (event.which == 13) { toggleEdit($(this)); return; }
    // if (event.which == 38) { //UP
    //   $('.bulk-table').find('td').focusout();
    //   if ($(this).parent().prev().length) {
    //     $(this).parent().prev().eq(0).find('td').eq($(this).index()).focus();
    //   }
    // }
    // if (event.which == 40) { //DOWN
    //   $('.bulk-table').find('td').focusout();
    //   if ($(this).parent().next().length) {
    //     $(this).parent().next().eq(0).find('td').eq($(this).index()).focus();
    //   }
    // }
    // if (shiftIsPressed) return;
    // if (event.which == 37) { //LEFT
    //   $prev = $(this).prevUntil('.d-none,.table-fixed-layout');
    //   if ($prev.length) $prev.eq(0).focus();
    // }
    // if (event.which == 39) { //RIGHT
    //   $next = $(this).nextUntil('.d-none,.table-fixed-layout');
    //   if ($next.length) $next.eq(0).focus();
    // }
    event.preventDefault();
  });
});
