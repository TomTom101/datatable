
priceFormatter = (value) ->
  Math.round value

sumFormatter = (data) ->
  sum = _.chain data
    .reduce (memo, data) =>
      memo + parseFloat(data[@field])
    , 0.0
    .value()
  Math.floor(sum/500) * 500

groupedData = (data) ->
  categories = _.chain data
    .groupBy (data) -> data.product
    .map (data) ->
      _.reduce data, (memo, set) ->
        category: set.product
        sum: parseFloat(set.price) + memo.sum
      , sum: 0
    .value()
  $categories.bootstrapTable data: categories


$products = $ '#products'
$categories = $ '#categories'

$products.bootstrapTable
  onLoadSuccess: groupedData

$(document).ready () ->

  $('#get-data').click ->
    data = $products.bootstrapTable 'getData'
    alert JSON.stringify data
