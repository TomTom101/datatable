var _, app, data, express, faker, http, i, j;

_ = require("lodash");

express = require('express');

app = express();

faker = require('faker');

app.use('/js', express["static"]('js'));

app.use('/fonts', express["static"]('fonts'));

app.use('/css', express["static"]('css'));

app.use('/node_modules', express["static"]('node_modules'));

app.use('/bower_components', express["static"]('bower_components'));

http = require('http').Server(app);

data = [];

for (i = j = 1; j <= 100; i = ++j) {
  data.push({
    recid: i,
    product: faker.commerce.product(),
    price: faker.commerce.price()
  });
}

app.get("/data", function(request, response) {
  response.json({
    records: data
  });
  return response.end();
});

app.get("/", function(request, response) {
  return response.sendFile(__dirname + "/index.html");
});

http.listen(8080, function() {
  return console.log("listening");
});
