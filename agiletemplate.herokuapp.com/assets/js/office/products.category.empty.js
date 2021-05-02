$(document).ready(function() {
    $('.create').on('click', function() {
        $('#category-name').val("");
        $('#add-category-modal .save').attr('disabled', true);
    });
    $('#add-category-modal input').on('keyup', function() {
        $('#add-category-modal .save').attr('disabled', false);
    });
    $('#add-category-modal .save').on('click', function() {
        $('#ghost .all-link')[0].click();
        notification($('#category-name').val() + " created successfully.");
    });
});