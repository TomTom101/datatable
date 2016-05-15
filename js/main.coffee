$products = $ '#products'
$categories = $ '#categories'

priceFormatter = (value) ->
  Math.round value

dailyFormatter = (value) ->
  Math.round value * 10

sumFormatter = (data) ->
  #console.log @formatter
  sum = _.chain data
    .reduce (memo, data) =>
      value = window[@formatter]? data[@field]
      value = data[@field] if !value?
      memo + parseFloat value
    , 0.0
    .value()
  Math.floor(sum/500) * 500

groupedData = (data, filter) ->
  # before we can use load, we need to set it up once
  $categories.bootstrapTable data: newData unless filter
  newData =
    _.chain data
    .filter filter
    .groupBy (data) -> data.product
    .map (data) ->
      _.reduce data, (memo, set) ->
        category: set.product
        sum: parseFloat(set.price) + memo.sum
      , sum: 0
    .value()
  $categories.bootstrapTable 'load', newData

onCheck = ->
  allData = $products.bootstrapTable 'getData'
  groupedData allData, (data) ->
    !data.state

$products.bootstrapTable
  onLoadSuccess: groupedData
  onCheck: onCheck
  onUncheck: onCheck
  onCheckSome: () -> console.log "check some"

$(document).ready () ->

  $('#get-data').click ->
    data = $products.bootstrapTable 'getData'
    alert JSON.stringify data
