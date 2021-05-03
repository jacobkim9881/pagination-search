$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();  
    $('footer').hide();
    $('footer').removeClass();
    $('input').on('change', () => {
        $('footer').slideDown();
    });
    $('input').on('input', () => {
        $('footer').slideDown();
    });
    $('footer .cancel').click(function () {
        $('#leave-modal').modal("show");
    });
    $('#leave-modal .continue').click(function () {
        $('input').val('');
        $('input[type="checkbox"]').prop('checked', false);
        $('select').val('0');
        $('textarea').val('');
        $('footer .save').attr("disabled", true);
        $('footer').slideUp();
    });

    $('footer .save').click(function () {
        $('footer').slideUp();
        notification('Your information changed successfully.');
    });
    if($(window).width() < 770)
    {
        $('.text-right').removeClass("text-right");
        $('.text-right').addClass("text-left");
        $('#content-aside').css("height", "100%");
        $('#content-aside').css("width", "0px");
    }
    else
    {
        $('.text-left').removeClass("text-left");
        $('.text-left').addClass("text-right");
    }
});
$(document).on('scroll', function() {
    $('#sub-title').addClass("sticky-title");
    $('#content-aside').addClass("sticky-aside");
});
$('.subnav-link').click(function () {
    if($(window).width() < 770)
    {
        $('.navbar-collapsed').collapse('hide');
        $('#content-aside').css("height", "100%");
        $('.navbar-collapsed').css("width", "0px");
        $('#btn-aside').click();
        $('.navbar-collapsed').click();
    }
    else 
    {
        $('#sub-title').removeClass("sticky-title");
        $('#content-aside').removeClass("sticky-aside");        
    }
});