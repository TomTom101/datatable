
priceFormatter = (value) ->
  Math.round value

sumFormatter = (data) ->
  _.chain data
    .reduce (memo, data) ->
      memo + parseFloat(data.price)
    , 0
    .value()


$(document).ready () ->
  $table = $ '#table'

  $table.bootstrapTable 'refreshOptions',
    search: true
    showRefresh: true
    showFooter: true
    url: './data'

  $('#get-data').click ->
    data = $table.bootstrapTable 'getData'
    alert JSON.stringify data
