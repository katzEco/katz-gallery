const Layout = require('./_Layout')

const album = require('./pages/album')
const cosplayer = require('./pages/cosplayer')
const image = require('./pages/image')

const cosModel = require('../../modules/mongo/schemas/cosplayer')
const albModel = require('../../modules/mongo/schemas/album')
const imgModel = require('../../modules/mongo/schemas/item')

async function dashboard() {
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

  const body = `<div class="hover-container">
  <div class="main-container">
    <a href="/backend/cosplayer">
      <button>
        Cosplayer
      </button>
    </a>
    
    <a href="/backend/album">
      <button>
        Album
      </button>
    </a>
  
    <a href="/backend/image">
      <button>
        Images
      </button>
    </a>
  </div>
  <div class="main-container">
    <div style="width: 100%; text-align: center;">
      <h1>
        <u>Cosplayer Count</u> : ${(await cosModel.find()).length}
      </h1>
    </div> 
    <div style="width: 100%; text-align: center;">
      <h1>
        <u>Album Count</u> : ${(await albModel.find()).length}
      </h1>
    </div>
    <div style="width: 100%; text-align: center;">
      <h1>
        <u>Image Count</u> : ${(await imgModel.find()).length}
      </h1>
    </div>
  </div> 
</div>`

  return Layout(head, body, true)
}

async function backendDashBoard(app) {
  app.get('/backend/dashboard', async (req, res) => {
    if (req.session.loggedIn) {
      res.send(await dashboard())
    } else {
      res.redirect('/backend')
    }
  })

  await album(app)
  await cosplayer(app)
  await image(app)
}

module.exports = backendDashBoard
