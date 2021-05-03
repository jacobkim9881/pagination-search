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
        $('footer .save').attr("disabled", true);
        $('footer').slideUp();
        notification('Your information changed successfully.');
    });
    
    if($(window).width() < 770)
    {
        $('#content-aside').css("height", "100%");
        $('#content-aside').css("width", "0px");
    }
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
Dropzone.autoDiscover = false;
window.onload = function () {

    var dropzoneOptions = {
        dictDefaultMessage: 'Drop Here!',
        paramName: "file",
        maxFilesize: 2, // MB
        addRemoveLinks: true,
        uploadMultiple: false,
        init: function () {
            this.on("success", function (file) {
                $('#header .avatar').html(`<img src=${file.dataURL} style="width: 36px; height: 36px;">`);
            });
            this.on("removedfile", function (file) {
                $('#header .avatar').html(`JT`);
            });
        },
    };
    var uploader = document.querySelector('#my-awesome-dropzone');
    var newDropzone = new Dropzone(uploader, dropzoneOptions);

    console.log("Loaded");
};