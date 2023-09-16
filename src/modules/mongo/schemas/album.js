let mongoose = require('mongoose')

const albumListing = new mongoose.Schema({
  albumName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
})

module.exports = mongoose.model('album', albumListing)
