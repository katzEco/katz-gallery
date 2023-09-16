const exp = require('express')
require('dotenv').config()

const Serve = require('./src/serve')
const Route = require('./src/route')

require('./src/modules/mongo/connect')

const app = exp()

Route(app)
Serve(app)
