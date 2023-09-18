const Layout = require('../_Layout')
const cosplayer = require('../../../modules/mongo/schemas/cosplayer')

async function cpListing() {
  const data = await cosplayer.find()
  let temp

  data.forEach((cper) => {
    const template = `<tr>
  <td>
    ${cper.cpName}
  </td>
  <td>
    ${cper.date}
  </td>
</tr>`

    if (temp == undefined) {
      temp = template
    } else {
      temp += template
    }
  })

  return temp
}

async function cpAdd(cosName) {
  let rtnData
  const cpData = new cosplayer({
    cpName: cosName,
  })

  try {
    await cpData.save()
    rtnData = {
      status: 200,
      message: 'Added Successful',
    }
  } catch (err) {
    rtnData = {
      status: 502,
      message: err,
    }
  }

  return rtnData
}

async function listingPage() {
  const head = `<title>Backend | ${process.env.web_title}</title>

  <style>
    .form-container {
      width: 80%;
      margin: 0 auto;
      margin-top: 3rem;
    }

    table {
      width: 80%;
      margin: 0 auto;
    }

    table th {
      text-align: center;
      border: 2px solid #2e2f2f;
    }

    table th:nth-child(1) {
      width: 40%;
    }
    
    table th:nth-child(2) {
      width: 60%;
    }
  </style>`

  const body = `<div class="form-container">
  <div class="button-controller">
    <a href="/backend/cosplayer/add">
      <button>
        + Add Cosplayer
      </button>
    </a>
  </div>

  <!-- Table of cosplayer data -->
  <table>
    <tr>
      <th>
        Name
      </th>
      <th>
        Date Added
      </th>
    </tr>
    ${await cpListing()}
  </table>
</div>`

  return Layout(head, body, true)
}

async function addPage(status) {
  const head = `<title>Backend | ${process.env.web_title}</title>

  <style>
    .form-container {
      width: 80%;
      margin: 0 auto;
      margin-top: 3rem;
    }  
  </style>`
  const body = `<div class="form-container">
  <form action="/api/cosplayer/add" method="post">
    <a href="/backend/cosplayer"> < back to cosplayer home </a>
    <br />
    <br />
    <input
      type="text"
      name="cosName"
      id="cosName"
      placeholder="Cosplayer Name"
      required
    />
    <button type="submit">Add</button>

    ${status != undefined ? status : ''}
  </form>
</div>
`

  return Layout(head, body, true)
}

async function cpFunction(app) {
  app.get('/backend/cosplayer', async (req, res) => {
    if (req.session.loggedIn) {
      res.send(await listingPage())
    } else {
      res.redirect('/backend')
    }
  })

  app.get('/backend/cosplayer/add', async (req, res) => {
    if (req.session.loggedIn) {
      res.send(await addPage(req.query.status))
    } else {
      res.redirect('/backend')
    }
  })

  app.post('/api/cosplayer/add', async (req, res) => {
    if (req.session.loggedIn) {
      if (req.body.cosName != undefined && req.body.cosName != '') {
        const saveData = await cpAdd(req.body.cosName)

        console.log(saveData)

        if (saveData.status == 200) {
          res.redirect('/backend/cosplayer/add?status=success')
        } else {
          res.redirect(
            `/backend/cosplayer/add?status=error%0D%0A${saveData.message}`
          )
        }
      }
    } else {
      res.redirect('/backend')
    }
  })
}

module.exports = cpFunction
