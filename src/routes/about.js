const Layout = require('./_Layout')

async function aboutPage() {
  const head = `<title>About | ${process.env.web_title}</title>`

  const body = `<div class="mainContainer" style="text-align: center; justify-content: center; margin-top: 4rem;">
  <h1 style="margin-bottom: 1rem; margin-top: 1rem;">
    <u>
      About
    </u>
  </h1>

  <p class="text-holder">
    This is an image CDN management software based on express.js which is making by <a href="https://suphakit.net" target="_blank">Suphakit P.</a> and this project is open-source if you have something that made you crazy and wanna do some improvement, just feel free to send me a pull request :)
  </p>

  <br>

  <p>
    <a href="https://github.com/katzEco/katz-gallery" target="_blank">
      <i class="fa-brands fa-github fa-xl"></i>
    </a>
  </p>
</div>`

  return Layout(head, body, 'about')
}

async function aboutFunction(app) {
  app.get('/about', async (req, res) => {
    res.send(await aboutPage())
  })
}

module.exports = aboutFunction
