function Button(text, link, activeStatus) {
  let button = `<a href="${link}" class="button ${activeStatus}">
  ${text}
</a>`

  return button
}

function NavBar(page) {
  const rtn = `<div class="navBar">
  <div class="left">
    ${Button('Home', '/', false)}
  </div>
  <div class="right">
    ${
      page != 'about'
        ? Button('About', '/about', false)
        : Button('About', '#', true)
    }
  </div>
</div>`

  return rtn
}

module.exports = NavBar
