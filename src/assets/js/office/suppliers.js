var notification_text = "";
$(document).ready(function() {
    var myInterval;
    var modal_height = 0;
    $('#table').on('all.bs.table', function(e) {
        $(this).removeClass('table-bordered');
    })
    $('.transaction-table').on('all.bs.table', function(e) {
        $(this).removeClass('table-bordered');
        $(this).removeClass('table-borderless');
    })

    $('#content').off('click', '.edit');
    $('#content').on('click', '.edit', function() {
        if($(window).width() < 770) {
            $('#ghost .title-item-name').text($(this).closest('tr').children().eq(1).text());
        }
        else
            $('#ghost .title-item-name').text($(this).closest('tr').children().eq(0).text());
        $('#ghost .edit-link')[0].click();
    });

    $('.step-2').hide();
    $('.step-3').hide();

    $('#content').off('click', 'tbody tr');
    $('#content').on('click', 'tbody tr', function(ev) {
        if (ev.target.nodeName !== 'I' && ev.target.nodeName !== 'A') {
            if($(window).width() < 770) {
                var result = $('.card-view-value')[6*($("table tr").index(this)-1)].firstChild.text;
                $('#ghost .title-item-name').text(result);
            }
            else
                $('#ghost .title-item-name').text($(this).closest('tr').children().eq(0).text());
            $('#ghost .profile-link')[0].click();
        }
    });

    $('.carousel').carousel({
        interval: false
    });

    $('#import-start').off('click');
    $('#import-start').on('click', function () {
    console.log('restart');
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
    $('#import-supplier-start').click(function () {
        var percent = 0;
        myInterval = setInterval(function () {
            percent < 100 ? percent++ : clearInterval(myInterval);
            $('.progress-bar').css('width', percent + '%');
            $('.progress-bar-percent').text(percent + '% complete');
        }, 50);
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
    $('.ui-switch input').click(function() {
        $(this).closest('div').find('p').toggleClass('text-muted');
    });


    $('#switch').click(function() {
        if ($(this).prop('checked')) {
            $('.overwrite').text('overwrite any existing suppliers')
        } else {
            $('.overwrite').text(' not overwrite any existing suppliers')
        }
    });
    notification_text = $('#ghost .success-title-message').text();
    if (notification_text != '') {
        window.setTimeout( show_notification, 700 ); // 5 seconds
    }
});
function show_notification() {
    notification(notification_text);
}