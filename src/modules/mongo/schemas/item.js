let mongoose = require('mongoose')

const imageItems = new mongoose.Schema({
  url: {
    type: String,
    require: true,
  },
  albumID: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
})

module.exports = mongoose.model('album', imageItems)
