const Layout = require('./_Layout')

const cpModel = require('../modules/mongo/schemas/cosplayer')
const abModel = require('../modules/mongo/schemas/album')
const imgModel = require('../modules/mongo/schemas/item')

async function albumPage(slug, page) {
  const imgList = await imgModel
    .find({ albumID: slug })
    .sort({ _id: 'desc' })
    .exec()
  const album = await abModel.findOne({ _id: slug }).exec()
  const cosPlayer = await cpModel.findOne({ _id: album.cpID }).exec()

  const head = `<title> ${cosPlayer.cpName} ${album.albumName} | ${process.env.web_title}</title>`

  let imgSet
  let pageRule

  console.log(imgList.length)

  if (imgList.length <= 10) {
    for (img of imgList) {
      const inpURL = img.url.replace('https://', '')
      const imageURL = `https://cdn.statically.io/img/${inpURL}`

      const template = `<a class="img" style="background: url(${imageURL});" href="/albums/${slug}/${img._id}"></a>`

      if (imgSet == undefined) {
        imgSet = template
      } else {
        imgSet += template
      }
    }
  } else {
    page = page == undefined ? 1 : page

    let i = page == 1 || page == undefined ? 0 : 10 * (Number(page) - 1)
    let maximize = 10 * (page != undefined || page != 1 ? Number(page) : 1)

    if (Math.ceil(imgList.length / 10) > 1) {
      if (
        (page != undefined ? Number(page) : 1) - 1 <=
        Math.ceil(imgList.length)
      ) {
        let pagination

        for (let j = 0; j < Math.ceil(imgList.length / 10); j++) {
          let temp = `<a href="?page=${j + 1}" class="page">
  ${j + 1}
</a>`
          let activeTemp = `<a href="#" class="active page">
  ${j + 1}
</a>`
          if (page != j + 1) {
            if (pagination == undefined) {
              pagination = temp
            } else {
              pagination += temp
            }
          } else {
            if (pagination == undefined) {
              pagination = activeTemp
            } else {
              pagination += activeTemp
            }
          }
        }

        pageRule = `<div class="pagination">
        ${pagination}
</div>`
      } else {
        let errBody = `<div>
  <h1>
    404
  </h1>
  <p>
    Not found
  </p>
</div>`
        return Layout(head, errBody, 'album')
      }
    } else {
      pageRule = ''
    }

    if (maximize > imgList.length) {
      for (i; i < imgList.length; i++) {
        const inpURL = imgList[i].url.replace('https://', '')
        const imageURL = `https://cdn.statically.io/img/${inpURL}`

        const template = `<a class="img" style="background: url(${imageURL});" href="/albums/${slug}/${imgList[i]._id}"></a>`

        if (imgSet == undefined) {
          imgSet = template
        } else {
          imgSet += template
        }
      }
    } else {
      for (i; i < maximize; i++) {
        const inpURL = imgList[i].url.replace('https://', '')
        const imageURL = `https://cdn.statically.io/img/${inpURL}`

        const template = `<a class="img" style="background: url(${imageURL});" href="/albums/${slug}/${imgList[i]._id}"></a>`

        if (imgSet == undefined) {
          imgSet = template
        } else {
          imgSet += template
        }
      }
    }
  }

  let body = `<div class="mainContainer">
  <h1 style="margin-top: 1rem; margin-bottom: 1rem;">
    ${cosPlayer.cpName} - ${album.albumName}
  </h1>
  
  <div class="gallery">
    ${imgSet}
  </div>

 <div>
  ${Math.ceil(imgList.length / 10) > 1 ? `${pageRule}` : ''}
 </div> 
</div>`

  return Layout(head, body, 'album')
}

async function imagePage(albSlug, imgSlug) {
  const imgList = await imgModel
    .find({ albumID: albSlug })
    .sort({ _id: 'desc' })
    .exec()
  const album = await abModel.findOne({ _id: albSlug }).exec()
  const cosPlayer = await cpModel.findOne({ _id: album.cpID }).exec()

  let imageList = []

  for (iimg of imgList) {
    imageList.push(iimg.url)
  }

  const searchImg = await imgModel.findOne({ _id: imgSlug }).exec()
  let state = ['', '']

  if (imageList.indexOf(searchImg.url) == 0) {
    state[0] = 'hide'
  } else {
    state[0] = ''
  }

  if (imageList.indexOf(searchImg.url) == imageList.length - 1) {
    state[1] = 'hide'
  } else {
    state[1] = ''
  }

  const prevLink =
    state[0] != 'hide'
      ? `/albums/${albSlug}/${
          (
            await imgModel
              .findOne({
                albumID: albSlug,
                url: imageList[imageList.indexOf(searchImg.url) - 1],
              })
              .exec()
          )._id
        }`
      : `#`
  const nextLink =
    state[1] != 'hide'
      ? `/albums/${albSlug}/${
          (
            await imgModel
              .findOne({
                albumID: albSlug,
                url: imageList[imageList.indexOf(searchImg.url) + 1],
              })
              .exec()
          )._id
        }`
      : `#`

  const head = `<title> ${cosPlayer.cpName} ${album.albumName} | ${process.env.web_title}</title>`

  const body = `<div class="control-container">
  <a class="controller ${state[0]}" href="${prevLink}">
    <h1>
      &lt;
    </h1>
  </a>
  <div class="image">
    <img src="${searchImg.url}" alt="${imgSlug}"> 
  </div>
  <a class="controller ${state[1]}" href="${nextLink}">
    <h1>
      &gt;
    </h1>
  </a>
</div>
<script>
  let img = document.querySelector('img')
  
  if (img.naturalHeight < img.naturalWidth) {
    img.classList.add('landscape')
  } else {
    img.classList.add('portrait')
  }
</script>`

  return Layout(head, body, 'image')
}

async function albumSlug(app) {
  app.get('/albums/:album', async (req, res) => {
    res.send(await albumPage(req.params.album, req.query.page))
  })

  app.get('/albums/:album/:pic', async (req, res) => {
    res.send(await imagePage(req.params.album, req.params.pic))
  })
}

module.exports = albumSlug
