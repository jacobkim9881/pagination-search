var change_flag = 0;
$(document).ready(function () {
  $('.duplicate').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .new-link')[0].click();
  });

  $('.print-label').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .print-link')[0].click();
  });
  
  $('.payment').click(function() {
    $('#ghost .payment-link')[0].click();
  });

  $('.cancel-all').click(function() {
    // if(change_flage) {
    //   $('#page-leave-modal').modal("show");
    // } else {
    //   if($(this).hasClass("back-page")) {
    //     $('#ghost .pending-link')[0].click();
    //   } else{
    //     $('#ghost .all-link')[0].click();
    //   }
    // }
    $('#ghost .all-link')[0].click();
  });

  $('.receive-intransit-billable').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .receive-transit-link')[1].click();
  });

  $('.receive-intransit-nbillable').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .receive-transit-link')[0].click();
  });

  $('.receive-partial-nbillable').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .receive-partial-link')[0].click();
  });

  $('.receive-partial-billable').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .receive-partial-link')[1].click();
  });
  
  $('.partial_nbillable').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .partial-link')[0].click();    
  });

  $('.partial_billable').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .partial-link')[1].click();    
  });

  $('.transferred_nbillable').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .transferred-link')[0].click();    
  });

  $('.transferred_billable').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .transferred-link')[1].click();    
  });

  $('.delete-to').click(function() {
    $('#delete-to-modal').modal("show");
  });

  $('#delete-to-modal .confirm').click(function() {
    notification("Transfer order deleted successfully.");
    $('#ghost .all-link')[0].click();
  });
  
  $('.mark-nbillable').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .transferred-link')[0].click();
  });
  
  $('.mark-billable').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .transferred-link')[1].click();
  });

  $('.cancel-intransit-nbillable').click(function() {
    $('#ghost .intransit-link')[0].click();
  });

  $('.cancel-intransit-billable').click(function() {
    $('#ghost .intransit-link')[1].click();
  });

  $('.cancel-partial-nbillable').click(function() {
    $('#ghost .partial-link')[0].click();
  });

  $('.cancel-partial-billable').click(function() {
    $('#ghost .partial-link')[1].click();
  });
});