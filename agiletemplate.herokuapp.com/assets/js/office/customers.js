$(document).ready(function() {
    carousel_init();
    setTimeout(() => {
        event_format();
    }, 800);
});

function event_format() {
    $('.searchable tr').on('click', (ev) => {
        if($(ev.target).closest('tr').find('td').eq(0).text().indexOf("John Doe") >= 0) $('#ghost .profile-link')[1].click();
        else $('#ghost .profile-link')[0].click();
    });
}

function carousel_init() {
    var myInterval;
    var modal_height = 0;
    $('.carousel').carousel({
        interval: false
    });
    $('#import-start').off('click');
    $('#import-start').on('click', function () {
        clearInterval(myInterval);
        $('.progress-bar').width(0);
        $('.carousel-item').removeClass('active');
        $('.carousel-item').eq(0).addClass('active');
        if(modal_height != 0) {
        $('.close-modal').removeClass('mb-3');
        $('.carousel-inner').height(modal_height);
        $('.carousel-item').eq(0).height(modal_height);
        }
    });
    $('.close-modal').off('click');
    $('.close-modal').on('click', function() {
        $('.progress-bar').width(0);
        $('.carousel-item').removeClass('active');
        $('.carousel-item').eq(0).addClass('active');
        $('.close-modal').removeClass('mb-3');
    });
    $('.carousel-control').click(function () {
        if(modal_height == 0) modal_height = $('.carousel-item').eq(0).height();
    });
    $('#import-supplier-start').click(function () {
        var percent = 0;
        myInterval = setInterval(function () {
            percent < 100 ? percent++ : clearInterval(myInterval);
            $('.progress-bar').css('width', percent + '%');
            $('.progress-bar-percent').text(percent + '% complete');
        }, 50);
    });

    $('.ui-switch input').click(function () {
        $(this).closest('div').find('p').toggleClass('text-muted');
    });
    $('#switch').click(function () {
        if ($(this).prop('checked')) {
            $('.overwrite').text('overwrite any existing customers')
        } else {
            $('.overwrite').text(' not overwrite any existing customers')
        }
    });
}