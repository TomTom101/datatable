
_ = require "lodash"
express = require 'express'
app = express()
faker = require 'faker'
app.use '/js', express.static('js')
app.use '/fonts', express.static('fonts')
app.use '/css', express.static('css')
app.use '/node_modules',express.static('node_modules')
http = require('http').Server(app)


data = []
for i in [1..100]
  data.push
    recid: i
    product: faker.commerce.product()
    price: faker.commerce.price()

app.get "/data", (request, response) ->
  response.json data: data
  response.end()

app.get "/", (request, response) ->
  response
    .sendFile "#{__dirname}/index.html"

http.listen 8080, ->
  console.log "listening"
