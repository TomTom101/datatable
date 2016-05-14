
priceFormatter = (value) ->
  Math.round value


$(document).ready () ->
  $table = $ '#table'

  $('#get-data').click ->
    alert(JSON.stringify($table.bootstrapTable('getData')));
