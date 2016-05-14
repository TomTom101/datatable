var priceFormatter, sumFormatter;

priceFormatter = function(value) {
  return Math.round(value);
};

sumFormatter = function(data) {
  return _.chain(data).reduce(function(memo, data) {
    return memo + parseFloat(data.price);
  }, 0).value();
};

$(document).ready(function() {
  var $table;
  $table = $('#table');
  $table.bootstrapTable('refreshOptions', {
    search: true,
    showRefresh: true,
    showFooter: true,
    url: './data'
  });
  return $('#get-data').click(function() {
    var data;
    data = $table.bootstrapTable('getData');
    return alert(JSON.stringify(data));
  });
});
