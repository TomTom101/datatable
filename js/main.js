var priceFormatter;

priceFormatter = function(value) {
  return Math.round(value);
};

$(document).ready(function() {
  var $table;
  $table = $('#table');
  return $('#get-data').click(function() {
    return alert(JSON.stringify($table.bootstrapTable('getData')));
  });
});
