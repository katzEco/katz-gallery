let mongoose = require('mongoose')

const cosplayer = new mongoose.Schema({
  cpName: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
})

module.exports = mongoose.model('cosplayer', cosplayer)
