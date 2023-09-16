const exp = require('express')
require('dotenv').config()

const Serve = require('./src/serve')
const Route = require('./src/route')

const app = exp()

Route(app)
Serve(app)
