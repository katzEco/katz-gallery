function Middleware(app, exp, root) {
  app.use('/static', exp.static(root + '/static'))
}

module.exports = Middleware
