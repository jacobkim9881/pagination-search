$(document).ready(function() {
    $('#delete-modal .confirm').click(function() {
        $('#ghost .all-link')[0].click();
    });
    $('footer .cancel').click(function() {
        $('#ghost .all-link')[0].click();
    });
    $('footer .payment').click(function() {
        $('#ghost .payment-link')[0].click();
    });
    $('.print-label').click(function() {
        $('#ghost .title-item-name').text($('#title').text());
        if($('.badge-md').text() == "Pending")
            $('#ghost .back-url').text("/bookeeping/expenses_bill_details_pending");
        else if($('.badge-md').text() == "Paid")
            $('#ghost .back-url').text("/bookeeping/expenses_bill_details_paid");
        $('#ghost .print-link')[0].click(); 
    });
    $('.expand-icon').click(function() {
      if($(this).text() == "↓") $(this).text("→");
      else if($(this).text() == "→") $(this).text("↓");
    });
    $('footer .edit').click(function() {
        $('#ghost .edit-link')[0].click();
    });
});