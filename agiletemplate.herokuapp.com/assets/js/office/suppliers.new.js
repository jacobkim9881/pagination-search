$(document).ready(function () {
    footerShowCondition();
    new Tags(document.getElementById('variant-tags1'));
    $('.select2-multiple').select2({ tags: true, tokenSeparators: [','] });

    $('.start-date').fdatepicker({
        initialDate: '12-12-2020',
        format: 'M dd, yyyy',
        disableDblClickSelection: true,
        leftArrow: '<<',
        rightArrow: '>>',
    });
    var today = new Date().toLocaleDateString().split('/');
    function setTime() {
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', ' Oct', 'Nov', 'Dec'];
        $('.start-date').val(month[today[0] - 1] + ' ' + today[1] + ', ' + today[2]);
    }
    setTime();
    $('footer').hide();
    $('footer').removeClass('d-none');
    $('footer .cancel').click(function () {
        if ($('footer .save').attr('disabled') == 'disabled') {
            back();
        } else {
            $('#leave-modal').modal('show');
        }
    });

    $('textarea').keyup(function (ev) {
        if ($(this).val().length > 499) {
            ev.preventDefault();
        }
        $(this).parent().find('.length').text($(this).val().length);
    });
    $('footer .save').click(function () {
        $(this).attr('disabled', true);
        $('#ghost .success-title-message').text('New supplier added successfully');
        $('#ghost .all-link')[0].click();
    })
    var is_lbp;
    $('input[name=point-round]').change(function () {
        if ($(this).val() === 'lbp') {
            is_lbp = 1;
            $('#excharge-rate').hide();
            $('.currency-type').text('L£');
            $('.currency-value1').attr('placeholder', '0');
            $('.currency-value2').attr('placeholder', '0');
            $('.currency-value1').attr('onkeypress', 'return event.charCode >= 48 && event.charCode <= 57');
            $('.currency-value2').attr('onkeypress', 'return event.charCode >= 48 && event.charCode <= 57');
            if($('.currency-value1').val().indexOf('.') > 0)
                $('.currency-value1').val($('.currency-value1').val().substring(0, $('.currency-value1').val().indexOf('.')));
            if($('.currency-value2').val().indexOf('.') > 0)
                $('.currency-value2').val($('.currency-value2').val().substring(0, $('.currency-value2').val().indexOf('.')));
        } else {
            is_lbp = 0;
            $('#excharge-rate').show();
            $('.currency-type').text('$');
            $('.currency-value1').attr('placeholder', '0.00');
            $('.currency-value2').attr('placeholder', '0.00');
            $('.currency-value1').attr('onkeypress', 'return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44');
            $('.currency-value2').attr('onkeypress', 'return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44');
            if(($('.currency-value1').val().indexOf('.') == -1) && $('.currency-value1').val())
                $('.currency-value1').val($('.currency-value1').val() + ".00");
            if(($('.currency-value2').val().indexOf('.') == -1) && $('.currency-value2').val())
                $('.currency-value2').val($('.currency-value2').val() + ".00");
        }
    });

    $('input[name=registered-vat]').change(function () {
        if ($(this).val() === 'no') {
            $('#vat-id-number').parent().hide();
            $('.vat-percentage').parent().hide();
            $('.vat-type').parent().hide();
        } else {
            $('#vat-id-number').parent().show();
            $('.vat-percentage').parent().show();
            $('.vat-type').parent().show();
        }
    });

    $('#vat-id-number').mask('999999-999');
    $('.mobile').mask('99 999 999');
    $(".number-format").on('keyup', function (e) {
        if(e.keyCode == 65 || e.keyCode == 17) {
          return;
        }
        $(this).val($(this).val().replace(/,/g, ''));
        $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      });
    $('.currency-value1').on('keyup', function () {
        $(this).val($(this).val().replace(/,/g, ''));
        var index = $(this).val().indexOf('.');
        var temp = "";
        console.log(index);
        if(index != -1) {
            temp = $(this).val().substring(0, index);
            $(this).val(temp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + $(this).val().substring(index));
        }
        else {
            $(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
        }
    });
    $('.currency-value1').focusout(function () {
        if (!is_lbp && $('.currency-value1').val()) {
            var num = $('.currency-value1').val();
            if(!$('.currency-value1').val().includes('.')) {
                num = $('.currency-value1').val() + '.00';
            } else if(($('.currency-value1').val().length - $('.currency-value1').val().indexOf('.')) == 2) {
                num = $('.currency-value1').val() + '0';
            }
            $('.currency-value1').val(num);
        }
    });
    $('.currency-value2').on('keyup', function () {
        $(this).val($(this).val().replace(/,/g, ''));
        $(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    });
    $('.currency-value2').focusout(function () {
        if (!is_lbp && $('.currency-value2').val()) {
            var num = $('.currency-value2').val();
            if(!$('.currency-value2').val().includes('.')) {
                num = $('.currency-value2').val() + '.00';
            } else if(($('.currency-value2').val().length - $('.currency-value2').val().indexOf('.')) == 2) {
                num = $('.currency-value2').val() + '0';
            }
            $('.currency-value2').val(num);
        }
    });
    $('li .select2-selection__choice').css('background-color', 'white');
});
