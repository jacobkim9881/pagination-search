$(document).ready(function () {
  var td_flag = 0;

  $('#all-table').on('all.bs.table', function(e) {
    $(this).removeClass('table-bordered');
    $('#all-table tr .collapse').removeClass('table-hover');
  });

  $('a[data-toggle="collapse"]').click(function () {
    var obj = $(this).find('i');
    if (obj.hasClass('la-angle-up')) {
      obj.removeClass('la-angle-up');
      obj.addClass('la-angle-down');
    } else {
      obj.addClass('la-angle-up');
      obj.removeClass('la-angle-down');
    }
  });

  $('#default-location-save').click(function () {
    $('#change-default-modal').modal('hide');
    notie.alert({ type: 'success', text: 'Updated default location' })
  });

  $('#content').off('click', 'tbody .col-1');
  $('#content').on('click', 'tbody .col-1', function(ev) {
    td_flag = 1;
  });

  $('#content').off('click', 'tbody td');
  $('#content').on('click', 'tbody td', function(ev) {
    if($(window).width() < 770) {
     }
     else {
      var $td = $(this).closest('td');
      var col = $td.parent().children("td").index($td);
      if(col == 0) {
        var obj = $(this).find('i');
        if (obj.hasClass('la-angle-up')) {
          obj.removeClass('la-angle-up');
          obj.addClass('la-angle-down');
        } else {
          obj.addClass('la-angle-up');
          obj.removeClass('la-angle-down');
        }
        td_flag = 1;
      }
     }    
  });
  $('#content').off('click', 'tbody tr');
  $('#content').on('click', 'tbody tr', function(ev) {
      if(td_flag == 1) {
        td_flag = 0;
        return; 
      }
      if (ev.target.nodeName !== 'I' && ev.target.nodeName !== 'A') {
          if($(window).width() < 770) {
           if($('#table tr').eq($("table tr").index(this)).hasClass("collapse")) {
             $('#ghost .title-item-name').text("sub-row" + $('.location-name')[$("table tr").index(this)-1].innerText);
             $('#ghost .edit-link')[0].click();
           }
            else {
              $('#ghost .title-item-name').text($('.location-name')[$("table tr").index(this)-1].innerText);
              $('#ghost .edit-link')[0].click();
            }
          }
          else {
            if($('#table tr').eq($("table tr").index(this)).hasClass("collapse")) {
              $('#ghost .title-item-name').text("sub-row" + $('#table tr').eq($("table tr").index(this)).find('td').eq(1).text());
              $('#ghost .edit-link')[0].click();
            }
            else {
              $('#ghost .title-item-name').text($('#table tr').eq($("table tr").index(this)).find('td').eq(1).text());
              $('#ghost .edit-link')[0].click();
            }
          }
      }
  });
  
});