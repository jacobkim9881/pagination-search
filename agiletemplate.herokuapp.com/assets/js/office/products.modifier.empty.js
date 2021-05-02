$(document).ready(function () {
  var visible_items = 1;
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
  $('.create').on('click', function() {
      $('#modifier-name').val("");
      $('#add-modifier-modal .save').attr('disabled', true);
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
  $('.add-row').on('click', function () {
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
      $('#sortable-options').addClass("scroll-container");
      $('#sortable-options').css("max-height", $('#sortable-options').height());
    }
    if(visible_items == 8) {
      $('.add-row').removeClass('text-primary');
      $('.add-row').addClass('text-grey');
    }
  });

  $('#add-modifier-modal input').on('keyup', function (e) {
    console.log(e.keyCode);
    $('.save').removeAttr('disabled');
  });
  $('.save').on('click', function () {
    notification($('#modifier-name').val() + " created successfully.");
    $('#ghost .all-link')[0].click();
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
    appendTo: '.list-row',
    containment: 'window',
    forcePlaceholderSize: true,
  })

});