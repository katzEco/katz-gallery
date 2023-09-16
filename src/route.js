async function Route(app) {
  app.get('/', (req, res) => {
    res.send('server spawned!')
  })
}

module.exports = Route
