// common code

$('.edit-page').hide();
$('.edit-page').removeClass('d-none');

function tableRowControl() {
    $('.index-page tbody').on('click', 'tr', function (ev) {
        if (ev.target.nodeName !== 'I') {
            $('.index-page').hide();
            $('.edit-page').show();
            $('footer .delete').show();
            $('footer').slideDown();
            enterInfo();
        }
    });
}

function footerControl() {
    $('footer').hide();
    $('footer').removeClass('d-none');
    $('footer .delete').hide();
    $('footer .cancel').click(function () {
        if ($(this).hasClass('confirm')) {
            $('#leave-modal').modal('show');
        } else {
            back();
        }
    });

    $('footer .save').click(function () {
        if($('footer button').eq(1).text() == "Save") {
            back();
            notification($(this).attr('title'));
        }
    });
}

function formatInfo() {
    $('.edit-page input[type="text"]').val('');
    $('.edit-page input[type="number"]').val('');
    $('.edit-page input[type="checkbox"]').prop('checked', false);
    $('.edit-page select').val('0');
    $('.edit-page textarea').val('');
}

function enterInfo() {
    $('.edit-page input[type="text"]').val('Sultan bakery');
    $('.edit-page input[type="number"]').val('1234567890');
    $('.edit-page input[type="checkbox"]').prop('checked', false);
    $('.edit-page select').val('0');
    $('.edit-page textarea').val('Sultan bakery');
}

function back() {
    $('.edit-page').hide();
    $('.index-page').show();
    $('footer').slideUp();
    formatInfo();
}

function backControl() {
    $('.back').click(function () {
        back();
    });
}

function addItemControl() {
    $('.add').click(function () {
        $('.index-page').hide();
        $('.edit-page').show();
        $('footer .delete').hide();
        formatInfo();
    });
}

function footerShowCondition() {
    $('input[type="text"]').keydown(function () {
        $('footer').slideDown();
    });

    $('input[type="number"]').keydown(function () {
        $('footer').slideDown();
    });

    $('input').change(function () {
        $('footer').slideDown();
    });

    $('input[type="radio"]').click(function () {
        $('footer').slideDown();
    });

    $('input[type="checkbox"]').click(function () {
        $('footer').slideDown();
    });

    $('textarea').keydown(function () {
        $('footer').slideDown();
    });

    $('select').change(function () {
        $('footer').slideDown();
    });
}

$('.delete').click(function () {
    $('#delete-modal').modal('show');
});

$('.modal-delete-button').click(function () {
    notification($(this).attr('title'));
    $('.back').click();
});

$('.notification').click(function () {
    notification($(this).attr('notification-title'));
});



// notification
$('.alert').hide();
$('.alert').removeClass('d-none');

// THIS IS REAL
function notification(htmlStr, time = 100) {
    notie.alert({ type: 'success', text: htmlStr });
}

function unsavedManager(isBack, selectors, saveMsg, isDelete = false, deleteMsg = '') {

    $('footer').removeClass('d-none');
    $('footer').hide();
    if (isDelete) $('footer').slideDown();
    $('footer .cancel').click(function () {
        if(!$('footer .save').prop('disabled'))
            $('#leave-modal').modal('show');
        else
            $('#ghost .all-link')[0].click();
    });
    selectors.forEach(one => {
        $(one).on('keyup change', function () {
            $('footer .save').attr('disabled', false);
            $('footer').slideDown();
        })
    })
    $('#leave-modal .continue').click(function () {
        $('input[type="text"]').val('');
        $('input[type="number"]').val('');
        $('input[type="checkbox"]').prop('checked', false);
        $('select').val('0');
        $('textarea').val('');
        $('footer .save').attr("disabled", true);
        $('footer').slideUp();
        if (isBack) {
            $('footer .save').attr('disabled', true);
            $('#ghost .all-link')[0].click();
        } else {
            selectors.forEach(one => {
                $(one).val('');
            })
        }
    });
}
$('#filter').keyup(function () {
    var rex = new RegExp($(this).val(), 'i');
    $('.searchable tr').hide();
    $('.searchable tr').filter(function () {
        if(rex.test($(this).text())) {
            if($(this).hasClass("demo")) {
                $(this).parent().show();
                return true;
            }
            else {
                return true;
            }
        }
    }).show();
});