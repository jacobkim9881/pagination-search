$(document).ready(function () {
  var isEdit = false;
  var delete_element, add_element;
  format();
  function format() {
    $('input').val('');
    $('.save').attr('disabled', true);
    $('.cancel').attr('disabled', true);
    $('.delete').addClass('d-none');
    $('#category-edit-title').text('Create category');
    $('.delete').addClass('d-none');
    $('.category-content').width($('.category-edit').width());
    $('#checkbox').prop('checked', false);
    $('#category-name-container').removeClass('d-none');
    $('#category-name-container').addClass('d-none');
    if(!$('footer').hasClass('d-none')) $('footer').addClass('d-none');
    isEdit = false;
  }
  $('.gparent-category .list-item .flex').click(function() {
    $('.gparent-category .list-item').removeClass('active');
    $(this).parent().addClass('active');
    $('.parent-category').html($('#categoring').html());
    $('.parent-category .list-item .flex').click(function() {
        $('.parent-category .list-item').removeClass('active');
        $(this).parent().addClass('active');
        $('#category-list').slick('slickNext');
        $('.back').children().eq(0).removeClass('invisible');
        $('.back').children().eq(0).addClass('visible');
        $('.back').children().eq(1).removeClass('invisible');
        $('.back').children().eq(1).addClass('visible');
    });
  });

  $('.parent-category .list-item .flex').click(function() {
      $('.parent-category .list-item').removeClass('active');
      $(this).parent().addClass('active');
      $('#category-list').slick('slickNext');
      $('.back').children().eq(0).removeClass('invisible');
      $('.back').children().eq(0).addClass('visible');
      $('.back').children().eq(1).removeClass('invisible');
      $('.back').children().eq(1).addClass('visible');
  });

  // $('.child-category .list-item .flex').click(function() {
  //   $('.child-category .list-item').removeClass('active');
  //   $(this).parent().addClass('active');
  // });

  $('.back').on('click', function() {
    $('#category-list').slick('slickPrev');
    $('.back').children().eq(0).removeClass('visible');
    $('.back').children().eq(0).addClass('invisible');
    $('.parent-category .list-item').removeClass('active');
    setTimeout(back_hidden, 500);
  });

  function back_hidden()
  {
    $('.back').children().eq(1).removeClass('visible');
    $('.back').children().eq(1).addClass('invisible');
  }

  $('#checkbox').click(function () {
    if ($(this).prop('checked')) {
      $('#category-name-container').removeClass('d-none');
    } else {
      $('#category-name-container').addClass('d-none');
    }
  });
  if ($('#ghost .success-title-message').text() != '') {
    notification($('#ghost .success-title-message').text());
  }
  
  $('.alert').hide();
  $('.alert').removeClass('d-none');

  $('.category-edit').change(function () {
    $('footer').removeClass("d-none");
    $('.save').attr('disabled', false);
    $('.cancel').attr('disabled', false);
    $('.delete').attr('disabled', false);
  });

  $('.category-edit').keyup(function () {
    $('footer').removeClass("d-none");
    $('.save').attr('disabled', false);
    $('.cancel').attr('disabled', false);
    $('.delete').attr('disabled', false);
  });

  $('.save').on('click', function () {
    if (isEdit) {
      notification('Category updated successfully');
    } else {
      if(!$('#checkbox').prop('checked')) {
        add_element = `
          <div class="list-item">
            <div class="flex">
                <div class="item-author grand-cat" style="font-weight: 500; font-size: 17px;">${$('#name').val()}</div>
                <div class="item-except text-muted h-1x">
                    5 Sub / 20 Items
                </div>
            </div>
            <div>
                <div class="item-action dropdown">
                    <a data-toggle="dropdown">
                        <i class="i-con i-con-more"><i></i></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right bg-dark" role="menu">
                        <a class="dropdown-item edit">
                            <i class="la la-pen h5"></i>
                            Edit
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item delete-item">
                            <i class="i-con i-con-trash"><i></i></i>
                            Delete
                        </a>
                    </div>
                </div>
            </div>
          </div>`;
        $('#gparent-category list-row').append(add_element);
        notification('Category added successfully');
      } else {
        notification('Sub category added successfully');
      }
    }
    format();
  });

  $('#delete-modal .continue').click(function() {
    delete_element.remove();
    notification($('#name').val() + " deleted successfully");
    format();
  });

  $('.edit').on('click', function () {
    isEdit = true;
    delete_element = $(this).parent().parent().parent().parent();
    $('#category-edit-title').text('Edit category');
    var parent_catname = delete_element.find('.parent-cat').text();
    console.log(parent_catname);
    if (parent_catname == '') {
      $('#name').val('Category Name');
      $('#checkbox').prop('checked', true);
      $('#sub-category').val('');
      $('#category-name-container').removeClass('d-none');
    } else {
      $('#name').val(parent_catname);
      $('#checkbox').prop('checked', false);
      $('#sub-category').val('');
      $('#category-name-container').addClass('d-none');
    }
    $('#name').val(delete_element.find('.item-author').text());
    $('footer').removeClass("d-none");
    $('.save').attr('disabled', true);
    $('.cancel').attr('disabled', false);
    $('.delete').attr('disabled', false);
    $('.delete').removeClass('d-none');
  });

  $('.leave').click(function () {
    format();
  });

  $('.delete-item').on('click', function () {
    delete_element = $(this).parent().parent().parent().parent();
    var parent_catname = $(this).parent().parent().parent().parent().find('.parent-cat').text();
    $('#modifier-name').val(parent_catname);
    $('#delete-modal').modal('show');
  });

  $('.cancel').click(function() {
    if(!$('footer .save').prop('disabled')) {
      $('#leave-modal').modal('show');
    } else {
      format();
    }
  });

  $('.continue').click(function() {
    format();
  });
});