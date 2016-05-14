dataSet =
  [
    (name: "bla", salary: 102)
    (name: "Goasd", salary: 234)
  ]


$(document).ready () ->
  $('#example').DataTable
    data: dataSet,
    columns: [
        (data: "name" )
        (data: "salary" )
    ]
