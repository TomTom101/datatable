
priceFormatter = (value) ->
  Math.round value

sumFormatter = (data) ->
  sum = _.chain data
    .reduce (memo, data) ->
      memo + parseFloat(data.price)
    , 0.0
    .value()
  Math.floor(sum/500) * 500

groupedData = (data) ->
  console.log data



$(document).ready () ->
  $table = $ '#table'
  $table.bootstrapTable
    onLoadSuccess: groupedData

  $('#get-data').click ->
    data = $table.bootstrapTable 'getData'
    alert JSON.stringify data
