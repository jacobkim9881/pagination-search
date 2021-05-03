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
  $('#delete-modal #delete-expense').click(function() {
    $('#table').bootstrapTable('remove', {
      field: '$index',
      values: [row_id]
    });
    delete_row.remove();
  });

  $('#table tbody>tr').click(function(ev) {
    if(ev.target.tagName == "I") return;
    if($(ev.target).attr("data-toggle") == "collapse") return;
    if($(ev.target).children().eq(0).hasClass("dropdown")) return;
    if($(ev.target).hasClass("dropdown-item")) return;

    if($(this).find(".la-circle").eq(0).hasClass("circle-success")) $('#ghost .paid-link')[0].click();
    if($(this).find(".la-circle").eq(0).hasClass("circle-warning")) $('#ghost .pending-link')[0].click();
    if($(this).find(".la-circle").eq(0).hasClass("circle-danger")) $('#ghost .refunded-link')[0].click();
    if($(this).find(".la-circle").eq(0).hasClass("circle-refund")) $('#ghost .refund-partial-link')[0].click();
  });

  $('.view').click(function() {
    if($(this).closest('tr').find(".la-circle").eq(0).hasClass("circle-success")) $('#ghost .paid-link')[0].click();
    if($(this).closest('tr').find(".la-circle").eq(0).hasClass("circle-danger")) $('#ghost .refunded-link')[0].click();
    if($(this).closest('tr').find(".la-circle").eq(0).hasClass("circle-refund")) $('#ghost .refund-partial-link')[0].click();
    if($(this).closest('tr').find(".la-circle").eq(0).hasClass("circle-warning")) $('#ghost .pending-link')[0].click();
  });
  $('.refund').click(function() {
    $('#ghost .back-url').text("/bookeeping/sales_all");
    $('#ghost .refund-sale-link')[0].click();
  });
  $('td[data-toggle="collapse"]').click(function () {
    var obj = $(this).find('i');
    if (obj.hasClass('la-angle-up')) {
      obj.removeClass('la-angle-up');
      obj.addClass('la-angle-down');
    } else {
      obj.addClass('la-angle-up');
      obj.removeClass('la-angle-down');
    }
  });
}