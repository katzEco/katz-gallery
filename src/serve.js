const color = require('bash-color')
const DateLine = require('./modules/date')

function Serve(app) {
  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log()
    console.log(
      'Server Started @ ' + `${color.cyan(`http://localhost:${port}`)}`
    )
    console.log(DateLine)
    console.log()
  })
}

module.exports = Serve
