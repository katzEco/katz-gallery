const Layout = require('./_Layout')
const albumSlug = require('./slug')
const aboutFunction = require('./about')

const album = require('../modules/mongo/schemas/album')
const cosplayer = require('../modules/mongo/schemas/cosplayer')

async function IndexComponents() {
  const albData = await album.find().sort({ _id: 'desc' }).exec()
  let dataset

  for (alb of albData) {
    const temp = `<tr>
  <td>
    <a href="/albums/${alb._id}">
      ${(await cosplayer.findOne({ _id: alb.cpID })).cpName} - ${alb.albumName}
    </a>
  </td>
  <td>
    ${alb.date}
  </td>
</tr>`

    if (dataset == undefined) {
      dataset = temp
    } else {
      dataset += temp
    }
  }

  let head = `<title>Index | ${process.env.web_title}</title>

<style>
  table {
    width: 80%;
    margin: 0 auto;
  }

  table th {
    text-align: center;
  }
</style>`

  let body = `<div class="mainContainer">
  <table>
    <tr>
      <th>
        Album Name
      </th>
      <th>
        Date
      </th>
    </tr>
    ${dataset}
  </table>
</div>`

  return Layout(head, body, 'index')
}

async function IndexPage(app) {
  app.get('/', async (req, res) => {
    res.send(await IndexComponents())
  })

  await albumSlug(app)
  await aboutFunction(app)
}

module.exports = IndexPage
