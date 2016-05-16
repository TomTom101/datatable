$products = $ '#products'
$categories = $ '#categories'

customizer = (o1, o2) ->
  if (_.isNumber(o1) or _.isNumber o2)
    [o1, o2]

uids = (d1, d2) ->
  _.chain (_.union d1, d2, 'id')
  .map (d) -> d.id
  .uniq()
  .map (id) ->
    o1 = _.find(d1, id: id)
    o2 = _.find(d2, id: id)
    _.mergeWith o1, o2, customizer
  .value()


compare = (cb) ->
  d1 = $products.bootstrapTable 'getData'
  $.get './data', (d2) ->
    data =  uids(d1, d2)
    $products.bootstrapTable 'load', data
    cb data


priceFormatter = (value) ->
  value
  #return value if(_.isArray(value))
  #Math.round value

arrayFormatter = (value) ->
  Math.round((value[0]/value[1] - 1 )* 100) + '%'

dailyFormatter = (value) ->
  Math.round value * 10

arraySumFormatter = (data) ->
  #return if data.length is 0
  #console.log data[0]?[@field]

sumFormatter = (data) ->
  sum = _.chain data
    .reduce (memo, set) =>
      if _.isArray set[@field]
        (parseFloat(i) + memo[k] for i, k in set[@field])
      else
        [memo[0] + parseFloat set[@field]]#, 0.0]
          #[memo[k]+parseFloat(i) for i, k in data[@field]]
      #   [sumFormatter(set) for set in data[@field]]
      #console.log data[@field], data[@field][0]
      # value = window[@formatter]? data[@field]
      # value = data[@field] if !value?
    , [0.0, 0.0]
    .value()
  sum

groupedData = (field) ->
  (data, filter) ->
    # before we can use load, we need to set it up once
    $categories.bootstrapTable data: newData unless filter
    newData =
      _.chain data
      .filter filter
      .groupBy (data) -> data.product
      .map (data) ->
        _.reduce data, (memo, set) ->
          if _.isArray set[field]
            sum = (parseFloat(i) + memo.sum[k] for i, k in set[field])
          else
            sum = [set[field] + memo.sum[0]]
          category: set.product
          sum: sum
        , sum: [0.0, 0.0]
      .value()
    #console.log newData
    $categories.bootstrapTable 'load', newData

onCheck = ->
  allData = $products.bootstrapTable 'getData'
  groupedData('units') allData, (data) ->
    !data.state

$products.bootstrapTable
  onLoadSuccess: groupedData 'units'
  onCheck: onCheck
  onCheckSome: onCheck
  onUncheck: onCheck
  onUncheckSome: onCheck
  onCheckAll: onCheck
  onCheckAllSome: onCheck
  onCheckSome: () -> console.log "check some"

$(document).ready () ->

  $('#compare-data').click ->
    compare ->
      onCheck()

  $('#save-data').click ->
    data = $products.bootstrapTable 'getData'
    $.ajax
      type: 'POST'
      contentType: 'application/json'
      data: JSON.stringify(data)
      url: './files'
      success: (data) -> console.log data
    #alert JSON.stringify data
