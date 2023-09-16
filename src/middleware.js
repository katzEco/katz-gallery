function Middleware(app, exp, root) {
  app.use('/static', exp.static(root + '/statics'))
}

module.exports = Middleware
