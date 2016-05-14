
priceFormatter = (value) ->
  Math.round value


$(document).ready () ->
  $('#grid').w2grid(
        name: 'grid'
        show:
          toolbar: on
          toolbarSave: on
        onSubmit: (event) -> console.log event
        method: 'GET'
        columns: [
            { field: 'product', editable: {type: 'text'}, caption: 'Product', size: '30%', sortable: true }
            { field: 'price', editable: {type: 'float'}, render: 'currency', caption: 'Price', size: '120px', sortable: true }
        ]
        # records: [
        #      { product: 'TEST', price: 100.23 }
        #  ]
    )
