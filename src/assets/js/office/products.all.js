var delete_row = [];
var checked_count = 0;
$(document).ready(function () {
  var myInterval;
  var modal_height = 0;
  $('.carousel').carousel({
    interval: false
  });
  $('#import-start').off('click');
  $('#import-start').on('click', function () {
    clearInterval(myInterval);
    $('.progress-bar').width(0);
    $('.carousel-item').removeClass('active');
    $('.carousel-item').eq(0).addClass('active');
    if(modal_height != 0) {
      $('.close-modal').removeClass('mb-3');
      $('.carousel-inner').height(modal_height);
      $('.carousel-item').eq(0).height(modal_height);
    }
  });
  $('.close-modal').off('click');
  $('.close-modal').on('click', function() {
    $('.progress-bar').width(0);
    $('.carousel-item').removeClass('active');
    $('.carousel-item').eq(0).addClass('active');
    $('.close-modal').removeClass('mb-3');
  });
  $('.carousel-control').click(function () {
    if(modal_height == 0) modal_height = $('.carousel-item').eq(0).height();
  });
  $('#import-product-start').click(function () {
      var percent = 0;
      myInterval = setInterval(function () {
          percent < 100 ? percent++ : clearInterval(myInterval);
          $('.progress-bar').css('width', percent + '%');
          $('.progress-bar-percent').text(percent + '% complete');
      }, 50);
  });

  $('#toolbar').hide();

  $('.create-order').click(function () {
    $('#ghost .purchase-link')[0].click();
  });

  $('.stock-adjust').click(function () {
    $('#ghost .stock-link')[0].click();
  });

  $('.duplicate-product').click(function () {
    $('#ghost .new-link')[0].click();
  });

  $('#btn-delete').click(function () {
    var all_table = $('#table');
    for(let i in delete_row) {
      console.log($('tbody tr').eq(delete_row[i]));
      $('tbody tr').eq(delete_row[0]).remove();
      all_table.bootstrapTable('remove', {
        field: '$index',
        values: [delete_row[0]]
      });
    }
    $('#delete-modal').hide();
    notification('1 product deleted successfully');
    event_format();
  });

  $('#btn-multi-delete').click(function () {
    var selected_count = parseInt($('#selected-count').text());
    $('#selected-cnt').val(selected_count);
    if (selected_count == 1) {
      $('#modal-multi-title').html('Delete ' + selected_count + ' product');
      $('#body-title').html('Are you sure you about this product? This can’t be undone.');
    } else {
      $('#modal-multi-title').html('Delete ' + selected_count + ' products');
      $('#body-title').html('Are you sure you about these products? These can’t be undone.');
    }
    $('#multi-delete-modal').modal('show');
    delete_row = [];
    for(let i in $('input[type="checkbox"]')) {
      if($('input[type="checkbox"]').eq(i).prop("checked")) {
        let rowid = $('input[type="checkbox"]').eq(i).closest('tr').data('index');
        if(rowid >= 0)
          delete_row.push(rowid);
        console.log(delete_row);
      }
    }
  });

  $('#btn-delete-confirm').click(function () {
    $('#multi-delete-modal').modal('hide');
    $('#toolbar').hide();
    var all_table = $('#table');
    for(let i in delete_row) {
      $('tbody tr').eq(delete_row[0]).remove();
      all_table.bootstrapTable('remove', {
        field: '$index',
        values: [delete_row[0]]
      });
    }
    event_format();
    var selected_cnt = parseInt($('#selected-cnt').val());
    if (selected_cnt == 1) {
      notification('1 product deleted successfully');
    } else {
      notification(selected_cnt + ' products deleted successfully');
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
  setTimeout(() => {
    event_format()
  }, 1000);
});

function event_format() {
  $('td[data-toggle="collapse"]').click(function () {
    console.log('a');
    var obj = $(this).find('i');
    if (obj.hasClass('la-angle-up')) {
      obj.removeClass('la-angle-up');
      obj.addClass('la-angle-down');
    } else {
      obj.addClass('la-angle-up');
      obj.removeClass('la-angle-down');
    }
  });
  
  $('.delete').click(function () {
    delete_row = [];
    var cur_row = $(this).closest('tr');
    if(cur_row.hasClass("main-row")) {
      let rowid = cur_row.data('index');
      delete_row.push(rowid);
      let data_target = cur_row.children().eq(0).attr("data-target");
      rowid = $('tr'+data_target).data('index');
      delete_row.push(rowid);
    }
    else {
      let rowid = $(this).closest('tr').data('index');
      delete_row.push(rowid);
    }
    $('#delete-modal').modal('show');
  });

  $('#table tbody tr td').click(function (ev) {
    if (ev.target.nodeName !== 'I' && ev.target.nodeName !== 'INPUT' && ev.target.nodeName !== 'A' && ($(this).attr("data-toggle") != "collapse")) {
      $('#ghost .edit-link')[0].click();      
    }
  });
  
  $('.edit').click(function () {
    $('#ghost .title-item-name').text($(this).closest('tr').children().eq(2).text());
    $('#ghost .edit-link')[0].click();
  });

  $('.create-order').click(function () {
    $('#ghost .title-item-name').text($(this).closest('tr').children().eq(2).text());
    $('#ghost .purchase-link')[0].click();
  });

  $('.stock-adjust').click(function () {
    $('#ghost .title-item-name').text($(this).closest('tr').children().eq(2).text());
    $('#ghost .stock-link')[0].click();
  });

  $('.duplicate-product').click(function () {
    $('#ghost .title-item-name').text($(this).closest('tr').children().eq(2).text());
    $('#ghost .new-link')[0].click();
  });

  $('#index-page').on('change', 'input:checkbox', function (e) {
    if(e.target == $('#check-all')[0]) {
      if($(e.target).prop("checked")) {
        $('#table').find('tr').find('input:checkbox').prop("checked", true);
        // $('#table').find('tr').find('input:checkbox').trigger('change');
        checked_count = $('#table').find('tr').find('input:checkbox').length - 1;
      }
      else {
        $('#table').find('tr').find('input:checkbox').prop("checked", false);
        checked_count = 0;
      }
      $('#selected-count').text(checked_count);
      if (checked_count > 0) {
        $('#toolbar').slideDown();
      } else {
        $('#toolbar').slideUp();
      }
      return;
    }

    if($(e.target).prop("checked")) checked_count ++;
    else checked_count --;
    $('#selected-count').text(checked_count);
    if (checked_count > 0) {
      $('#toolbar').slideDown();
    } else {
      $('#toolbar').slideUp();
    }
  });
}