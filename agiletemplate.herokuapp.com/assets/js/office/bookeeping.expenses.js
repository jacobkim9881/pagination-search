$(document).ready(function() {
  setTimeout(() => {
    event_format();
  }, 1000);
});
function event_format() {
    var delete_row, row_id;
    $('.delete').click(function() {
      delete_row = $(this).parent().parent().parent().parent();
      row_id = delete_row.data('index');
      $('.sale-name').text(delete_row.find('td').eq(1).text());
      $('#delete-modal').modal("show");
    });
    $('#delete-modal .confirm').click(function() {
      $('#table').bootstrapTable('remove', {
        field: '$index',
        values: [row_id]
      });
      delete_row.remove();
    });

    $('#table tbody>tr').click(function(ev) {
      if(ev.target.tagName == "I") {
        return;
      }
      if($(ev.target).hasClass("payment") || $(ev.target).hasClass("view") || $(ev.target).hasClass("delete")) return;
      if($(this).find('.ref-no').text().indexOf("PO") >= 0) {
        $('#ghost .po-link')[0].click();
      }
      else if($(this).find('.ref-no').text().indexOf("TO") >= 0) {
        $('#ghost .to-link')[0].click();
      }
      else if($(this).find('.ref-no').text().indexOf("BI") >= 0) {
        if($(this).find('.la-circle').hasClass("circle-warning")) $('#ghost .bi-pending-link')[0].click();
        else $('#ghost .bi-paid-link')[0].click();
      }
      else if($(this).find('.ref-no').text().indexOf("EX") >= 0) {
        $('#ghost .ex-details-link')[0].click();
      }
    });
    $('.view').click(function() {
      if($(this).parent().parent().parent().parent().find('.ref-no').text().indexOf("PO") >= 0) {
        $('#ghost .po-link')[0].click();
      }
      else if($(this).parent().parent().parent().parent().find('.ref-no').text().indexOf("TO") >= 0) {
        $('#ghost .to-link')[0].click();
      }
      else if($(this).parent().parent().parent().parent().find('.ref-no').text().indexOf("BI") >= 0) {
        if($(this).parent().parent().parent().parent().find('.la-circle').hasClass("circle-warning")) $('#ghost .bi-pending-link')[0].click();
        else $('#ghost .bi-paid-link')[0].click();
      }
      else if($(this).parent().parent().parent().parent().find('.ref-no').text().indexOf("EX") >= 0) {
        $('#ghost .ex-details-link')[0].click();
      }
    });
    console.log("Initialized.");
}