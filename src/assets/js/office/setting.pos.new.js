$(document).ready(function () {
  var init_width = $(window).width();
  unsavedManager(true, ['#content-body input', '#content-body select'], 'New device added successfully');
  $('#pos-featuredPage').change(function () {
    if($(this).val() == 0)
    {
      $('.button-card').addClass('d-none');
    }
    else{
      $('.button-card').removeClass('d-none');
    }
  })
  $('footer .cancel').click(function () {
    if(!$('footer .save').prop('disabled'))
        $('#leave-modal').modal('show');
    else
        $('#ghost .all-link')[0].click();
  });
  $('footer .save').click(function() {
    notification($('#pos-name').val() + " added successfully.");
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
  fitty('h1');
});
