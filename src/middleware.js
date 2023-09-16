function Middleware(app, exp, root) {
  app.use(exp.static(root + '/statics'))
}

module.exports = Middleware
