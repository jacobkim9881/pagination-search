$('.carousel').on('slide.bs.carousel', function (e) {
    var nextH = $(e.relatedTarget).height();
    nextH = nextH == 259 ? 275 : nextH;
    $(this).find('.active.carousel-item').parent().animate({
        height: nextH
    }, 500);
});