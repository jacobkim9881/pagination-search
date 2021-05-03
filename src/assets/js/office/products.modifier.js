$(document).ready(function () {
  var visible_items = 1;
  var isEdit = false;
  var delete_element, add_element;
  $('.select-availability').selectpicker();
  $('.select-availability').on('change', function() {
        
    $('.filter-option.pull-left').eq(0).css("color", "black");
    var thisObj = $(this);
    var isAllSelected = thisObj.find('option[value="All"]').prop('selected');
    var lastAllSelected = $(this).data('all');
    var selectedOptions = (thisObj.val())?thisObj.val():[];
    var allOptionsLength = thisObj.find('option[value!="All"]').length;
    var selectedOptionsLength = selectedOptions.length;
    
    if(isAllSelected == lastAllSelected){
    
        if($.inArray("All", selectedOptions) >= 0){
            selectedOptionsLength -= 1;
        }
        if(allOptionsLength <= selectedOptionsLength){
            thisObj.find('option[value="All"]').prop('selected', true).parent().selectpicker('refresh');
            isAllSelected = true;
        }else{       
            thisObj.find('option[value="All"]').prop('selected', false).parent().selectpicker('refresh');
            for(let i in selectedOptions) {
                thisObj.find(`option[value="${selectedOptions[i]}"]`).prop('selected', true);
            }
            isAllSelected = false;
        }        
    }else{   		
        thisObj.find('option').prop('selected', isAllSelected).parent().selectpicker('refresh');
    }
    $(this).data('all', isAllSelected);
  }).trigger("change");
  format();
  function format() {
    $('input').val('');
    $('.save').attr('disabled', true);
    $('.cancel').attr('disabled', true);
    $('.delete').addClass('d-none');
    $('#modifier-edit-title').text('Create modifier');
    $('.delete').addClass('d-none');
    $('.modifier-content').width($('.modifier-edit').width());
    $('.delete').addClass('d-none');
    // $('#modifier-name-container').removeClass('d-none');
    if(!$('footer').hasClass('d-none')) $('footer').addClass('d-none');
    $('.mod-name').val("");
    $('.mod-val').val("");
    var temp = 1;
    while (!$('#sortable-options').find('.list-item').eq(temp).hasClass('d-none')) {
      if (temp >= 8) {
        break;
      }
      $('#sortable-options').find('.list-item').eq(temp).addClass('d-none');
      temp++;
    }
    isEdit = false;
  }
  $('.modifier-edit').keyup(function () {
    $('.save').attr('disabled', false);
    $('.cancel').attr('disabled', false);
    $('.delete').attr('disabled', false);
  });

  $('.save').click(function () {
    if (isEdit) {
      notification($('#modifier-name').val() + ' updated successfully');
    } else {
      add_element = "<tr data-id=\"1\"> <td class=\"js-handle\"> <i class=\"i-con i-con-menu\"><i></i></i> </td> <td> <span class=\"font-weight-bold\">" + $('#modifier-name').val() + "</span> </td><td> <span class=\"text-secondary\">Option 1, Option 2, Option 3</span> </td>  <td class=\"text-right td-dot\"> <div class=\"item-action dropdown\"> <a href=\"#\" data-toggle=\"dropdown\" class=\"text-muted a-more\"><i class=\"i-con i-con-more\"><i></i></i></a> <div class=\"dropdown-menu dropdown-menu-right bg-dark\" role=\"menu\"> <a class=\"dropdown-item edit-item\"> <i class=\"la la-pen h5\"></i> Edit </a> <div class=\"dropdown-divider\"></div> <a class=\"dropdown-item delete-item\"  data-toggle=\"modal\" data-target=\#delete-modal\"> <i class=\"i-con i-con-trash\"><i></i></i> Delete </a> </div> </div> </td> </tr>";
      console.log(add_element);
      $('#sortable-table-later').append(add_element);
      notification($('#modifier-name').val() + ' added successfully');
    }
    format();
  });
  $('.add-row').on('click', function () {
    console.log('add-row');
    console.log($('#sortable-options').find('.list-item'));
    var temp = 1;
    while (!$('#sortable-options').find('.list-item').eq(temp).hasClass('d-none')) {
      if (temp >= 8) {
        break;
      }
      temp++;
    }
    $('#sortable-options').find('.list-item').eq(temp).find('.mod-name').val("");
    $('#sortable-options').find('.list-item').eq(temp).find('.mod-val').val("");
    $('#sortable-options').find('.list-item').eq(temp).removeClass('d-none');
    visible_items ++;
    if(visible_items >= 4) {
      $('#sortable-options').addClass("scroll");
      $('#sortable-options').css("max-height", $('#sortable-options').height());
    }
    if(visible_items == 8) {
      $('.add-row').removeClass('text-primary');
      $('.add-row').addClass('text-grey');
    }
  });

  $('#delete-modal .continue').click(function() {
    delete_element.parent().remove();
    notification($('#modifier-name').val() + " deleted successfully");
    format();
  });

  $('.edit').click(function () {
    console.log('edit');
    isEdit = true;
    delete_element = $(this).parent().parent().parent();
    $('#modifier-edit-title').text('Edit modifier');
    $('#modifier-name').val(delete_element.find('.mod-name').children().eq(0).text());
    $('.option-name').val('Extra Cheese');
    $('.option-value').val('1,000');
    $('footer').removeClass("d-none");
    $('.save').attr('disabled', true);
    $('.cancel').attr('disabled', false);
    $('.delete').attr('disabled', false);
    $('.delete').removeClass('d-none');
  });

  $('.delete-item').click(function () {
    console.log('delete');
    delete_element = $(this).parent().parent().parent();
    console.log(delete_element);
    var parent_catname = delete_element.find('.mod-name').children().eq(0).text();
    $('#modifier-name').val(parent_catname);
    $('#delete-modal').modal('show');
  });

  $('.leave').click(function () {
    format();
  })

  $('.cancel').click(function() {
    if(!$('footer .save').prop('disabled')) {
      $('#leave-modal').modal('show');
    } else {
      format();
    }
  });

  $('.continue').click(function() {
    format();
  });

  $('.modifier-edit').change(function () {
    $('footer').removeClass("d-none");
    $('.save').attr('disabled', false);
    $('.cancel').attr('disabled', false);
    $('.delete').attr('disabled', false);
  });

  $('.modifier-edit').keyup(function () {
    $('footer').removeClass("d-none");
    $('.save').attr('disabled', false);
    $('.cancel').attr('disabled', false);
    $('.delete').attr('disabled', false);
  });

  $('body').on('click', '.add-modifier-delete', function () {
    var first_item = $(this).parent().parent().parent()[0];
    if($('#sortable-options .list-item')[0] == first_item) {
      $(this).parent().parent().parent().find('input').val('');
    } else {
      $(this).parent().parent().parent().addClass('d-none');
    }
    $('.add-row').removeClass('text-grey');
    $('.add-row').addClass('text-primary');
    visible_items --;
    if(visible_items < 4) {
      $('#sortable-options').removeClass("scroll-container");
    }
  });
  $('.delete').on('click', function() {
    $('#delete-modal').modal('show');
  });
  $(".number-format").on('keyup', function (e) {
    if(e.keyCode == 65 || e.keyCode == 17) {
      return;
    }
    $(this).val($(this).val().replace(/,/g, ''));
    $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  });
});

$(function() {
  $(".list-row").sortable({
    items: ".list-item",
    revert: 300,
    cursor: 'grabbing',
    helper: 'clone',
    appendTo: 'body',
    containment: 'window',
  })

});