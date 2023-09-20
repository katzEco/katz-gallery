async function aboutPage() {}

async function aboutFunction(app) {
  app.get('/about', (req, res) => {
    res.send('about')
  })
}

module.exports = aboutFunction
