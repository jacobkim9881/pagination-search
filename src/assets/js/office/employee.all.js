var isEdit = false;
var isCancel = 1;
var selected_row;
$(document).ready(function() {
    $('footer').hide();
    $('footer').removeClass('d-none');
    $('.select-store').selectpicker();
    $('.select-pos').selectpicker();
    $('.btn-eye').on('click', function (){change_Eye_type()});
    $('input').on('keyup', function() {$('footer .save').attr("disabled", false);$('footer').slideDown();});
    $('input').on('change', function() {$('footer .save').attr("disabled", false);$('footer').slideDown();});
    $('.role-select').on('change', function() {select_Role(this);});
    $('.fingerprint-button').on('click', function() {change_fingerPrint();});
    $('.delete').on('click', function() {$('#delete-modal').modal("show");});
    $('#leave-modal .continue').on('click', function() {
        $('footer .save').attr("disabled", true);
        if(isCancel == 1) {
            change_to_Add_mode();
        } else {
            change_to_Edit_mode();
        }
    });
    $('#delete-modal .confirm').on('click', function() {change_to_Add_mode();});
    $('.la-close').on('click', function() {
        $('.green-fingerprint').addClass("d-none");
        $('.green-fingerprint').removeClass("d-flex");
        $('.dark-fingerprint').removeClass("d-none");
        $('.dark-fingerprint').addClass("d-flex");
    });
    $('footer .save').on('click', function() {save_data();});
    $('footer .cancel').on('click', function() {cancel_data();});
    $('#delete-modal .confirm').on('click', function() {remove_row();});
    $(".each").off("keypress");
    $(".each").keypress(return_decimal);
    $(".weight").off("keypress");
    $(".weight").on('keypress', return_decimal);
    setTimeout(() => {
        $('#set-role').on('change', function() {change_set_Role();});
    }, 500);
    setTimeout(() => {
        event_format();
    }, 1200);
    if($('.back-url').text() != "") {
        change_to_Edit_mode();
    }
});

function dropDown_List_Cnt(ev) {
    if($(ev).parent().parent().find("li").eq(0).hasClass("selected")) return $(ev).parent().parent().find("li.selected").length - 1;
    return $(ev).parent().parent().find("li.selected").length;
}

function return_integer(event) {
    return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44;
}
function return_decimal(event) {
    return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44 || event.charCode == 190;
}

function event_format() {
    $('.edit').on('click', function(){
        selected_row = $(this).parent().parent().parent().parent();
        change_to_Edit_mode(this);
    });
    $(".number-format").on('keyup', function (e) {
        if(e.keyCode == 65 || e.keyCode == 17) {
          return;
        }
        $(this).val($(this).val().replace(/,/g, ''));
        $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    });
    $('.delete-item').on('click', function() {delete_row(this);});
    $('.searchable tr').on('click', function(ev) {select_row(ev);});

    $('.select-store').on('change', function(){
        
        $('.filter-option.pull-left').eq(0).css("color", "black");
		var thisObj = $(this);
        var isAllSelected = thisObj.find('option[value="All"]').prop('selected');
        var lastAllSelected = $(this).data('all');
        var selectedOptions = (thisObj.val())?thisObj.val():[];
        var allOptionsLength = thisObj.find('option[value!="All"]').length;
        var selectedOptionsLength = selectedOptions.length;
        
        if(isAllSelected == lastAllSelected){
        
            if($.inArray("All", selectedOptions) >= 0){
                selectedOptionsLength -= 1;
            }
            if(allOptionsLength <= selectedOptionsLength){
                thisObj.find('option[value="All"]').prop('selected', true).parent().selectpicker('refresh');
                isAllSelected = true;
            }else{       
                thisObj.find('option[value="All"]').prop('selected', false).parent().selectpicker('refresh');
                for(let i in selectedOptions) {
                    thisObj.find(`option[value="${selectedOptions[i]}"]`).prop('selected', true);
                }
                isAllSelected = false;
            }        
        }else{   		
            thisObj.find('option').prop('selected', isAllSelected).parent().selectpicker('refresh');
        }
        $(this).data('all', isAllSelected);
    }).trigger("change");
    $('.select-pos').on('change', function(){
		var thisObj = $(this);
        $('.filter-option.pull-left').eq(1).css("color", "black");
        var isAllSelected = thisObj.find('option[value="All"]').prop('selected');
        var lastAllSelected = $(this).data('all');
        var selectedOptions = (thisObj.val())?thisObj.val():[];
        var allOptionsLength = thisObj.find('option[value!="All"]').length;
        var selectedOptionsLength = selectedOptions.length;
        
        if(isAllSelected == lastAllSelected){
        
            if($.inArray("All", selectedOptions) >= 0){
                console.log("decrease");
                selectedOptionsLength -= 1;
            }
            if(allOptionsLength <= selectedOptionsLength){
                thisObj.find('option[value="All"]').prop('selected', true).parent().selectpicker('refresh');
                isAllSelected = true;
            }else{       
                thisObj.find('option[value="All"]').prop('selected', false).parent().selectpicker('refresh');
                for(let i in selectedOptions) {
                    console.log(selectedOptions[i]);
                    thisObj.find(`option[value="${selectedOptions[i]}"]`).prop('selected', true);
                }
                isAllSelected = false;
            }        
        }else{   		
            thisObj.find('option').prop('selected', isAllSelected).parent().selectpicker('refresh');
        }
        $(this).data('all', isAllSelected);
    }).trigger("change");
}

