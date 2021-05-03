var time_type = "start";
var isDown = false;
var startX;
var isEdit = false;
var scrollLeft;
var slider;
var employee_name;

$(document).ready(function() {

  document.title = "Products | Production";
  $(".nav-sub li").removeClass("active");
  $(".nav li ").removeClass("active"); //Remove any "active" class 
  $('#employees_nav').addClass("active");
  $('#employee_schedule').addClass("active");

  $('.avatar').on('click', function() {
    $('.user-item').removeClass("selected");
    $(this).parent().addClass("selected");
    $('.close-icon').remove();
    $(this).parent().append(`
    <a class="close-icon position-absolute" style="right: 5px; top: 5px;"><i class="la la-close"></i></a>
    `);
    $('.la-close').on('click', () => {
      $('.user-item').removeClass("selected");
      $('.close-icon').remove();
      $('.select-employee').val("All");
      $('.select-employee').trigger('change');
    });
    $('.select-employee').val($(this).parent().find('.item-author').text());
    $('.select-employee').trigger('change');
  });
  $('.user-info').on('click', function() {
    $('.user-item').removeClass("selected");
    $(this).parent().addClass("selected");
    $('.close-icon').remove();
    $(this).parent().append(`
    <a class="close-icon position-absolute" style="right: 5px; top: 5px;"><i class="la la-close"></i></a>
    `);
    $('.la-close').on('click', () => {
      $('.user-item').removeClass("selected");
      $('.close-icon').remove();
      $('.select-employee').val("All");
      $('.select-employee').trigger('change');
    });
    $('.select-employee').val($(this).parent().find('.item-author').text());
    $('.select-employee').trigger('change');
  });
  $('.clockin-date').fdatepicker({
    initialDate: '12-12-2020',
    format: 'M dd, yyyy',
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
  }); 
  $('.clockout-date').fdatepicker({
    initialDate: '12-12-2020',
    format: 'M dd, yyyy',
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
  });

  $('.select-employee').change(function() {
    console.log($(this).val());
    if($(this).val() != "All") {
        var rex = new RegExp($(this).val(), 'i');
        $('.searchable tr').hide();
        $('.searchable tr').filter(function () {
            return rex.test($(this).text());
        }).show();
    } else {
        var rex = new RegExp("", 'i');
        $('.searchable tr').hide();
        $('.searchable tr').filter(function () {
            return rex.test($(this).text());
        }).show();
        $('.user-item').removeClass("selected");
    }
  });

  $('#timecard-modal .add').on('click', () => {
    notification("Timecard has been added successfully.");
  });
  $('#timecard-modal .delete').on('click', () => {
    $('#delete-modal .employee-name').text(employee_name);
    $('#delete-modal').modal("show");
  });
  $('#timecard-modal .save').on('click', () => {
    notification("Timecard has been saved successfully.");
  });
  $('#delete-modal .confirm').on('click', function() {
    $('#timecard-modal').modal("hide");
    notification(`${employee_name}'s timecard has been deleted successfully.`);
  });

  setTimeout(() => {
    slider = document.querySelector('#employees');
    $(slider).bind('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    $(slider).bind('mouseleave', (e) => {
      isDown = false;
      slider.classList.remove('active');
    });
    $(slider).bind('mouseup', (e) => {
      isDown = false;
      slider.classList.remove('active');
    });
    $(slider).bind('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  }, 500);

  $('.add-card').on('click', function() {
    $('#timecard-modal .modal-title').text("Add timecard");
    $('#timecard-modal .modal-info').text("Enter manually employee’s hours.");
    $('#timecard-modal .delete').addClass("d-none");
    $('#timecard-modal .save').addClass("d-none");
    $('#timecard-modal .add').removeClass("d-none");
    $('#timecard-modal .save').attr("disabled", true);
    $('#timecard-modal .add').attr("disabled", true);
    $('#timecard-modal .employee-div').removeClass("d-none");
    $('#timecard-modal .employee-div').addClass("d-flex");
    $('#timecard-modal .store-div').addClass("col-md-6");
    $('#timecard-modal').modal("show");
  });

  $('#timecard-modal input').on('keyup', () => {
    if($('#timecard-modal .add').hasClass("d-none")) $('#timecard-modal .save').attr("disabled", false);
    else $('#timecard-modal .add').attr("disabled", false);
  });
  $('#timecard-modal select').on('change', () => {
    if($('#timecard-modal .add').hasClass("d-none")) $('#timecard-modal .save').attr("disabled", false);
    else $('#timecard-modal .add').attr("disabled", false);
  });
  $('#timecard-modal .cancel').on('click', (e) => {
    $('#timecard-modal .cancel').attr("data-dismiss", "");
    if($('#timecard-modal .add').hasClass("d-none") && !$('#timecard-modal .save').attr("disabled")) $('#leave-modal').modal("show");
    else if($('#timecard-modal .save').hasClass("d-none") && !$('#timecard-modal .add').attr("disabled")) $('#leave-modal').modal("show");
    else {
      $('#timecard-modal .cancel').attr("data-dismiss", "modal");
    }
  });
  $('#leave-modal .continue').on('click', function() {
    $('#timecard-modal').modal("hide");
  });
  setTimeout(() => {
    event_format();
  }, 800);
});

function event_format() {
  $('tbody>tr').on('click', function() {
    employee_name = $(this).find('td').eq(3).text();
    $('#timecard-modal .modal-title').text(`Edit ${employee_name}'s timecard`);
    $('#timecard-modal .modal-info').text("Manually edit employee’s hours.");
    $('#timecard-modal .delete').removeClass("d-none");
    $('#timecard-modal .add').addClass("d-none");
    $('#timecard-modal .save').removeClass("d-none");
    $('#timecard-modal .employee-div').addClass("d-none");
    $('#timecard-modal .employee-div').removeClass("d-flex");
    $('#timecard-modal .store-div').removeClass("col-md-6");
    $('#timecard-modal').modal("show");
  });

  $('#filter').keyup(function () {
    var rex = new RegExp($(this).val(), 'i');
    $('.searchable tr').hide();
    $('.searchable tr').filter(function () {
        return rex.test($(this).text());
    }).show();
  });
}

$(document).on('keyup', '.select2-search__field', function (e) {
  if(time_type == "start") {
      $('#select2-start-time-container').text($('.select2-search__field').val());
      if($('#select2-start-time-container').text().length == 5) {
        var curtime = "";
        if($('#select2-start-time-container').text().substr(0,2) > "12") {
          curtime = "11";
        }
        else {
          curtime = $('#select2-start-time-container').text().substr(0,2);
        }
        if($('#select2-start-time-container').text().substr(3,2) > "59") {
          curtime = curtime + ":59";
        }
        else {
          curtime = curtime + ":" + $('#select2-start-time-container').text().substr(3,2);
        }
        $('#select2-start-time-container').text(curtime);
        $('.select2-search__field').val(curtime);
      }
  } else if(time_type == "end") {
      $('#select2-end-time-container').text($('.select2-search__field').val());
      if($('#select2-end-time-container').text().length == 5) {
        var curtime = "";
        if($('#select2-end-time-container').text().substr(0,2) > "12") {
          curtime = "11";
        }
        else {
          curtime = $('#select2-end-time-container').text().substr(0,2);
        }
        if($('#select2-end-time-container').text().substr(3,2) > "59") {
          curtime = curtime + ":59";
        }
        else {
          curtime = curtime + ":" + $('#select2-end-time-container').text().substr(3,2);
        }
        $('#select2-end-time-container').text(curtime);
        $('.select2-search__field').val(curtime);
      }
  }
});
$(document).on('click', '.select2-selection', function (ev) {
  $('.select2-search__field').mask('99:99');
  if($(ev.target).attr("id") == "select2-start-time-container") {time_type = "start";}
  else if($(ev.target).attr("id") == "select2-end-time-container") {time_type = "end";}
});