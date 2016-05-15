var app, bodyParser, categories, data, express, faker, getBooking, getProduct, http, jsonfile, save;

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

categories = ['Maschine content', 'Komplete', 'Traktor SW'];

getProduct = function(id) {
  var numOptions;
  numOptions = {
    min: 0,
    max: 10,
    precision: 0.5
  };
  return {
    id: id,
    product: categories[Math.floor(Math.random() * categories.length)],
    price: faker.commerce.price(),
    units: faker.random.number(numOptions)
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

app.post("/data", function(request, response) {
  save(request.body);
  return response.send({
    message: "ok"
  });
});

app.get("/data", function(request, response) {
  var i;
  response.json((function() {
    var j, results;
    results = [];
    for (i = j = 1; j <= 20; i = ++j) {
      results.push(getProduct(i));
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
