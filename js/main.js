var $categories, $products, arrayFormatter, arraySumFormatter, compare, customizer, dailyFormatter, groupedData, onCheck, priceFormatter, sumFormatter, uids;

$products = $('#products');

$categories = $('#categories');

customizer = function(o1, o2) {
  if (_.isNumber(o1) || _.isNumber(o2)) {
    return [o1, o2];
  }
};

uids = function(d1, d2) {
  return _.chain(_.union(d1, d2, 'id')).map(function(d) {
    return d.id;
  }).uniq().map(function(id) {
    var o1, o2;
    o1 = _.find(d1, {
      id: id
    });
    o2 = _.find(d2, {
      id: id
    });
    return _.mergeWith(o1, o2, customizer);
  }).value();
};

compare = function() {
  var d1;
  d1 = $products.bootstrapTable('getData');
  return $.get('./data', function(d2) {
    var data;
    data = uids(d1, d2);
    return $products.bootstrapTable('load', data);
  });
};

priceFormatter = function(value) {
  return value;
};

arrayFormatter = function(value) {
  return Math.round((value[0] / value[1] - 1) * 100) + '%';
};

dailyFormatter = function(value) {
  return Math.round(value * 10);
};

arraySumFormatter = function(data) {};

sumFormatter = function(data) {
  var sum;
  sum = _.chain(data).reduce((function(_this) {
    return function(memo, data) {
      var i, j, k, len, ref, results;
      if (_.isArray(data[_this.field])) {
        ref = data[_this.field];
        results = [];
        for (k = j = 0, len = ref.length; j < len; k = ++j) {
          i = ref[k];
          results.push(memo[k] += parseFloat(i));
        }
        return results;
      } else {
        return [memo[0] + parseFloat(data[_this.field])];
      }
    };
  })(this), [0.0, 0.0]).value();
  return sum;
};

groupedData = function(field) {
  return function(data, filter) {
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
          sum: parseFloat(set[field]) + memo.sum
        };
      }, {
        sum: 0
      });
    }).value();
    return $categories.bootstrapTable('load', newData);
  };
};

onCheck = function() {
  var allData;
  allData = $products.bootstrapTable('getData');
  return groupedData('units')(allData, function(data) {
    return !data.state;
  });
};

$products.bootstrapTable({
  onLoadSuccess: groupedData('units'),
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
  $('#compare-data').click(function() {
    return compare();
  });
  return $('#save-data').click(function() {
    var data;
    data = $products.bootstrapTable('getData');
    return $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      url: './files',
      success: function(data) {
        return console.log(data);
      }
    });
  });
});
