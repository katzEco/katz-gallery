const exp = require('express')
require('dotenv').config()

const Serve = require('./src/serve')
const Route = require('./src/route')
const Middleware = require('./src/middleware')

require('./src/modules/mongo/connect')

const app = exp()

Middleware(app, exp, __dirname)
Route(app)
Serve(app)
