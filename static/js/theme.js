const themeButton = document.querySelector('#theme')

if (localStorage.getItem('theme') == null) {
  localStorage.setItem('theme', document.body.getAttribute('data-theme'))
} else {
  document.body.setAttribute('data-theme', localStorage.getItem('theme'))
}

const theme =
  localStorage.getItem('theme') || document.body.getAttribute('data-theme')

function Theme() {
  if (document.body.getAttribute('data-theme') == 'dark') {
    document.body.setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light')
  } else {
    document.body.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }
}

themeButton.addEventListener('click', Theme)
