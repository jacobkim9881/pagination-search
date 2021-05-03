$(document).ready(function () {
  unsavedManager(true, ['#content-body input', '#content-body select'], 'New payment type added successfully');
  $('footer .save').on('click', (ev) => {
    notification($('.payment-type-title').val() + " added successfully.");
    $(ev.target).attr("disabled", true);
    $('footer').slideUp();
    $('.all-link')[0].click();
  });
});
