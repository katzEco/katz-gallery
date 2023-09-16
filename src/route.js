const IndexPage = require('./routes/index')

async function Route(app) {
  await IndexPage(app)
}

module.exports = Route
