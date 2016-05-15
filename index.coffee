
express = require 'express'
app = express()
faker = require 'faker'
bodyParser = require 'body-parser'
jsonfile = require 'jsonfile'
app.use '/js', express.static('js')
app.use '/fonts', express.static('fonts')
app.use '/css', express.static('css')
app.use '/node_modules',express.static('node_modules')
app.use '/bower_components',express.static('bower_components')
app.use bodyParser.json extended: true
http = require('http').Server(app)

data = []

categories = ['Maschine content', 'Komplete', 'Traktor SW']

getProduct = (id)->
  numOptions=
    min: 0
    max: 10
    precision: 0.5
  #product: faker.commerce.product()
  id: id
  product: categories[Math.floor(Math.random()*categories.length)];
  price: faker.commerce.price()
  units: faker.random.number numOptions

getBooking = ->
  date: faker.date.recent(30)
  product: faker.commerce.product()
  price: faker.commerce.price()

save = (data) ->
  date = new Date
  d = date.getUTCDate()
  m = date.getUTCMonth() + 1
  y = date.getUTCFullYear()
  h = date.getUTCHours()
  file = "#{__dirname}/files/#{d}#{m}#{y}-#{h}"
  jsonfile.writeFile file, data, (err) ->
    console.log err

app.post "/data", (request, response) ->
  save request.body
  response.send message: "ok"
  #console.log JSON.stringify request.body

app.get "/data", (request, response) ->
  response.json (getProduct(i) for i in [1..20])
  response.end()

app.get "/daily", (request, response) ->
  response.json (getBooking(i) for i in [1..100])
  response.end()

app.get "/", (request, response) ->
  response
    .sendFile "#{__dirname}/index.html"

http.listen 8080, ->
  console.log "listening"
