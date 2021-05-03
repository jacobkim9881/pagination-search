// lazyload config
var prefix = '/home/kim/SBO/agiletemplate.herokuapp.com';
var MODULE_CONFIG = {
  chat: [
    prefix + '/libs/list.js/dist/list.js',
    prefix + '/libs/notie/dist/notie.min.js',
    prefix + '/assets/js/plugins/notie.js',
    prefix + '/assets/js/app/chat.js'
  ],
  mail: [
    prefix + '/libs/list.js/dist/list.js',
    prefix + '/libs/notie/dist/notie.min.js',
    prefix + '/assets/js/plugins/notie.js',
    prefix + '/assets/js/app/mail.js'
  ],
  user: [
    prefix + '/libs/list.js/dist/list.js',
    prefix + '/libs/notie/dist/notie.min.js',
    prefix + '/assets/js/plugins/notie.js',
    prefix + '/assets/js/app/user.js'
  ],
  search: [
       prefix + '/libs/list.js/dist/list.js',
       prefix + '/assets/js/app/search.js'
  ],
  invoice: [
    prefix + '/libs/list.js/dist/list.js',
    prefix + '/libs/notie/dist/notie.min.js',
    prefix + '/assets/js/app/invoice.js'
  ],
  screenfull: [
      prefix + '/libs/screenfull/dist/screenfull.js',
      prefix + '/assets/js/plugins/screenfull.js'
  ],
  jscroll: [
    prefix + '/libs/jscroll/dist/jquery.jscroll.min.js'
  ],
  countTo: [
    prefix + '/libs/jquery-countto/jquery.countTo.js'
  ],
  stick_in_parent: [
    prefix + '/libs/sticky-kit/dist/sticky-kit.min.js'
  ],
  stellar: [
    prefix + '/libs/jquery.stellar/jquery.stellar.min.js',
    prefix + '/assets/js/plugins/stellar.js'
  ],
  scrollreveal: [
    prefix + '/libs/scrollreveal/dist/scrollreveal.min.js',
    prefix + '/assets/js/plugins/jquery.scrollreveal.js'
  ],
  masonry: [
    prefix + '/libs/masonry-layout/dist/masonry.pkgd.min.js'
  ],
  owlCarousel: [
    prefix + '/libs/owl.carousel/dist/assets/owl.carousel.min.css',
    prefix + '/libs/owl.carousel/dist/assets/owl.theme.css',
    prefix + '/libs/owl.carousel/dist/owl.carousel.min.js'
  ],
  html5sortable: [
    prefix + '/libs/html5sortable/dist/html.sortable.min.js',
    prefix + '/assets/js/plugins/jquery.html5sortable.js',
    prefix + '/assets/js/plugins/sortable.js'
  ],
  easyPieChart: [
    prefix + '/libs/easy-pie-chart/dist/jquery.easypiechart.min.js'
  ],
  peity: [
    prefix + '/libs/peity/jquery.peity.js',
    prefix + '/assets/js/plugins/jquery.peity.tooltip.js'
  ],
  chartjs: [
    prefix + '/libs/moment/min/moment-with-locales.min.js',
    prefix + '/libs/chart.js/dist/Chart.min.js',
    prefix + '/assets/js/plugins/jquery.chartjs.js',
    prefix + '/assets/js/plugins/chartjs.js'
  ],
  dataTable: [
    prefix + '/libs/datatables/media/js/jquery.dataTables.min.js',
    prefix + '/libs/datatables.net-bs4/js/dataTables.bootstrap4.js',
    prefix + '/libs/datatables.net-bs4/css/dataTables.bootstrap4.css',
    prefix + '/assets/js/plugins/datatable.js'
  ],
  bootstrapTable: [
    prefix + '/libs/bootstrap-table/dist/bootstrap-table.min.js',
    prefix + '/libs/bootstrap-table/dist/extensions/export/bootstrap-table-export.min.js',
    prefix + '/libs/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile.min.js',
    prefix + '/assets/js/plugins/tableExport.min.js',
    prefix + '/assets/js/plugins/bootstrap-table.js'
  ],
  bootstrapWizard: [
    prefix + '/libs/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js'
  ],
  dropzone: [
    prefix + '/libs/dropzone/dist/min/dropzone.min.js',
     prefix + '/libs/dropzone/dist/min/dropzone.min.css'
  ],
  typeahead: [
    prefix + '/libs/typeahead.js/dist/typeahead.bundle.min.js',
    prefix + '/assets/js/plugins/typeahead.js'
  ],
  datepicker: [
    prefix + "/libs/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js",
    prefix + "/libs/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css",
  ],
  daterangepicker: [
    prefix + "/libs/daterangepicker/daterangepicker.css",
    prefix + '/libs/moment/min/moment-with-locales.min.js',
    prefix + "/libs/daterangepicker/daterangepicker.js"
  ],
  fullCalendar: [
    prefix + '/libs/moment/min/moment-with-locales.min.js',
    prefix + '/libs/fullcalendar/dist/fullcalendar.min.js',
    prefix + '/libs/fullcalendar/dist/fullcalendar.min.css',
    prefix + '/assets/js/app/calendar.js'
  ],
  parsley: [
    prefix + '/libs/parsleyjs/dist/parsley.min.js'
  ],
  select2: [
    prefix + '/libs/select2/dist/css/select2.min.css',
    prefix + '/libs/select2/dist/js/select2.min.js',
    prefix + '/assets/js/plugins/select2.js'
  ],
  summernote: [
    prefix + '/libs/summernote/dist/summernote.css',
    prefix + '/libs/summernote/dist/summernote-bs4.css',
    prefix + '/libs/summernote/dist/summernote.min.js',
    prefix + '/libs/summernote/dist/summernote-bs4.min.js'
  ],
  vectorMap: [
    prefix + '/libs/jqvmap/dist/jqvmap.min.css',
    prefix + '/libs/jqvmap/dist/jquery.vmap.js',
    prefix + '/libs/jqvmap/dist/maps/jquery.vmap.world.js',
    prefix + '/libs/jqvmap/dist/maps/jquery.vmap.usa.js',
    prefix + '/libs/jqvmap/dist/maps/jquery.vmap.france.js',
    prefix + '/assets/js/plugins/jqvmap.js'
  ],
  plyr: [
    prefix + '/libs/plyrist/src/plyrist.css',
    prefix + '/libs/plyrist/src/plyrist.js',
    prefix + '/libs/plyr/dist/plyr.css',
    prefix + '/libs/plyr/dist/plyr.polyfilled.min.js',
    prefix + '/assets/js/plugins/plyr.js'
  ],
  notie: [
    prefix + '/libs/notie/dist/notie.min.js',
    prefix + '/libs/notie/dist/notie.min.css',
    prefix + '/assets/js/plugins/notie.js'
  ],
  products_all_empty: [
    prefix + '/assets/js/office/products.empty.js'
  ]
};

var MODULE_OPTION_CONFIG = {
  parsley: {
    errorClass: 'is-invalid',
    successClass: 'is-valid',
    errorsWrapper: '<ul class="list-unstyled text-sm mt-1 text-muted"></ul>'
  }
}

module.exports = MODULE_CONFIG
