$(document).ready(function () {
  var isCash, paymentName = $('#ghost .title-item-name').text() == '' ? 'Cash(LBP)' : $('#ghost .title-item-name').text();
  $('#title').text('Edit ' + paymentName);
  if (paymentName.search('Cash') < 0) {
    isCash = false;
  } else {
    isCash = true;
    $('footer .delete').hide();
  }

  $('#delete-modal .continue').click(function() {
    notification(paymentName + ' deleted successfully.');
    $('footer .save').attr('disabled', true);
    $('#ghost .all-link')[0].click();      
  });

  $('.delete-name').text(paymentName);
  unsavedManager(true, ['#content-body input'], 'Payment type updated successfully', !isCash, '<b>' + paymentName + '</b> deleted successfully');
  $('footer').show();
  
});