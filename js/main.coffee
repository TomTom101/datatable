
$(document).ready () ->
  $('#example').DataTable
    ajax: 'data'
    columns: [
        (data: "product" )
        (data: "price" )
    ]
