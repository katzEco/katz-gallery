function Button(text, link) {
  let button = `<a href="${link}" class="button">
  ${text}
</a>`

  return button
}

function NavBar(authStatus) {
  const rtn = `<div class="navBar">
  <div class="left">
    ${Button('backend Home', '/backend')}
  </div>
  <div class="right">
    ${Button('Return Home', '/')}
    ${authStatus == true ? Button('Logout', '/api/logout') : ''}
    <a href="#" class="button" id="theme">
      ☀️
    </a>
  </div>
</div>`

  return rtn
}

module.exports = NavBar
