var isEdit = false;
var selected_row;
$(document).ready(function() {
    $('footer').hide();
    $('footer').removeClass('d-none');
    $('input').on('keyup', function() {$('footer .save').attr("disabled", false);$('footer').slideDown();});
    $('input').on('change', function() {$('footer .save').attr("disabled", false);$('footer').slideDown();});

    $('#set-role').on('change', function() {change_set_Role();});
    $('.fingerprint-button').on('click', function() {change_fingerPrint();});
    $('.delete').on('click', function() {
      delete_data();}
    );
    $('#delete-modal .confirm').on('click', function() {change_to_Add_mode();});
    $('#leave-modal .continue').on('click', function() {
      $('footer .save').attr("disabled", true);
      if(isEdit == true) {
          change_to_Add_mode();
      } else {
          change_to_Edit_mode();
      }
  });
    $('footer .save').on('click', function() {save_data();});
    $('footer .cancel').on('click', function() {cancel_data();});
    $('#delete-modal .confirm').on('click', function() {remove_row();});
    setTimeout(() => {
        event_format();
    }, 1200);
});

function cancel_data() {
    if($('.save').attr("disabled"))
        change_to_Add_mode();
    else $('#leave-modal').modal("show");
}

function event_format() {
    $('#chk-bo').on('click', function() {change_bo_visible();});
    $('#chk-pos').on('change', function() {change_bo_visible();});

    $('.edit').on('click', function(){
      selected_row = $(this).parent().parent().parent().parent();
      change_to_Edit_mode(this);
    });
    $('.delete-item').on('click', function() {delete_row(this);});

    $('.searchable tr').on('click', function(ev) {select_row(ev);});
}

function select_row(ev) {
  if(ev.target.tagName == "I") return;
  if($(ev.target).find('i').length > 0) return;
  selected_row = $(ev.target).parent();
  change_to_Edit_mode($(ev.target));
}

function change_bo_visible() {
  if($('#chk-bo').prop("checked")) {
    $('.bo-field').removeClass("d-none");
    $('.chk-bo-title').addClass("text-dark");
    $('.chk-bo-info').removeClass("text-muted");
  }
  else {
    $('.bo-field').addClass("d-none");
    $('.chk-bo-title').removeClass("text-dark");
    $('.chk-bo-info').addClass("text-muted");
  }
  
  if($('#chk-pos').prop("checked")) {
    $('.pos-field').removeClass("d-none");
    $('.chk-pos-title').addClass("text-dark");
    $('.chk-pos-info').removeClass("text-muted");
  }
  else {
    $('.pos-field').addClass("d-none");
    $('.chk-pos-title').removeClass("text-dark");
    $('.chk-pos-info').addClass("text-muted");
  }
}

function change_to_Add_mode() {
    isEdit = false;
    $('input').val("");
    $('.role-title').text("Create role");
    $('.role-name').text("");
    $('input[type="checkbox"]').prop("checked", true);
    $('#chk-bo').prop("checked", false);
    $('#chk-pos').prop("checked", false);
    $('#chk-bo').trigger('change');
    $('#chk-pos').trigger('change');
    $('footer .save').attr("disabled", true);
    setTimeout(() => {
        $('footer .delete').addClass("d-none");
    }, 400);
    $('footer').slideUp();
}

function change_to_Edit_mode(ev) {
  if(!$('footer .save').attr("disabled")) $('#leave-modal').modal("show");
    else {
      isEdit = true;
      var role_name = $(selected_row).find('td').eq(0).text().split(' ');
      var access = $(selected_row).find('td').eq(1).text().toString();
      $('.delete-name').text(role_name[0]);
      $('.role-title').text("Edit ");
      $('.role-name').text(role_name[0]);
      $('.role-value').val(role_name);
      if(access.indexOf("BO") >= 0) $('#chk-bo').prop("checked", true);
      if(access.indexOf("POS") >= 0) $('#chk-pos').prop("checked", true);
      $('#chk-bo').trigger('change');
      $('#chk-pos').trigger('change');
      $('footer .save').attr("disabled", true);
      $('footer .delete').removeClass("d-none");
      $('footer').slideDown();
    }
}

function save_data() {
    var result_html;
    let permission_str = "";
    if($('#chk-bo').prop("checked")) permission_str += "BO ";
    if($('#chk-pos').prop("checked")) {
      if(permission_str != "") permission_str += "& ";
      permission_str += "POS";
    }
    if(isEdit == true) {
        let row_id = selected_row.data('index');
        $('#table').bootstrapTable('updateRow', {
            index: row_id,
            row: {
                role_type: `${$('.role-value').val()}`,
                permission: `${permission_str}`,
                employee_count: `3`,
            }
        });
        notification(`${$('.role-value').val()} role updated successfully.`);
        change_to_Add_mode();
        event_format();
    } else {
        result_html += `
        <tr>
            <td>${$('.role-value').val()}</td>
            <td>${permission_str}</td>
            <td>0</td>
            <td>
                <div class="item-action dropdown text-right px-0">
                    <a data-toggle="dropdown" class="text-muted a-more"><i class="i-con i-con-more"><i></i></i></a>
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
            </td>
        </tr>
        `;
        $('table tbody').append(result_html);
        var rows = [];
        rows.push({
            role_type: `${$('.role-value').val()}`,
            permission: `${permission_str}`,
            employee_count: `0`,
            menu: `<div class="item-action dropdown text-right px-0">
                <a data-toggle="dropdown" class="text-muted a-more"><i class="i-con i-con-more"><i></i></i></a>
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
            </div>`,
        });
        $('table').bootstrapTable('append', rows);
        notification(`${$('.role-value').val()} role added successfully.`);
        change_to_Add_mode();
        event_format();
    }
}

function delete_data() {
  console.log($(selected_row));
    if($(selected_row).find('td').eq(2).text() == "0") {
      $('#delete-modal').modal("show");
    } else {
      $('#unable-delete-modal').modal("show");
    }
}

function delete_row(ev) {
    selected_row = $(ev).parent().parent().parent().parent();
    $('.delete-name').text($(selected_row).find('td').eq(0).text());
    delete_data();
}

function remove_row() {
    notification(`${$(selected_row).find('td').eq(0).text()} role deleted successfully.`);
    let row_id = selected_row.data('index');
    $('#table').bootstrapTable('remove', {
        field: '$index',
        values: [row_id]
    });
    $(selected_row).remove();
    $('footer').slideUp();
    event_format();
}