const NavBar = require('../modules/components/NavBar')
const Footer = require('../modules/components/Footer')

function Layout(head, body, page) {
  const rtnComponents = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="shortcut icon" href="/static/favicon.png" type="image/png">
  <link rel="stylesheet" href="/static/css/main.css">

  ${head}
</head>
<body data-theme="dark">
  ${NavBar(page)}
  <div id="main">
    ${body}
  </div>
  ${Footer}
  
  <script src="https://kit.fontawesome.com/5ce8c23949.js" crossorigin="anonymous"></script>
</body>
</html>`

  return rtnComponents
}

module.exports = Layout
