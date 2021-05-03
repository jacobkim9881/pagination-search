(function ($) {
  "use strict";
    var return_html = ``;
    var init_load = 0;
  var init = function () {
	  //prefix
    var engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: '/assets/api/menu.json'
    });

    $('.typeahead').removeAttr('data-plugin').typeahead('destroy').typeahead({
      classNames: {
        menu: 'dropdown-menu mt-2'
      }
    }, {
      display: 'name',
      source: engine,
      templates: {
        suggestion: function (data) {
          return `
          <a class="dropdown-item" href="` + data.link + `">
            <span class="d-block font-weight-500">` + data.name + `</span>
            <small class="text-muted">` + data.sku + `</small>
          </a>`;
        }
      }
    }
    ).on('typeahead:rendered', function (obj, datum) {
      // for ajax
      $(document).trigger('refresh');
	    console.log(obj.target.value);
    var engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: prefix + '/assets/api/menu.json'
    });
engine.initialize().then(function() {
console.log('engine init done');
  engine.search(
    obj.target.value,
    function(d) {
      console.log(d);
    },
    function(d) {
      console.log(d);
    }
  );
});	  

    });


  
    var data = [{
        "id": "1",
        "name": "Taanayel Laban 500g",
        "sku": "SKU 23623",
        "barcode": "7457437585",
        "vat": "VAT 11%",
        "type": "each",
        "stock": "12",
        "destination_stock": "0"
    },
    {
        "id": "2",
        "name": "Second Laban 500g",
        "sku": "SKU 23516",
        "barcode": "9285728329",
        "vat": "",
        "type": "each",
        "stock": "12",
        "destination_stock": "0"
    },
    {
        "id": "3",
        "name": "Third Laban 500g",
        "sku": "SKU 20385",
        "barcode": "1068493058",
        "vat": "VAT 11%",
        "type": "weight",
        "stock": "12",
        "destination_stock": "0"
    },
    {
        "id": "4",
        "name": "Fourth Laban 500g",
        "sku": "SKU 40358",
        "barcode": "7384769283",
        "vat": "VAT 11%",
        "type": "weight",
        "stock": "12.234",
        "destination_stock": "0.000"
    }];

    var reason_data = [{
        "text": "Reason1"
      }, {
        "text": "Reason2"
      }
    ];

    var category_data = [
      {
        "name": "Bakery"
      },
      {
        "name": "Catering"
      },
      {
        "name": "Pastyy"
      },
      {
        "name": "Arabic sweets"
      }
    ];

    var employee_data = [
      {
        "name" : "Jassie James",
        "type" : "Bakery Employee"
      },
      {
        "name" : "John Doe",
        "type" : "Restaurant Employee"
      },
    ];

    var customer_data = [
      {
        "name" : "Angela Khouwerie",
        "type" : "#123048574"
      },
      {
        "name" : "John Doe",
        "type" : "#918201923"
      },
    ];
  
    var product_engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: $.map(data, function(d) {
        return {
          value: d.name,
          suggestion: d
        }
      }).concat($.map(data, function(d) {
        return {
          value: d.sku,
          suggestion: d
        }
      })).concat($.map(data, function(d) {
        return {
          value: d.barcode,
          suggestion: d
        }
      })).concat($.map(data, function(d) {
        return {
          value: d.type,
          suggestion: d
        }
      })).concat($.map(data, function(d) {
        return {
          value: d.stock,
          suggestion: d
        }
      })).concat($.map(data, function(d) {
        return {
          value: d.vat,
          suggestion: d
        }
      })).concat($.map(data, function(d) {
        return {
          value: d.destination_stock,
          suggestion: d
        }
      }))
    });
    product_engine.initialize();

    var reason_engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: $.map(reason_data, function(d) {
        return {
          value: d.text,
          suggestion: d
        }
      })
    });
    reason_engine.initialize();

    var category_engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: $.map(category_data, function(d) {
        return {
          value: d.name,
          suggestion: d
        }
      })
    });
    category_engine.initialize();
  
    var employee_engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: $.map(employee_data, function(d) {
        return {
          value: d.name,
          suggestion: d
        }
      }).concat($.map(employee_data, function(d) {
        return {
          value: d.type,
          suggestion: d
        }
      }))
    });
    employee_engine.initialize();

    var customer_engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: $.map(customer_data, function(d) {
        return {
          value: d.name,
          suggestion: d
        }
      }).concat($.map(customer_data, function(d) {
        return {
          value: d.type,
          suggestion: d
        }
      }))
    });
    customer_engine.initialize();

    $('.product_typeahead').removeAttr('data-plugin').typeahead('destroy').typeahead({
      classNames: {
        menu: 'dropdown-menu dropdown-margin'
      }
    }, {
      displayKey: 'value',
      source: product_engine,
      templates: {
        suggestion: function (data) {
          return `
          <div class="dropdown-item product_item row d-flex w-100 align-items-center" style="margin-left:1px; cursor:pointer;" onclick="add_product(this)">
            <div class="col-6">
              <span class="d-block composite-product-name" style="font-size: 0.75rem;"><b>` + data.suggestion.name + `</b></span>
              <small class="text-muted product-info composite-product-info">` + data.suggestion.sku + " | " + data.suggestion.barcode + (data.suggestion.vat != "" ? " | " : "") + data.suggestion.vat + `</small>
              <span class="type d-none">` + data.suggestion.type + `
            </div>
          </div>`;
        }
      }
    }
    ).on('typeahead:rendered', function (obj, datum) {
      // for ajax
      $(document).trigger('refresh');
    });

    $('.po_typeahead').removeAttr('data-plugin').typeahead('destroy').typeahead({
      classNames: {
        menu: 'dropdown-menu dropdown-margin'
      }
    }, {
      displayKey: 'value',
      source: product_engine,
      templates: {
        suggestion: function (data) {
          return_html = ``;
          if(!init_load) {
            return_html = `
            <div class="col-12 px-0">
              <div class="dropdown-item product_item row d-flex w-100 align-items-center border-bottom pb-2 mb-2" style="margin-left:1px; cursor:default; pointer-events:none;" onclick="remove_event(event)">
                <div class="col-9">
                  <span class="d-block composite-product-name text-muted" style="font-size: 0.75rem;"><b>Product Name</b></span>
                </div>
                <div class="col-3">
                  <span class="d-block composite-product-stock text-right text-muted" style="font-size: 0.75rem;"><b>Stock</b></span>
                </div>
                <div class="d-none">
                  <span class="number-type"></span>
                </div>
              </div>
            `;
          }
          return_html += `
          <div class="dropdown-item product_item row d-flex w-100 align-items-center" style="margin-left:1px; cursor:pointer;" onclick="add_product(this);">
            <div class="col-6">
              <span class="d-block composite-product-name" style="font-size: 0.75rem;"><b>` + data.suggestion.name + `</b></span>
              <small class="text-muted product-info composite-product-info">` + data.suggestion.sku + " | " + data.suggestion.barcode + (data.suggestion.vat != "" ? " | " : "") + data.suggestion.vat + `</small>
              <span class="type d-none">` + data.suggestion.type + `
            </div>
            <div class="col-6">
              <span class="d-block composite-product-stock text-right" style="font-size: 0.75rem;"><b>` + data.suggestion.stock + `</b></span>
            </div>
          </div>`;
          if(!init_load) {
            return_html += "</div>";
          }
          init_load ++;
          return return_html;
        }
      }
    }
    ).on('typeahead:rendered', function (obj, datum) {
      init_load = 0;
      // for ajax
      $(document).trigger('refresh');
    });

    $('.transfer_typeahead').removeAttr('data-plugin').typeahead('destroy').typeahead({
      classNames: {
        menu: 'dropdown-menu dropdown-margin'
      }
    }, {
      displayKey: 'value',
      source: product_engine,
      templates: {
        suggestion: function (data) {
          return_html = ``;
          if(!init_load) {
            return_html = `
            <div class="col-12 px-0">
              <div class="dropdown-item product_item row d-flex w-100 align-items-center border-bottom pb-2 mb-2" style="margin-left:1px; cursor:default; pointer-events:none;" onclick="remove_event(event)">
                <div class="col-6">
                  <span class="d-block composite-product-name text-muted" style="font-size: 0.75rem;"><b>Product Name</b></span>
                </div>
                <div class="col-3">
                  <span class="d-block origin-stock text-right text-muted" style="font-size: 0.75rem;"><b>Origin Stock</b></span>
                </div>
                <div class="col-3">
                  <span class="d-block destination-stock text-right text-muted" style="font-size: 0.75rem;"><b>Destination Stock</b></span>
                </div>
                <div class="d-none">
                  <span class="number-type"></span>
                </div>
              </div>
            `;
          }
          return_html += `
          <div class="dropdown-item product_item row d-flex w-100 align-items-center" style="margin-left:1px; cursor:pointer;" onclick="add_product(this)">
            <div class="col-6">
              <span class="d-block composite-product-name" style="font-size: 0.75rem;"><b>` + data.suggestion.name + `</b></span>
              <small class="text-muted product-info composite-product-info">` + data.suggestion.sku + " | " + data.suggestion.barcode + (data.suggestion.vat != "" ? " | " : "") + data.suggestion.vat + `</small>
              <span class="type d-none">` + data.suggestion.type + `
            </div>
            <div class="col-3">
              <span class="d-block origin-stock text-right" style="font-size: 0.75rem;"><b>` + data.suggestion.stock + `</b></span>
            </div>
            <div class="col-3">
              <span class="d-block destination-stock text-right" style="font-size: 0.75rem;"><b>` + data.suggestion.destination_stock + `</b></span>
            </div>
            <div class="d-none">
              <span class="number-type">` + data.suggestion.type + `</span>
            </div>
          </div>`;
          if(!init_load) {
            return_html += "</div>";
          }
          init_load ++;
          return return_html;
        }
      }
    }
    ).on('typeahead:rendered', function (obj, datum) {
      // for ajax
      init_load = 0;
      $(document).trigger('refresh');
    });
    
    $('.reason_typeahead').removeAttr('data-plugin').typeahead('destroy').typeahead({
      classNames: {
        menu: 'dropdown-menu dropdown-margin'
      }
    }, {
      displayKey: 'value',
      source: reason_engine,
      templates: {
        suggestion: function (data) {
          return_html = `
          <div class="dropdown-item product_item row d-flex w-100 align-items-center" style="margin-left:1px; cursor:pointer;">
            <div class="col-12">
              <span class="d-block composite-product-name" style="font-size: 0.75rem;"><b>` + data.suggestion.text + `</b></span>
            </div>
          </div>`;
          return return_html;
        }
      }
    }
    ).on('typeahead:rendered', function (obj, datum) {
      // for ajax
      $(document).trigger('refresh');
    });

    $('.service_typeahead').removeAttr('data-plugin').typeahead('destroy').typeahead({
      classNames: {
        menu: 'dropdown-menu dropdown-margin'
      }
    }, {
      displayKey: 'value',
      source: reason_engine,
      templates: {
        suggestion: function (data) {
          return_html = `
          <div class="dropdown-item product_item row d-flex w-100 align-items-center" style="margin-left:1px; cursor:pointer;">
            <div class="col-12">
              <span class="d-block composite-product-name" style="font-size: 0.75rem;"><b>` + data.suggestion.text + `</b></span>
            </div>
          </div>`;
          return return_html;
        }
      }
    }
    ).on('typeahead:rendered', function (obj, datum) {
      // for ajax
      $(document).trigger('refresh');
    });

    $('.category_typeahead').removeAttr('data-plugin').typeahead('destroy').typeahead({
      classNames: {
        menu: 'dropdown-menu dropdown-margin'
      }
    }, {
      displayKey: 'value',
      source: category_engine,
      templates: {
        suggestion: function (data) {
          return_html = `
          <div class="dropdown-item product_item row d-flex w-100 align-items-center" style="margin-left:1px; cursor:pointer;" onclick="add_category(this);">
            <div class="col-12">
              <span class="d-block category-name" style="font-size: 0.75rem;"><b>` + data.suggestion.name + `</b></span>
            </div>
          </div>`;
          return return_html;
        }
      }
    }
    ).on('typeahead:rendered', function (obj, datum) {
      // for ajax
      $(document).trigger('refresh');
    });

    $('.employee_typeahead').removeAttr('data-plugin').typeahead('destroy').typeahead({
      classNames: {
        menu: 'dropdown-menu dropdown-margin'
      }
    }, {
      displayKey: 'value',
      source: employee_engine,
      templates: {
        suggestion: function (data) {
          return_html = `
          <div class="dropdown-item product_item row d-flex w-100 align-items-center" style="margin-left:1px; cursor:pointer;" onclick="add_employee(this);">
            <div class="col-12">
              <span class="d-block employee-name" style="font-size: 0.75rem;"><b>` + data.suggestion.name + `</b></span>
              <small class="text-muted product-info employee-type">` + data.suggestion.type + `</small>
            </div>
          </div>`;
          return return_html;
        }
      }
    }
    ).on('typeahead:rendered', function (obj, datum) {
      // for ajax
      $(document).trigger('refresh');
    });

    $('.customer_typeahead').removeAttr('data-plugin').typeahead('destroy').typeahead({
      classNames: {
        menu: 'dropdown-menu dropdown-margin'
      }
    }, {
      displayKey: 'value',
      source: customer_engine,
      templates: {
        suggestion: function (data) {
          return_html = `
          <div class="dropdown-item product_item row d-flex w-100 align-items-center" style="margin-left:1px; cursor:pointer;" onclick="add_customer(this);">
            <div class="col-12">
              <span class="d-block customer-name" style="font-size: 0.75rem;"><b>` + data.suggestion.name + `</b></span>
              <small class="text-muted product-info customer-type">` + data.suggestion.type + `</small>
            </div>
          </div>`;
          return return_html;
        }
      }
    }
    ).on('typeahead:rendered', function (obj, datum) {
      // for ajax
      $(document).trigger('refresh');
    });
  }
  // for ajax to init again
  $.fn.typeahead.init = init;

})(jQuery);
