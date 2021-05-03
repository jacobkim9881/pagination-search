$(document).ready(function () {
  $('#content-body tbody').on('click', 'tr', function (ev) {
    if (ev.target.nodeName !== 'I') {
      if($(window).width() < 770) {
        var result = $('.card-view-value')[4*($("table tr").index(this)-1)].firstChild.text;
        $('#ghost .title-item-name').text(result);
        $('#ghost .edit-link')[0].click();
      } else {
        $('#ghost .title-item-name').text($(this).children().eq(0).text());
        $('#ghost .edit-link')[0].click();
      }
    }
  });
  
  $('#table').on('all.bs.table', function (e) {
    $(this).removeClass('table-bordered');
  })
});