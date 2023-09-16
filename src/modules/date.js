const color = require('bash-color')

function Month(no) {
  const months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ]

  return months[no]
}

const date = new Date()
const DateLine = `${color.yellow(
  `${Month(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
)} | ${date.getHours()}:${date.getMinutes()}`

module.exports = DateLine
