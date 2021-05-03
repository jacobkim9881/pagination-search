var notification_text = "";
$(document).ready(function() {
    unsavedManager(true, ['#content-body input', '#content-body select'], '');
    $('footer').hide();
    $('footer').removeClass("d-none");
    if(document.location.pathname.indexOf("edit") >= 0) {
        $('footer').slideDown();
    }
    new Tags(document.getElementById('variant-tags1'));
    $('.select2-multiple').select2({ tags: true, tokenSeparators: [','] });
    $('.dob-date').fdatepicker({
        initialDate: '12-12-2020',
        format: 'M dd, yyyy',
        disableDblClickSelection: true,
        leftArrow: '<<',
        rightArrow: '>>',
    });
    setTime();
    $('textarea').keyup(function (ev) {
        if ($(this).val().length > 499) {
            ev.preventDefault();
        }
        $(this).parent().find('.length').text($(this).val().length);
    });
    $('#vat-id-number').mask("999999-999");
    $('.mobile').mask('99 999 999');
    $('li .select2-selection__choice').css('background-color', 'white');
    $('input').on('change', () => {
        $('footer').slideDown();
        $('footer .save').attr("disabled", false);
    });
    $('input').on('keyup', () => {$('footer').slideDown(); $('footer .save').attr("disabled", false);});
    $('textarea').on('keyup', () => {$('footer').slideDown(); $('footer .save').attr("disabled", false);});
    $('input[name="customer-type"]').change(function () {
        if ($(this).val() === 'customer') {
            $('#tax-number-div').addClass("d-none");
            $('.company-name-div').addClass("d-none");
            $('.first-name').text("First name");
            $('.last-name').text("Last name");
        } else if ($(this).val() === 'business'){
            $('#tax-number-div').removeClass("d-none");
            $('.company-name-div').removeClass("d-none");
            $('.first-name').text("Contact’s first name");
            $('.last-name').text("Contact’s last name");
        }
    });
    $('#delete-modal .confirm').on('click', () => {
        notification("Customer deleted successfully.");
        $('footer .save').attr("disabled", true);
        $('#ghost .all-link')[0].click();
    });
    $('#page-leave-modal .leave').on('click', () => {
        $('#ghost .profile-link')[0].click();
    });
    $('footer .cancel-profile').on('click', () => {
        if($('footer .save').attr("disabled")) $('#ghost .profile-link')[0].click();
        else {
            $('#page-leave-modal').modal("show");
        }
    });
    $('footer .save').click(function () {
        notification('New customer added successfully');
        $(this).attr("disabled", true);
        $('#ghost .all-link')[0].click();
    });
    $('footer .delete').on('click', () => {
        $('#delete-modal').modal("show");
    });
});

function setTime() {
    var today = new Date().toLocaleDateString().split('/');
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', ' Oct', 'Nov', 'Dec'];
    $('.dob-date').val(month[today[0] - 1] + ' ' + today[1] + ', ' + today[2]);
}