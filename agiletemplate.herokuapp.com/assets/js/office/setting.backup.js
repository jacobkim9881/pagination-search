var backup_type = 0;
$(document).ready(function () {
  $('.bootstrap-tables').on('all.bs.table', function(e) {
    $(this).removeClass('table-bordered');
  });
  $('footer').hide();
  $('footer').removeClass('d-none');
  $('.reset-page').hide();
  $('.reset-page').removeClass('d-none');
  $('.restore-page').hide();
  $('.restore-page').removeClass('d-none');
  footerControl();
  var parentWidth = $('.info-parent').width();
  $('#info-card').width(parentWidth);

  $('.delete').click(function () {
    var name = $('#program-name').val();
    $('#delete-program-name').text(name);
  });

  $('footer .save').click(function () {
    notification("Backup and restore settings has been updated successfully");
  });

  $('.index-page').change(function () {
    $('footer').slideDown();
  });

  $('.dz-message').click(function () {
    $('footer').slideDown();
  });

  $('input[name="frequency"]').click(function () {
    $('footer').slideDown();
    var flag = $(this).parent().text().trim();
    var result = '';
    if (flag === 'Never') {
      backup_type = 0;
      result = 'is disabled';
      $('.back-time-parent').addClass('d-none');
      $('.first-backup-parent').addClass('d-none');
      $('.second-backup-parent').addClass('d-none');
    } else if (flag === 'Once a day') {
      backup_type = 1;
      $('#select2-back-time-container').text("1:00");
      // result = 'once a day at ' + ($('#back-time').find('select').eq(0).val() + ' ' + $('#back-time').find('select').eq(1).val());
      result = "once a day at 1:00 AM";
      $('.back-time-parent').removeClass('d-none');
      $('.first-backup-parent').addClass('d-none');
      $('.second-backup-parent').addClass('d-none');
    } else {
      backup_type = 2;
      $('#select2-first-time-container').text("1:00");
      $('#select2-second-time-container').text("1:00");
      result = "twice a day at 1:00 AM and 1:00 AM";
      $('.back-time-parent').addClass('d-none');
      $('.first-backup-parent').removeClass('d-none');
      $('.second-backup-parent').removeClass('d-none');
    }
    $('.backup-clone').html(result);
  });

  $('#back-time').change(function () {
    backup_type = 1;
    $('.back-time-parent').find('#select2-back-time-container').text($('#back-time option:selected').text());
    setBackText();
  });

  $('#first-time').change(function () {
    backup_type = 2;
    $('.first-backup-parent').find('#select2-first-time-container').text($('#first-time option:selected').text());
    setBackText();
  });

  $('#second-time').change(function () {
    backup_type = 3;
    $('.second-backup-parent').find('#select2-second-time-container').text($('#second-time option:selected').text());
    setBackText();
  });

  $('.flag').change(function () {
    setBackText();
  });

  $('#leave-modal .continue').click(function () {
    $($('input[name=frequency]')[0]).click();
    $('footer').slideUp();
  });

  $('.time-format').mask('99:99');
  $('.index-page').on('click', '.select2-selection', function () {
    $('.select2-search__field').mask('99:99');
  });
  $('.first-select').on('click', function() {
    backup_type = 2;
  });
  $('.second-select').on('click', function() {
    backup_type = 3;
  });
});
$(document).on('keyup', '.select2-search__field', function (e) {
  $('#select2-back-time-container').text($('.select2-search__field').val());
  if($('#select2-back-time-container').text().length == 5) {
    var curtime = "";
    console.log($('#select2-back-time-container').text().substr(0,2));
    if($('#select2-back-time-container').text().substr(0,2) > "12") {
      curtime = "11";
    }
    else {
      curtime = $('#select2-back-time-container').text().substr(0,2);
    }
    if($('#select2-back-time-container').text().substr(3,2) > "59") {
      curtime = curtime + ":59";
    }
    else {
      curtime = curtime + ":" + $('#select2-back-time-container').text().substr(3,2);
    }
    if(backup_type == 1) {
      $('#select2-back-time-container').text(curtime);
      $('.select2-search__field').val(curtime);
    }
    else if(backup_type == 2) {
      $('#select2-first-time-container').text(curtime);
      $('.select2-search__field').val(curtime);
    }
    else if(backup_type == 3) {
      $('#select2-second-time-container').text(curtime);
      $('.select2-search__field').val(curtime);
    }

    $('footer').slideDown();
    setBackText();
  }
});

function setBackText() {
  if(backup_type == 1) {
    $('.backup-clone').html("once a day at " + $('.back-time-parent').find('#select2-back-time-container').text() + " " + $('.back-time-parent').find('.flag').val());
  }
  else if(backup_type == 2 || backup_type == 3) {
    $('.backup-clone').html("twice a day at " + $('.first-backup-parent').find('#select2-first-time-container').text() + " " + $('.first-backup-parent').find('.flag').val() + " and " + $('.second-backup-parent').find('#select2-second-time-container').text() + " " + $('.second-backup-parent').find('.flag').val());
  }
}