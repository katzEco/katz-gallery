let mongoose = require('mongoose')

const imageItems = new mongoose.Schema({
  url: {
    type: String,
    unique: true,
    require: true,
  },
  albumID: {
    type: String,
    require: true,
  },
  fileType: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
})

module.exports = mongoose.model('image', imageItems)
