
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

categories = ['Maschine content', 'Komplete', 'Komplete', 'Komplete', 'Traktor SW', 'Traktor SW']

unitOptions=
  min: 1
  max: 20
  precision: 0.5

skewptions=
  min: -2
  max: 2
  precision: 0.2

getProduct = (id, idx)->
  price = (idx+1) * 100
  #product: faker.commerce.product()
  id: "#{idx+1}#{price}"
  product: id
  price: price
  units: faker.random.number unitOptions
  skew: faker.random.number skewptions
  #array: [parseFloat(faker.commerce.price()), parseFloat(faker.commerce.price())]

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

app.get "/files", (request, response) ->

app.post "/files", (request, response) ->
  save request.body
  response.send message: "ok"
  #console.log JSON.stringify request.body

app.get "/data", (request, response) ->
  response.json (getProduct(i,k) for i,k in categories)
  response.end()

app.get "/daily", (request, response) ->
  response.json (getBooking(i) for i in [1..100])
  response.end()

app.get "/", (request, response) ->
  response
    .sendFile "#{__dirname}/index.html"

http.listen 8080, ->
  console.log "listening"
