$(document).ready(function() {
  setTimeout(() => {
    event_format();
  }, 800);
  $(".selectable").eq(0).on({
      mouseenter: function (ev) {
        $('.export-title').eq(0).addClass("back-link");
      },
      mouseleave: function () {
        $('.export-title').removeClass("back-link");
      }
  });
  $(".selectable").eq(1).on({
      mouseenter: function (ev) {
        $('.export-title').eq(1).addClass("back-link");
      },
      mouseleave: function () {
        $('.export-title').removeClass("back-link");
      }
  });
});

function event_format() {
  $('.pay-employee').on('click', function() {
    $('#ghost .new-link')[0].click();
  });
  $('tbody>tr').on('click', (ev) => {
    if(ev.target.tagName == "I") return;
    if(ev.target.tagName == "A")
      $('#ghost .profile-link')[0].click();
    else
      $('#ghost .details-link')[0].click();
  });
}