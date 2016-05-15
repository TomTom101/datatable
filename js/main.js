var $categories, $products, dailyFormatter, groupedData, onCheck, priceFormatter, sumFormatter;

$products = $('#products');

$categories = $('#categories');

priceFormatter = function(value) {
  return Math.round(value);
};

dailyFormatter = function(value) {
  return Math.round(value * 10);
};

sumFormatter = function(data) {
  var sum;
  sum = _.chain(data).reduce((function(_this) {
    return function(memo, data) {
      var name, value;
      value = typeof window[name = _this.formatter] === "function" ? window[name](data[_this.field]) : void 0;
      if (value == null) {
        value = data[_this.field];
      }
      return memo + parseFloat(value);
    };
  })(this), 0.0).value();
  return Math.floor(sum / 500) * 500;
};

groupedData = function(data, filter) {
  var newData;
  if (!filter) {
    $categories.bootstrapTable({
      data: newData
    });
  }
  newData = _.chain(data).filter(filter).groupBy(function(data) {
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
  return $categories.bootstrapTable('load', newData);
};

onCheck = function() {
  var allData;
  allData = $products.bootstrapTable('getData');
  return groupedData(allData, function(data) {
    return !data.state;
  });
};

$products.bootstrapTable({
  onLoadSuccess: groupedData,
  onCheck: onCheck,
  onCheckSome: onCheck,
  onUncheck: onCheck,
  onUncheckSome: onCheck,
  onCheckAll: onCheck,
  onCheckAllSome: onCheck,
  onCheckSome: function() {
    return console.log("check some");
  }
});

$(document).ready(function() {
  return $('#save-data').click(function() {
    var data;
    data = $products.bootstrapTable('getData');
    return $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      url: './data',
      success: function(data) {
        return console.log(data);
      }
    });
  });
});
