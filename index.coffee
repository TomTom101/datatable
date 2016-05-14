
_ = require "lodash"
express = require 'express'
app = express()
faker = require 'faker'
app.use '/js', express.static('js')
app.use '/fonts', express.static('fonts')
app.use '/css', express.static('css')
app.use '/node_modules',express.static('node_modules')
app.use '/bower_components',express.static('bower_components')
http = require('http').Server(app)

data = []

getProduct = ->
  product: faker.commerce.product()
  price: faker.commerce.price()

getBooking = ->
  date: faker.date.recent(30)
  product: faker.commerce.product()
  price: faker.commerce.price()


app.get "/data", (request, response) ->
  response.json (getProduct() for i in [1..100])
  response.end()

app.get "/daily", (request, response) ->
  response.json (getBooking() for i in [1..100])
  response.end()

app.get "/", (request, response) ->
  response
    .sendFile "#{__dirname}/index.html"

http.listen 8080, ->
  console.log "listening"
