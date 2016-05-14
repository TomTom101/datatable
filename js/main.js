var priceFormatter;

priceFormatter = function(value) {
  return Math.round(value);
};

$(document).ready(function() {
  return $('#grid').w2grid({
    name: 'grid',
    show: {
      toolbar: true,
      toolbarSave: true
    },
    onSubmit: function(event) {
      return console.log(event);
    },
    method: 'GET',
    columns: [
      {
        field: 'product',
        editable: {
          type: 'text'
        },
        caption: 'Product',
        size: '30%',
        sortable: true
      }, {
        field: 'price',
        editable: {
          type: 'float'
        },
        render: 'currency',
        caption: 'Price',
        size: '120px',
        sortable: true
      }
    ]
  });
});
