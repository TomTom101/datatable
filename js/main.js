var priceFormatter;

priceFormatter = function(value) {
  return Math.round(value);
};

$(document).ready(function() {
  var $table;
  $table = $('#table');
  $table.bootstrapTable('refreshOptions', {
    search: true,
    showRefresh: true,
    url: './data'
  });
  return $('#get-data').click(function() {
    return alert(JSON.stringify($table.bootstrapTable('getData')));
  });
});