function select_Role(ev) {
    if($(ev).hasClass("role-select")) {
        if($(ev).val() == "Admin") {
            $('.email-field').removeClass("d-none");
        } else $('.email-field').addClass("d-none");
    }
    $('footer .save').attr("disabled", false);
    $('footer').slideDown();
}

function change_fingerPrint() {
    if($('.fingerprint-type').text() == "Add fingerprint") $('#fingerprint-add-modal').modal("show");
    else {
        $('.green-fingerprint').removeClass("d-none");
        $('.green-fingerprint').addClass("d-flex");
        $('.dark-fingerprint').addClass("d-none");
        $('.dark-fingerprint').removeClass("d-flex");
        $('#fingerprint-change-modal').modal("show");
    }
}

function change_set_Role() {
    if($('#set-role').prop("checked")) $('.track-div').removeClass("d-none");
    else $('.track-div').addClass("d-none");
}

function change_Eye_type() {
    if($('.password-input').attr("type") == "password") {
        $('.fa-eye').toggleClass("fa-eye-slash");
        $('.password-input').attr("type", "text");
    } else {
        $('.fa-eye').toggleClass("fa-eye-slash");
        $('.password-input').attr("type", "password");
    }
}
function select_row(ev) {
    if(ev.target.tagName == "I") return;
    if($(ev.target).find('i').length > 0) return;
    selected_row = $(ev.target).parent();
    change_to_Edit_mode($(ev.target));
}

function change_to_Add_mode() {
    isEdit = false;
    $('input').val("");
    $('.employee-title').text("Add employee");
    $('.employee-name').text("");
    $('.role-select').val("");
    $('.select-store').selectpicker("deselectAll");
    $('.select-pos').selectpicker("deselectAll");
    $('.select-salary').val("Hourly");
    $('.select-days').val("0");
    $('#set-role').prop("checked", false);
    $('.track-div').addClass("d-none");
    $('.fingerprint-type').text("Add fingerprint");
    $('footer .save').attr("disabled", true);
    setTimeout(() => {
        $('footer .delete').addClass("d-none");
    }, 400);
    $('footer').slideUp();
}

function change_to_Edit_mode(ev) {
    if(!$('footer .save').attr("disabled")) {
        $('#leave-modal').modal("show");
        isCancel = 2;
    }
    else {
        isEdit = true;
        if($('.back-url').text() != "") {
            $('.employee-title').text("Edit ");
            $('.employee-name').text($('.title-item-name').text());
        } else {
            var employee_name = $(selected_row).find('td').eq(0).text().split(' ');
            var phone_number = $(selected_row).find('td').eq(1).text().toString();
            var email_address = $(selected_row).find('td').eq(2).text();
            var role_text= $(selected_row).find('td').eq(3).text();
            $('.employee-title').text("Edit ");
            $('.employee-name').text(employee_name[0] + " " + employee_name[1]);
            $('.first-name').val(employee_name[0]);
            $('.last-name').val(employee_name[1]);
            $('.role-select').val(role_text);
            $('.phone-number').val(phone_number);
            $('.email-address').val(email_address);
        }
        $('.fingerprint-type').text("Change fingerprint");
        $('footer .save').attr("disabled", true);
        $('footer .delete').removeClass("d-none");
        $('footer').slideDown();
    }
}

function cancel_data() {
    if($('.save').attr("disabled"))
        change_to_Add_mode();
    else {
        $('#leave-modal').modal("show");
        isCancel = 1;
    }
}

function save_data() {
    var result_html;
    if(isEdit == true) {
        let row_id = selected_row.data('index');
        $('#table').bootstrapTable('updateRow', {
            index: row_id,
            row: {
                employee_name: `${$('.first-name').val()} ${$('.last-name').val()}`,
                phone_number: `${$('.phone-number').val()}`,
                email_address: `${$('.email-address').val()}`,
                role: `${$('.role-select').val()}`,
            }
        });
        notification($('.employee-name').text() + " updated successfully.");
        change_to_Add_mode();
        event_format();
    } else {
        result_html += `
        <tr>
            <td>${$('.first-name').val()} ${$('.last-name').val()}</td>
            <td>${$('.phone-number').val()}</td>
            <td>${$('.email-address').val()}</td>
            <td>${$('.role-select').val()}</td>
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
            employee_name: `${$('.first-name').val()} ${$('.last-name').val()}`,
            phone_number: `${$('.phone-number').val()}`,
            email_address: `${$('.email-address').val()}`,
            role: `${$('.role-select').val()}`,
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
        notification(`${$('.first-name').val()} ${$('.last-name').val()} added successfully.`);
        change_to_Add_mode();
        event_format();
    }
}

function delete_row(ev) {
    selected_row = $(ev).parent().parent().parent().parent();
    $('.delete-name').text($(selected_row).find('td').eq(0).text());
    $('#delete-modal').modal("show");
}

function remove_row() {
    notification($(selected_row).find('td').eq(0).text() + " deleted successfully.");
    let row_id = selected_row.data('index');
    $('#table').bootstrapTable('remove', {
        field: '$index',
        values: [row_id]
    });
    $(selected_row).remove();
    event_format();
}