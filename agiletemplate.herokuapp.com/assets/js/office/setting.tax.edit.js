  $(document).ready(function () {
    var tax_name = "VAT 11%";
    var isShowSaveModal = 0;
    var taxName = $('#ghost .title-item-name').text() == '' ? 'VAT 11%' : $('#ghost .title-item-name').text();
    $('#title').text('Edit ' + taxName);
    $('#tax-name1').val(taxName);
    unsavedManager(true, ['#content-body input', '#content-body select'], '');
    $('#tax-name1').keyup(function () {
      tax_name = $('#tax-name1').val();
    })
    $('footer .save').off('click');
    $('footer .save').click(function () {
      if(isShowSaveModal == 0) {
        notification(tax_name + ' updated successfully.');
        $('footer .save').attr('disabled', true);
        $('#ghost .all-link')[0].click();
      }
      else if(isShowSaveModal == 1) {
        $('#save-modal').modal('show');
      }
    });
    $('.save-continue').click(function() {
        notification(tax_name + ' updated successfully.');
        $('footer .save').attr('disabled', true);
        $('#ghost .all-link')[0].click();
    });
    $('.checkbox-item').click(function () {
      if ($('.checkbox-item').length === $('.checkbox-item:checked').length) {
        $('#all-check').prop('checked', true);
      } else {
        $('#all-check').prop('checked', false);
      }
    });
    $('#delete-modal .continue').click(function() {
      notification(tax_name + ' deleted successfully.');
      $('footer .save').attr('disabled', true);
      $('#ghost .all-link')[0].click();      
    });
    $('#all-check').click(function () {
      $('input[type="checkbox"]').prop('checked', $(this).prop('checked'));
    });
  
    $('.tax-calculation').change(function () {
      if ($(this).val() == 0) {
        $('.tax-text').text('All product prices will include the tax rate you have set');
      }
      else {
        $('.tax-text').text('All product prices will not include the tax rate you have set, the tax rate will be added at checkout.');
      }
    });
    $('.tax-option').change(function() {
      if($(this).val() == "1" || $(this).val() == "2") {
        isShowSaveModal = 1;
      }
    });
    $('footer').slideDown();
    $('#tax-rate').mask('99.999');
  });