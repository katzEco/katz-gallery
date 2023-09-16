const Layout = require('./_Layout')

async function IndexComponents() {
  let head = `<title>Index | ${process.env.web_title}</title>`
  let body = `<div class="mainContainer">
  
</div>`

  return Layout(head, body, 'index')
}

async function IndexPage(app) {
  app.get('/', async (req, res) => {
    res.send(await IndexComponents())
  })
}

module.exports = IndexPage
