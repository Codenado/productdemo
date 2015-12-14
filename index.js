
var server = require('express')
var wagner = require('wagner-core')

require('./models')(wagner))

var app = express()

app.use('/api/v1', require('./api')(wagner))

server().listen(3000)
