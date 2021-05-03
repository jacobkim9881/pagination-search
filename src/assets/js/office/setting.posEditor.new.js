$(document).ready(function () {
  $('.bootstrap-tables').on('all.bs.table', function(e) {
    $(this).removeClass('table-bordered');
  });

  unsavedManager(true, ['#content-body input'], '');
  var featureName = '';
  $('#info-container input').keyup(function() {
    featureName = $(this).val();
  });
  var drag_index, drag_flag = -1, name;
  var tr_element, posX, posY;

  $('footer .save').off('click');
  $('footer .save').click(function() {
    notification('<b>'+ featureName + '</b>' + ' featured list added successfully');
    $('footer .save').attr('disabled', true);
    $('#ghost .all-link')[0].click();
  });
  
  $('table tr').on('mousedown', function(e) {
    $('#render_div').html(`<div  class="drag-cart-item drag-element animate fadeIn" style="display: flex; position: fixed; text-align:center; z-index: 2002 !important; 
                      width: ${$('.pos-element').width() - 10}px; left: ${e.pageX - 30}px; top: ${e.pageY - 25}px;">
                        <span style="margin:auto">${$(this).find('.name').children().eq(0).text()}</span>
                  </div>`);
    $('#render_div').hide();
    $('#render_div').show();
    $('#pos-parent').addClass('z-index-change');
    tr_element = $(this);
    $(this).animate({ opacity: 0 }, 150);
    posX = e.pageX;
    posY = e.pageY;
    $('#modal-back').show();
  });
  $('table tr').draggable({
      helper: function(event) {
        $('#render_div').hide();
          $('#pos-parent').addClass('z-index-change');
          $('#modal-back').show();
          
          var tr_index = $('table tr').index($(this));
          tr_element = $('table tr').eq(tr_index);
          let result_element = $('<div class="drag-cart-item" style="display: flex; position: fixed; text-align:center; z-index: 2002 !important; cursor: grab;"><span style="margin:auto"></span></div>').find('span').append($(event.target).closest('tr td.name').clone().children().eq(0)).end().insertAfter($('#info-card')).addClass('drag-element').css("width", $('.pos-element').width() - 10).css("max-height", $('.pos-element').height());
          drag_flag = 0;
          return result_element;
      },
      cursorAt: {
          left: 30,
          bottom: 20
      },
      revertDuration: 300,
      cursor: 'move',
      distance: 0,
      delay: 30,
      scope: 'cart-item',
      revert: 'invalid'
  });
  $('.pos-element').on('mousedown', function(e) {
    drag_index = $('.pos-element').index($(this));
    $('#render_div').html(`<div  class="drag-cart-item drag-element animate fadeIn" style="display: flex; position: fixed; text-align:center; z-index: 2002 !important; 
                      width: ${$('.pos-element').width() - 10}px; left: ${e.pageX - 30}px; top: ${e.pageY - 25}px; min-height: 48px;">
                        <span style="margin:auto">${$(this).find('span').eq(0).text()}</span>
                  </div>`);
    $('#render_div').hide();
    if($(this).hasClass('ui-draggable')) {
      console.log('mousedown');
      $('#render_div').show();
      $('.pos-element').eq(drag_index).animate({ opacity: 0 }, 100);
      $('#pos-parent').addClass('z-index-change');
      $('#modal-back').show();
      $('.trash-icon').css("animation-name", "");
      $('.trash-icon').css("left", "57%");
      $('.trash-icon').show();
      drag_flag = 1;
    }
  });
  $('.trash-icon').droppable({
    scope: 'cart-item',
    activeClass: 'active',
    hoverClass: 'trash-hover',
    tolerance: 'pointer',
    drop: function(event, ui) {
        $('.pos-element').eq(drag_index).css("background-color", "#7CE7AC");
        $('.pos-element').eq(drag_index).css("color","#FFFFFF");
        $('.pos-element').eq(drag_index).addClass("green");
        $('.pos-element').eq(drag_index).removeClass("ui-draggable");
        $('.pos-element').eq(drag_index).draggable({disabled: true});
        $('.pos-element').eq(drag_index).find("span").eq(0).text("+");
        $('#pos-parent').removeClass('z-index-change');
        $('#modal-back').hide();
        $('footer .save').attr('disabled', false);
        var name = $('.drag-cart-item').find('span').eq(0).text();
        $('table').append("<tr class=\"ui-draggable ui-draggable-handle\"><td class=\"name\"><b>" + name + "</b><br><span class=\"text-muted\">SKU 1251-44 | 1262374214126</span></td><tr>").draggable({
          helper: function(event) {
              $('#render_div').hide();
              $('#pos-parent').addClass('z-index-change');
              $('#modal-back').show();
              
              var tr_index = $('table tr').index($(this));
              tr_element = $('table tr').eq(tr_index);
              let result_element = $('<div class="drag-cart-item" style="display: flex; position: fixed; text-align:center; z-index: 2002 !important;"><span style="margin:auto"></span></div>').find('span').append($(event.target).closest('tr td.name').clone().children().eq(0)).end().insertAfter($('#info-card')).addClass('drag-element').css("width", $('.pos-element').width() - 10).css("max-height", $('.pos-element').height());
              drag_flag = 0;
              return result_element;
          },
          cursorAt: {
              left: 30,
              bottom: 20
          },
          revertDuration: 300,
          cursor: 'grabbing',
          distance: 0,
          delay: 30,
          scope: 'cart-item',
          revert: 'invalid'
        });;
        drag_flag = -1;
        $('.trash-icon').removeClass('trash-hover');
        console.log('asdf');
        $('.trash-icon').css("animation-name", "sparkle");
        $('.trash-icon').css("animation-duration", "200ms");  
    },
  });
  $('.droppable').droppable({
    scope: 'cart-item',
    activeClass: 'active',
    hoverClass: 'hover',
    tolerance: 'pointer',
    drop: function(event, ui) {
      if(drag_flag == 0) {
        var name = $('.drag-cart-item').find('span').eq(0).text();
        $('footer .save').attr('disabled', false);
        $(event.target).find('span').eq(0).text(name);
        $(event.target).addClass('ui-draggable');
        $(event.target).closest('.droppable').removeClass('green');
        $(event.target).closest('.droppable').css("background-color", "#FFFFFF");
        $(event.target).closest('.droppable').css("color", "#647787");
        $(event.target).draggable({ disabled: false });
        $(event.target).draggable({
          helper: function(event) {
            $('#render_div').hide();
            $('#pos-parent').addClass('z-index-change');
            $('#modal-back').show();
            $('.trash-icon').css("animation-name", "");
            $('.trash-icon').css("left", "57%");
            $('.trash-icon').show();
            let result_element = $('<div class="drag-cart-item" style="display: flex; position: fixed; text-align:center; z-index: 2002 !important;"><span style="margin:auto"></span></div>').find('span').append($(event.target).closest('span')).end().insertAfter($('#info-card')).addClass('drag-element').css("width", $('.pos-element').width() - 10).css("min-height", "48px").css("max-height", $('.pos-element').height());
            
            drag_flag = 1;
            $('.pos-element').eq(drag_index).css("background-color", "#7CE7AC");
            $('.pos-element').eq(drag_index).addClass("green");
            $('.pos-element').eq(drag_index).removeClass("ui-draggable");
            $('.pos-element').eq(drag_index).append("<span style=\"margin:auto;\">+</span>");
            return result_element;
          },
          cursorAt: {
              left: 30,
              bottom: 20
          },
          revertDuration: 300,
          cursor: 'grabbing',
          distance: 0,
          delay: 30,
          scope: 'cart-item',
          revert: 'invalid'
        });
        tr_element.fadeOut(1000);
        tr_element.remove();
        drag_flag = -1;
      }
      else{
        if($(event.target).hasClass('ui-draggable')) {
          var name = $('.drag-cart-item').find('span').eq(0).text();
          var name1 = $(event.target).find('span').eq(0).text();
          $(event.target).find('span').eq(0).text(name);
          $(event.target).removeClass('green');
          $(event.target).css("background-color", "#FFFFFF");
          $(event.target).css("color", "#647787");
          $('.pos-element').eq(drag_index).find('span').eq(0).text(name1);
          $('.pos-element').eq(drag_index).removeClass('green');
          $('.pos-element').eq(drag_index).addClass('ui-draggable');
          $('.pos-element').eq(drag_index).css("background-color", "#FFFFFF");
          $('.pos-element').eq(drag_index).css("color", "#647787");
        }
        else {
          var name = $('.drag-cart-item').find('span').eq(0).text();
          $('.pos-element').eq(drag_index).css("background-color", "#7CE7AC");
          $('.pos-element').eq(drag_index).css("color", "#FFFFFF");
          $('.pos-element').eq(drag_index).addClass("green");
          $('.pos-element').eq(drag_index).find("span").eq(0).text("+");
          $('.pos-element').eq(drag_index).removeClass('ui-draggable');
          $('.pos-element').eq(drag_index).draggable({ disabled: true });
          $(event.target).find('span').eq(0).text(name);
          $(event.target).removeClass('green');
          $(event.target).addClass('ui-draggable');
          $(event.target).draggable({ disabled: false });
          $(event.target).css("background-color", "#FFFFFF");
          $(event.target).css("color", "#647787");
          $(event.target).draggable({
            helper: function(event) {
              $('#render_div').hide();
              $('#pos-parent').addClass('z-index-change');
              $('#modal-back').show();
              $('.trash-icon').css("animation-name", "");
              $('.trash-icon').css("left", "57%");
              $('.trash-icon').show();
              let result_element = $('<div class="drag-cart-item" style="display: flex; position: fixed; text-align:center; z-index: 2002 !important;"><span style="margin:auto"></span></div>').find('span').append($(event.target).closest('span')).end().insertAfter($('#info-card')).addClass('drag-element').css("width", $('.pos-element').width() - 10).css("min-height", "48px");
              drag_flag = 1;
              $('.pos-element').eq(drag_index).css("background-color", "#7CE7AC");
              $('.pos-element').eq(drag_index).addClass("green");
              $('.pos-element').eq(drag_index).removeClass("ui-draggable");
              $('.pos-element').eq(drag_index).append("<span style=\"margin:auto;\">+</span>");
              return result_element;
            },
            cursorAt: {
                left: 30,
                bottom: 20
            },
            revertDuration: 300,
            cursor: 'grabbing',
            distance: 0,
            delay: 30,
            scope: 'cart-item',
            revert: 'invalid'
          });
        }
        drag_flag = -1;
      }
    },
  });
  $(document).on('mouseup', function(e) {
      $('#modal-back').hide();
      $('#render_div').hide();
      tr_element.animate({ opacity: 1 }, 150);
      if(drag_flag == 1) {
          var name = $('.drag-cart-item').find('span').eq(0).text();
          $('.pos-element').eq(drag_index).animate({ opacity: 1 }, 100);
          $('.pos-element').eq(drag_index).removeClass("green");
          $('#pos-parent').removeClass('z-index-change');
          $('.pos-element').eq(drag_index).removeClass('green');
          $('.pos-element').eq(drag_index).addClass('ui-draggable');
          $('.pos-element').eq(drag_index).css("background-color", "#FFFFFF");
          $('.pos-element').eq(drag_index).css("color", "#647787");
          $('.pos-element').eq(drag_index).find('span').eq(0).text(name);
          var off_x = e.pageX - $('.trash-icon').offset().left;
          var off_y = e.pageY - $('.trash-icon').offset().top;
          if(off_x < 0 || off_x > $('.trash-icon').width() || off_y < 0 || off_y > $('.trash-icon').height())
          {
            drag_flag = -1;
            $('.trash-icon').css("animation-name", "normal-sparkle");
          }
      }
  });
  (function ($) {
    $('#composite-product-search').keyup(function () {
        var rex = new RegExp($(this).val(), 'i');
        $('.searchable tr').hide();
        $('.searchable tr').filter(function () {
            return rex.test($(this).text());
        }).show();
    })
  }(jQuery));

});