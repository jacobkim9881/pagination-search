$(document).ready(function () {
  var init_width = $(window).width();
  unsavedManager(true, ['#content-body input', '#content-body select'], 'POS device updated successfully', true, 'Device deleted successfully');
  var program_name = $('#ghost .title-item-name').text() == '' ? 'Cashier' : $('#ghost .title-item-name').text();
  $('#title').text('Edit ' + program_name);  
  $('#pos-featuredPage').change(function () {
    if($(this).val() == 0)
    {
      $('.button-card').addClass('d-none');
    }
    else{
      $('.button-card').removeClass('d-none');
    }
  });
  $('#delete-modal .continue').click(function() {
    notification(program_name + ' deleted successfully.');
    $('footer .save').attr('disabled', true);
    $('#ghost .all-link')[0].click();
  });
  $('footer .save').click(function() {
    notification(program_name + " saved successfully.");
    $('footer .save').attr('disabled', true);
    $('#ghost .all-link')[0].click();
  });
  if(init_width < 770) {
    $('.featured-page-table').css("width", $('.parent-page').width());
    $('.featured-page-table').css("font-size", "2px");
    $('.featured-page-table').css("height", $('.featured-page-table').width() / 1.6);
  } else {
    console.log(init_width);
    $('.featured-page-table').css("font-size", "6px");
    $('.featured-page-table').css("width", init_width / 3.5);
    console.log($('.featured-page-table').width());
    $('.featured-page-table').css("height", init_width / 3.5 / 1.6);
  }
  $(window).resize(function() {
    if($(window).width() >= 770) {
      var wid = $(window).width();
      console.log(init_width);
      console.log(wid);
      $('.featured-page-table').css("transform", "scale(" + wid / init_width + ")");
    }
  });
});