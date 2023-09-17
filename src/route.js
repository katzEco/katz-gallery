const IndexPage = require('./routes/index')

const be = require('./routes/backend/index')

async function Route(app) {
  await IndexPage(app)

  await be.backendIndex(app)
}

module.exports = Route
