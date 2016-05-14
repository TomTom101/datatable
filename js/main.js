var dataSet;

dataSet = [
  {
    name: "bla",
    salary: 102
  }, {
    name: "Goasd",
    salary: 234
  }
];

$(document).ready(function() {
  return $('#example').DataTable({
    data: dataSet,
    columns: [
      {
        data: "name"
      }, {
        data: "salary"
      }
    ]
  });
});
