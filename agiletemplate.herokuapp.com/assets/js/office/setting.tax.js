$(document).ready(function () {
  $('#content').off('click', 'tbody tr');
  $('#content').on('click', 'tbody tr', function(ev) {
      if (ev.target.nodeName !== 'I' && ev.target.nodeName !== 'A') {
          if($(window).width() < 770) {
              $('#ghost .title-item-name').text($('.location-name')[$("table tr").index(this)-1].innerText);
              $('#ghost .edit-link')[0].click();
          }
          else {
              $('#ghost .title-item-name').text($('#table tr').eq($("table tr").index(this)).find('td').eq(1).text());
              $('#ghost .edit-link')[0].click();
          }
      }
  });
  $('#taxes-delete-modal .continue').click(function () {
    notification("<b>VAT 11%</b> deleted successfully");
  });

  $('#table-taxes').on('all.bs.table', function (e) {
    $(this).removeClass('table-bordered');
  });
});
