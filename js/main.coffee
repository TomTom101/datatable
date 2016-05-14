
priceFormatter = (value) ->
  Math.round value


$(document).ready () ->
  $table = $ '#table'

  $table.bootstrapTable 'refreshOptions',
    search: true
    showRefresh: true
    url: './data'

  $('#get-data').click ->
    alert(JSON.stringify($table.bootstrapTable('getData')));
