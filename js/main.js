var groupedData, priceFormatter, sumFormatter;

priceFormatter = function(value) {
  return Math.round(value);
};

sumFormatter = function(data) {
  var sum;
  sum = _.chain(data).reduce(function(memo, data) {
    return memo + parseFloat(data.price);
  }, 0.0).value();
  return Math.floor(sum / 500) * 500;
};

groupedData = function(data) {
  return console.log(data);
};

$(document).ready(function() {
  var $table;
  $table = $('#table');
  $table.bootstrapTable({
    onLoadSuccess: groupedData
  });
  return $('#get-data').click(function() {
    var data;
    data = $table.bootstrapTable('getData');
    return alert(JSON.stringify(data));
  });
});
