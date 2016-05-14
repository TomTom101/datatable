var $categories, $products, groupedData, priceFormatter, sumFormatter;

priceFormatter = function(value) {
  return Math.round(value);
};

sumFormatter = function(data) {
  var sum;
  sum = _.chain(data).reduce((function(_this) {
    return function(memo, data) {
      return memo + parseFloat(data[_this.field]);
    };
  })(this), 0.0).value();
  return Math.floor(sum / 500) * 500;
};

groupedData = function(data) {
  var categories;
  categories = _.chain(data).groupBy(function(data) {
    return data.product;
  }).map(function(data) {
    return _.reduce(data, function(memo, set) {
      return {
        category: set.product,
        sum: parseFloat(set.price) + memo.sum
      };
    }, {
      sum: 0
    });
  }).value();
  return $categories.bootstrapTable({
    data: categories
  });
};

$products = $('#products');

$categories = $('#categories');

$products.bootstrapTable({
  onLoadSuccess: groupedData
});

$(document).ready(function() {
  return $('#get-data').click(function() {
    var data;
    data = $products.bootstrapTable('getData');
    return alert(JSON.stringify(data));
  });
});
