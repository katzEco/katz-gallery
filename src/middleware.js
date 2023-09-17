const bodyParser = require('body-parser')
const sessions = require('express-session')
const cookieParser = require('cookie-parser')

function Middleware(app, exp, root) {
  app.use('/static', exp.static(root + '/static'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(cookieParser())
  app.use(
    sessions({
      secret: process.env.secret,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
      resave: false,
    })
  )
}

module.exports = Middleware
