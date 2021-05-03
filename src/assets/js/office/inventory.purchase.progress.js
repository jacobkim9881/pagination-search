var currency_type = 2;
var change_flage = 0;
$(document).ready(function () {
  $('.expand-icon').click(function() {
    if($(this).text() == "↓") $(this).text("→");
    else if($(this).text() == "→") $(this).text("↓");
  });

  $('.cancel').click(function() {
    if(change_flage) {
      $('#page-leave-modal').modal("show");
    } else {
      if($(this).hasClass("back-page")) {
        $('#ghost .pending-link')[0].click();
      } else{
        $('#ghost .all-link')[0].click();
      }
    }
  });

  $('#page-leave-modal .leave').click(function() {
    if($('.cancel').hasClass("back-page")) {
      $('#ghost .pending-link')[0].click();
    } else{
      $('#ghost .all-link')[0].click();
    }
  });

  $('.delete').click(function() {
    $('#delete-draft-modal').modal('show');
  });

  $('#delete-draft-modal .confirm').click(function() {
    notification("Purchase order deleted successfully.");
    $('#ghost .all-link')[0].click();
  });

  $('.edit').click(function() {
    $('#ghost .edit-link')[0].click();
  });

  $('.approve').click(function() {
    $('#ghost .pending-link')[0].click();
  });

  $('.payment').click(function() {
    $('#ghost .payment-link')[0].click();
  });

  $('.delete-po').click(function() {
    $('#delete-po-modal').modal('show');
  });

  $('#delete-po-modal .confirm').click(function() {
    notification("Purchase order deleted successfully.");
    $('#ghost .all-link')[0].click();
  });

  $('.receive-items').click(function() {
    $('#ghost .receive-link')[0].click();
  });

  $('.partial').click(function() {
    $('#ghost .partial-link')[0].click();
  });

  $('.cancel-remaining').click(function() {
    $('.remainings').val("0");
    $('.progress-bar.bg-success').css("width", "0%");
    $('.progress-bar.bg-warning').css("width", "100%");
    $('#ghost .complete-link')[0].click();
    change_flage = 1;
  });

  $('.cancel-remaining-partial').click(function() {
    $('.progress-bar.bg-warning').css("width", "50%");
    $('#ghost .complete-link')[0].click();
    change_flage = 1;
  });
  
  $('.mark-all').click(function() {
    $('.remainings').val("50");
    $('.progress-bar.bg-warning').css("width", "0%");
    $('.progress-bar.bg-success').css("width", "100%");
    change_flage = 1;
  });

  $('.btn-all').click(function() {
    $(this).parent().parent().parent().parent().find('input[type="number"]').val("50");
    $(this).parent().parent().parent().parent().find('.progress-bar.bg-success').css("width", "100%");
    $(this).parent().parent().parent().parent().find('.progress-bar.bg-warning').css("width", "0%");
    change_flage = 1;
  });
  
  $('.duplicate').click(function() {
    $('footer .save').removeClass("save");
    $('#ghost .new-link')[0].click();
  });

  $('.print-label').click(function() {
    console.log('a');
    $('footer .save').removeClass("save");
    $('#ghost .print-link')[0].click();
  });

  $('input[type="number"]').change(function() {
    change_flage = 1;
  });
});
