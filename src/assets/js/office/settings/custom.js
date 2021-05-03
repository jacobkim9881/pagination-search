$(document).ready(function () {
    if($(window).width() < 770)
    {
        $('#content-aside').removeClass("pl-3");
        $('#content-aside').css("height", "100%");
        $('#content-aside').css("width", "0px");
    }
    else
    {
    }
});
$('.subnav-link').click(function () {
    if($(window).width() < 770)
    {
        $('.navbar-setting-collapsed').collapse('hide');
        $('.navbar-setting-collapsed').css("width", "0px");
        $('.navbar-setting-collapsed').removeClass("pl-3");
        $('#content-aside').css("height", "100%");
        $('#btn-aside').click();
        $('.navbar-setting-collapsed').click();
    }
});

$('.sidenav li').click(function() {
    $('#sub-title').removeClass("sticky-title");
    $('#content-aside').removeClass("sticky-aside");
});

$('.navbar-menu a').click(function() {
    $('#sub-title').removeClass("sticky-title");
    $('#content-aside').removeClass("sticky-aside");
});

$(document).on('scroll', function() {
    $('#sub-title').addClass("sticky-title");
    $('#content-aside').addClass("sticky-aside");
});