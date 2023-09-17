const NavBar = require('../../modules/components/be_NavBar')
const Footer = require('../../modules/components/Footer')

function Layout(head, body, authStatus) {
  const rtnComponents = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="shortcut icon" href="/static/favicon.png" type="image/png">
  <link rel="stylesheet" href="/static/css/main.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"> 

  ${head}
</head>
<body data-theme="light">
  ${NavBar(authStatus)}
  <div id="main">
    ${body}
  </div>
  ${Footer}

  <script src="https://kit.fontawesome.com/5ce8c23949.js" crossorigin="anonymous"></script>
  <script src="/static/js/theme.js"></script> 
</body>
</html>`

  return rtnComponents
}

module.exports = Layout
