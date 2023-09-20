const Layout = require('../_Layout')
const album = require('../../../modules/mongo/schemas/album')
const cosplayer = require('../../../modules/mongo/schemas/cosplayer')

async function listingFunction() {
  const data = await album.find()
  let temp

  for (cper of data) {
    const template = `<tr>
  <td>
   <a href="/albums/${cper._id}">
    ${(await cosplayer.findOne({ _id: cper.cpID })).cpName} - ${cper.albumName}
   </a> 
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
  }

  return temp
}

async function listingQuery(queryID) {
  const data = await album.find({ cpID: queryID }).exec()
  let temp

  for (cper of data) {
    const template = `<tr>
  <td>
   <a href="/albums/${cper._id}">
    ${(await cosplayer.findOne({ _id: cper.cpID })).cpName} - ${cper.albumName}
   </a> 
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
  }

  return temp
}

async function addingFunction(name, cosName) {
  let rtnData

  if ((await cosplayer.findOne({ _id: cosName })) != undefined) {
    if ((await album.findOne({ name: name, cpID: cosName })) == undefined) {
      const albData = new album({
        albumName: name,
        cpID: cosName,
      })

      try {
        await albData.save()
        rtnData = {
          status: 200,
          message: `${name} is created sucessful`,
        }
      } catch (err) {
        rtnData = {
          status: 502,
          message: err,
        }
      }
    } else {
      rtnData = {
        status: 500,
        message: `${name} is already exist`,
      }
    }
  } else {
    rtnData = {
      status: 404,
      message: `Your input cosplayer is not found`,
    }
  }

  return rtnData
}

async function listingPage(query) {
  const cosplayerData = await cosplayer.find().exec()

  let cosOption

  cosplayerData.forEach((cp) => {
    const template = `<option value="${cp._id}">${cp.cpName}</option>`

    if (cosOption == undefined) {
      cosOption = template
    } else {
      cosOption += template
    }
  })

  const head = `<title>Backend | ${process.env.web_title}</title>

  <style>
    .form-container {
      width: 80%;
      margin: 0 auto;
      margin-top: 3rem;
    }

    .filtering {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      margin-top: 2rem;
    }

    .filtering select {
      flex-grow: 1;
    }

    .filtering button {
      flex-grow: 0;
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
  <a href="/backend/album/add">
    <button>
      + Add Album
    </button>
  </a>
  
  <form action="/backend/album" method="get" class="filtering">
    <select name="cosplayer" id="cosplayer">
      <option value="" selected disabled>--Select Cosplayer--</option>
      ${cosOption}
    </select>
    <button type="submit">
      Filtered
    </button>
  </form>

  <!-- Table for listing Album -->
  <table>
    <tr>
      <th>
        Album Name
      </th>
      <th>
        Date Created
      </th>
    </tr>
    ${
      query != undefined && query != ''
        ? await listingQuery(query)
        : await listingFunction()
    }
  </table>
</div>`

  return Layout(head, body, 'backend')
}

async function addingPage(status) {
  const cosplayerData = await cosplayer.find().exec()

  let cosOption

  cosplayerData.forEach((cp) => {
    const template = `<option value="${cp._id}">${cp.cpName}</option>`

    if (cosOption == undefined) {
      cosOption = template
    } else {
      cosOption += template
    }
  })

  const head = `<title>Backend | ${process.env.web_title}</title>

  <style>
    .form-container {
      width: 80%;
      margin: 0 auto;
      margin-top: 3rem;
    }  
  </style>`

  const body = `<div class="form-container">
  <form action="/api/album/add" method="post">
    <a href="/backend/album"> < back to album home </a>
    <br />
    <br />
    <input
      type="text"
      name="albName"
      id="name"
      placeholder="Album Name"
      required
    />
    <select name="cosName" id="cosName" required>
      <option value="" selected disabled>--Select cosplayer--</option> 
      ${cosOption}
    </select>
    <button type="submit">Add</button>

    ${status != undefined ? status : ''} 
</div>`

  return Layout(head, body, true)
}

async function albumFunction(app) {
  app.get('/backend/album', async (req, res) => {
    if (req.session.loggedIn) {
      if (req.query.cosplayer != undefined) {
        res.send(await listingPage(req.query.cosplayer))
      } else {
        res.send(await listingPage())
      }
    } else {
      res.redirect('/backend')
    }
  })

  app.get('/backend/album/add', async (req, res) => {
    if (req.session.loggedIn) {
      res.send(await addingPage(req.query.status))
    } else {
      res.redirect('/backend')
    }
  })

  app.post('/api/album/add', async (req, res) => {
    if (req.session.loggedIn) {
      if (
        req.body.albName != '' &&
        req.body.albName != undefined &&
        req.body.cosName != '' &&
        req.body.cosName != undefined
      ) {
        const saveData = await addingFunction(
          req.body.albName,
          req.body.cosName
        )

        if (saveData.status == 200) {
          res.redirect('/backend/album/add?status=success')
        } else {
          res.redirect(
            `/backend/album/add?status=error%0D%0A${saveData.message}`
          )
        }
      }
    } else {
      res.redirect('/backend')
    }
  })
}

module.exports = albumFunction
