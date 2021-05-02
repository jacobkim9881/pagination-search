$(document).ready(function () {

  $('.bootstrap-tables').on('all.bs.table', function (e) {
    $(this).removeClass('table-bordered');
  })

  $('#content-body').off('click', '.notification-table tr');
  $('#content-body').on('click', '.notification-table tr', function (ev) {
    if(ev.target.tagName == "A") {
      $('#ghost .title-item-name').text($(this).find('a').text());
      $('#ghost .edit-link')[0].click();
    }
  });
  $('#content-body').off('click', '.suppliers-table tr');
  $('#content-body').on('click', '.suppliers-table tr', function (ev) {
    if(ev.target.tagName == "A") {
      $('#ghost .title-item-name').text($(this).find('a').text());
      $('#ghost .edit-link')[0].click();
    }
  });

  $('#content-body').off('click', '.staff-table tr');
  $('#content-body').on('click', '.staff-table tr', function (ev) {
    if(ev.target.tagName == "A") {
      $('#ghost .title-item-name').text($(this).find('a').text());
      $('#ghost .edit-link')[0].click();
    }
  });

  $('#content-body').off('click', '.subscribers-table tr');
  $('#content-body').on('click', '.subscribers-table tr', function (ev) {
    if(ev.target.tagName == "A") {
      notification('Test notification sent successfully');
    } else {
      $('#edit-recipient-modal').modal('show');
    }
  })
});