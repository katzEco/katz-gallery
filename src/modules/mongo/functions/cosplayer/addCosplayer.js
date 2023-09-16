const cosplayer = require('../../schemas/cosplayer')

async function addAlbum(cosName) {
  let returnData

  const check = await cosplayer
    .findOne({ cpName: cosName }, '_id cpName date')
    .exec()

  if (check != undefined) {
    returnData = {
      status: 502,
      message: 'This cosplayer is already exist..',
    }
  } else {
    const cpData = new cosplayer({
      cpName: cosName,
    })

    try {
      await cpData.save()
      returnData = {
        status: 200,
        message: `${cosName} added!`,
      }
    } catch (err) {
      returnData = {
        status: 502,
        message: err,
      }
    }
  }

  return returnData
}

module.exports = addAlbum
