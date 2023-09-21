const Layout = require('./_Layout')

async function aboutPage() {
  const head = ``

  const body = ``

  return Layout(head, body, 'about')
}

async function aboutFunction(app) {
  app.get('/about', async (req, res) => {
    res.send(await aboutPage())
  })
}

module.exports = aboutFunction
