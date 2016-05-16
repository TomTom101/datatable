var app, bodyParser, categories, data, express, faker, getBooking, getProduct, http, jsonfile, save, unitOptions;

express = require('express');

app = express();

faker = require('faker');

bodyParser = require('body-parser');

jsonfile = require('jsonfile');

app.use('/js', express["static"]('js'));

app.use('/fonts', express["static"]('fonts'));

app.use('/css', express["static"]('css'));

app.use('/node_modules', express["static"]('node_modules'));

app.use('/bower_components', express["static"]('bower_components'));

app.use(bodyParser.json({
  extended: true
}));

http = require('http').Server(app);

data = [];

categories = ['Maschine content', 'Komplete', 'Komplete', 'Komplete', 'Traktor SW', 'Traktor SW'];

unitOptions = {
  min: 1,
  max: 20,
  precision: 0.5
};

getProduct = function(id, idx) {
  var price;
  price = (idx + 1) * 100;
  return {
    id: "" + (idx + 1) + price,
    product: id,
    price: price,
    units: faker.random.number(unitOptions)
  };
};

getBooking = function() {
  return {
    date: faker.date.recent(30),
    product: faker.commerce.product(),
    price: faker.commerce.price()
  };
};

save = function(data) {
  var d, date, file, h, m, y;
  date = new Date;
  d = date.getUTCDate();
  m = date.getUTCMonth() + 1;
  y = date.getUTCFullYear();
  h = date.getUTCHours();
  file = __dirname + "/files/" + d + m + y + "-" + h;
  return jsonfile.writeFile(file, data, function(err) {
    return console.log(err);
  });
};

app.get("/files", function(request, response) {});

app.post("/files", function(request, response) {
  save(request.body);
  return response.send({
    message: "ok"
  });
});

app.get("/data", function(request, response) {
  var i, k;
  response.json((function() {
    var j, len, results;
    results = [];
    for (k = j = 0, len = categories.length; j < len; k = ++j) {
      i = categories[k];
      results.push(getProduct(i, k));
    }
    return results;
  })());
  return response.end();
});

app.get("/daily", function(request, response) {
  var i;
  response.json((function() {
    var j, results;
    results = [];
    for (i = j = 1; j <= 100; i = ++j) {
      results.push(getBooking(i));
    }
    return results;
  })());
  return response.end();
});

app.get("/", function(request, response) {
  return response.sendFile(__dirname + "/index.html");
});

http.listen(8080, function() {
  return console.log("listening");
});
