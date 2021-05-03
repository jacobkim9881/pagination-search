$(document).ready(function() {
  // $('#filter').keyup(function () {
  //     var rex = new RegExp($(this).val(), 'i');
  //     $('.searchable tr').hide();
  //     $('.searchable tr').filter(function () {
  //       if(rex.test($(this).text())) {
  //         if($(this).hasClass("demo")) return false;
  //         else return true;
  //       }
  //     }).show();
  // });
  setTimeout(() => {
    $('.searchable tr').click(function(ev) {
      if(ev.target.tagName == "I") return;
      if($(ev.target).find('i').length > 0) return;
      $('#ghost .details-link')[0].click();
    });      
    $('td[data-toggle="collapse"]').off("click");
    $('td[data-toggle="collapse"]').click(function (ev) {
        var obj = $(this).find('i').eq(0);
        if (obj.hasClass('la-angle-up')) {
            obj.removeClass('la-angle-up');
            obj.addClass('la-angle-down');
        } else {
            obj.addClass('la-angle-up');
            obj.removeClass('la-angle-down');
        }
    });        
  }, 1000);
});