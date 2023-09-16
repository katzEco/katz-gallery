const mongoose = require('mongoose')
const color = require('bash-color')

const DateLine = require('../date')

const env = process.env

const URI = `mongodb://${env.mongo_user}:${env.mongo_pass}@${env.mongo_ip}/${env.mongo_db}?authSource=${env.mongo_authSource}`

mongoose.connect(URI)

let db = mongoose.connection

db.on('error', (error) => {
  console.log(error)
})

db.once('connected', () => {
  console.log(
    color.cyan('⎹') + ` ${color.green('mongoDB')}` + ' connected ⎯  ' + DateLine
  )
})
