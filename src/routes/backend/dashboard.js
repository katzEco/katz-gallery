const Layout = require('./_Layout')

function dashboard() {
  const head = `<title>Backend | ${process.env.web_title}</title>
<style>
  .main-container {
    width: 70%;
    margin: 0 auto;
    margin-top: 4rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
  }

  .main-container > a{
    display: block;
    width: 100%;
  }

  .main-container > a > button {
    margin: 0 !important;
  }
</style>`

  const body = `<div class="main-container">
  <a href="/backend/album">
    <button>
      Album
    </button>
  </a>

  <a href="/backend/cosplayer">
    <button>
      Cosplayer
    </button>
  </a>

  <a href="/backend/image">
    <button>
      Images
    </button>
  </a>
</div>`

  return Layout(head, body, true)
}

async function backendDashBoard(app) {
  app.get('/backend/dashboard', (req, res) => {
    if (req.session.loggedIn) {
      res.send(dashboard())
    } else {
      res.redirect('/backend')
    }
  })
}

module.exports = backendDashBoard
