const Layout = require('./_Layout')

const backendDashBoard = require('./dashboard')

function authPage() {
  const head = `<title>Backend | ${process.env.web_title}</title>

<style>
  .form-container {
    width: 80%;
    margin: 0 auto;
    margin-top: 3rem;
  }  
</style>`

  const body = `<div class="form-container">
  <form action="/api/login" method="post">
    <input type="text" name="user" id="user" placeholder="Username" />
    <input type="password" name="pass" id="pass" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</div>
`

  return Layout(head, body, 'backend')
}

async function backendIndex(app) {
  app.get('/backend', (req, res) => {
    if (req.session.loggedIn == undefined) {
      res.send(authPage())
    } else {
      res.redirect('/backend/dashboard')
    }
  })

  app.post('/api/login', (req, res) => {
    if (
      req.body.user == process.env.backend_user &&
      req.body.pass == process.env.backend_pass
    ) {
      req.session.loggedIn = true
      res.locals.username = req.body.user
      req.session.username = res.locals.username

      res.redirect('/backend/dashboard')
    } else {
      res.redirect('/')
    }
  })

  app.get('/api/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/backend')
  })

  await backendDashBoard(app)
}

module.exports = { backendIndex }
