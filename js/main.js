var data, i, j;

data = [];

for (i = j = 1; j <= 100; i = ++j) {
  data.push({
    product: faker.commerce.product(),
    price: faker.commerce.price()
  });
}

$(document).ready(function() {
  return $('#example').DataTable({
    data: data,
    columns: [
      {
        data: "product"
      }, {
        data: "price"
      }
    ]
  });
});
