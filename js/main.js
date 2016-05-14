$(document).ready(function() {
  return $('#example').DataTable({
    ajax: 'data',
    columns: [
      {
        data: "product"
      }, {
        data: "price"
      }
    ]
  });
});
