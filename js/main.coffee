data = []
for i in [1..100]
  data.push
    product: faker.commerce.product()
    price: faker.commerce.price()



$(document).ready () ->
  $('#example').DataTable
    data: data,
    columns: [
        (data: "product" )
        (data: "price" )
    ]
