const album = require('../../schemas/album')
const cosplayer = require('../../schemas/cosplayer')

async function addAlbum(name, cosName) {
  let returnData

  const cosID = await cosplayer.findOne({ cpName: cosName }).exec()

  if (cosID != undefined) {
    const check = await album
      .findOne({ albumName: name, cpID: cosID.id })
      .exec()

    if (check == undefined) {
      const albData = new album({
        albumName: name,
        cpID: cosID.id,
      })

      try {
        await albData.save()
        returnData = {
          status: 200,
          message: `${cosName} - ${name} added!`,
        }
      } catch (err) {
        returnData = {
          status: 502,
          message: err,
        }
      }
    } else {
      returnData = {
        status: 502,
        message: `${cosName} - ${name} is already exist..`,
      }
    }
  } else {
    returnData = {
      status: 502,
      message: `${cosName} is not exist..`,
    }
  }

  return returnData
}

module.exports = addAlbum
