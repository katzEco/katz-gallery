const Layout = require('../_Layout')

const cosplayer = require('../../../modules/mongo/schemas/cosplayer')
const album = require('../../../modules/mongo/schemas/album')
const image = require('../../../modules/mongo/schemas/item')

async function listingFunction(name) {
  let quering
  let dataset

  if (name != undefined && name != '') {
    quering = await image
      .find({ albumID: name })
      .sort({ date: 'desc', url: 'desc' })
      .exec()
  } else {
    quering = await image.find().sort({ date: 'desc' }).exec()
  }

  for (queue of quering) {
    const alb = await album.findOne({ _id: queue.albumID }).exec()
    const csp = await cosplayer.findOne({ _id: alb.cpID }).exec()

    const template = `<tr>
  <td>
    <a href="${queue.url}" target="_blank">
      ${queue.url}
    </a> 
  </td>
  <td>
    ${csp.cpName} - ${alb.albumName}
  </td>
  <td>
  ${queue.fileType}
  </td>
  <td>
    ${queue.date}
  </td>
</tr>`

    if (dataset == undefined) {
      dataset = template
    } else {
      dataset += template
    }
  }

  return dataset
}

async function addingFunction(aID, url) {
  let rtnData
  let urlArray = []

  if (url.indexOf(', ') != 0) {
    urlArray = url.split(', ')
  } else {
    urlArray = urlArray.push(url)
  }

  for (let ur = 0; ur < urlArray.length; ur++) {
    const resp = await fetch(urlArray[ur], {
      method: 'HEAD',
    })

    const fType = resp.headers.get('Content-Type')

    const img = new image({
      url: urlArray[ur],
      albumID: aID,
      fileType: fType,
    })

    try {
      await img.save()

      if (ur == urlArray - 1) {
        return {
          status: 200,
          message: 'Image added to database!',
        }
      }
    } catch (err) {
      return {
        status: 502,
        message: err,
      }
    }
  }

  rtnData = {
    status: 200,
    message: 'Images added to database!',
  }

  return rtnData
}

async function listingPage(name) {
  const albList = await album.find().exec()
  let albSet

  for (alb of albList) {
    const template = `<option value="${alb._id}">
  ${(await cosplayer.findOne({ _id: alb.cpID }).exec()).cpName} - ${
      alb.albumName
    }
</option>`

    if (albSet == undefined) {
      albSet = template
    } else {
      albSet += template
    }
  }

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
  }

  table th:nth-child(1), table th:nth-child(2) {
    width: 30%;
  }
</style>
`

  const body = `<div class="form-container">
  <a href="/backend/image/add">
    <button>
      + Add Image(s)
    </button>
  </a>
  
  <form action="/backend/image" method="get" class="filtering">
    <select name="album" id="album">
      <option value="" selected disabled>--Select Album--</option>
      ${albSet}
    </select>
    <button type="submit">
      Filtered
    </button>
  </form>

  <!-- Table for listing Album -->
  <table>
    <tr>
      <th>
        Image URL
      </th>
      <th>
        Album Name
      </th>
      <th>
        File Type
      </th>
      <th>
        Date Created
      </th>
    </tr>
    ${await listingFunction(name)}
  </table>
</div>`

  return Layout(head, body, true)
}

async function addingPage(status) {
  const albData = await album.find().sort({ cpID: 'asc' }).exec()
  let albList

  for (alb of albData) {
    let temp = `<option value="${alb._id}">
    ${(await cosplayer.findOne({ _id: alb.cpID }).exec()).cpName} - ${
      alb.albumName
    }
</option>`

    if (albList == undefined) {
      albList = temp
    } else {
      albList += temp
    }
  }

  const head = `<title>Backend | ${process.env.web_title}</title>

  <style>
    .form-container {
      width: 80%;
      margin: 0 auto;
      margin-top: 3rem;
    }  
  </style>`

  const body = `<div class="form-container">
  <a href="/backend/album"> < back to image home </a>
  <br />
  <br />
  <form action="/api/image/add" method="post">
    <select name="albName" id="albName" required>
      <option value="" selected disabled>--Select Album--</option> 
      ${albList}
    </select>
    <textarea name="imgURL" id="imgURL" cols="30" rows="10" placeHolder="Enter URL of Images (Image split with ',')"></textarea>
    <button type="submit">Add</button>

    ${status != undefined ? status : ''} 
</div>`

  return Layout(head, body, true)
}

async function imgFunction(app) {
  app.get('/backend/image', async (req, res) => {
    if (req.session.loggedIn) {
      res.send(await listingPage(req.query.album))
    } else {
      res.redirect('/backend')
    }
  })

  app.get('/backend/image/add', async (req, res) => {
    if (req.session.loggedIn) {
      res.send(await addingPage(req.query.status))
    } else {
      res.redirect('/backend')
    }
  })

  app.post('/api/image/add', async (req, res) => {
    if (req.session.loggedIn) {
      if (
        req.body.albName != undefined &&
        req.body.albName != '' &&
        req.body.imgURL != undefined &&
        req.body.imgURL != ''
      ) {
        const saveData = await addingFunction(req.body.albName, req.body.imgURL)

        if (saveData.status == 200) {
          res.redirect('/backend/image/add?status=success')
        } else {
          res.redirect(
            `/backend/image/add?status=error%0D%0A${saveData.message}`
          )
        }
      } else {
        res.redirect('/backend/image/add?status=error%0D%0Ano+input+data')
      }
    } else {
      res.redirect('/backend')
    }
  })
}

module.exports = imgFunction
