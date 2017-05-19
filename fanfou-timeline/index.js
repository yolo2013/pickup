const fs = require('fs')
const superagent = require('superagent')
const moment = require('moment')

const config = require('./config')

const USER_ID = config.userId
const TARGET = config.target
const COOKIE = config.cookie

function getPageData(page) {
  return new Promise(resolve => {
    superagent
      .get('http://api.fanfou.com/statuses/user_timeline.json')
      .set('Host', 'api.fanfou.com')
      .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
      .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36')
      .set('Accept-Encoding', 'gzip, deflate, sdch')
      .set('cookie', COOKIE)
      .query({
        id: USER_ID,
        page: page
      })
      .end(function(err, res) {
        resolve(res)
      })
  })
}


async function start() {
  let page = 1
  let result = await getPageData(page)
  let fileContent = fs.readFileSync(TARGET, 'utf-8')

  fileContent += `** ${result.body[0].user.name}，${result.body[0].user.location}，${result.body[0].user.description}\n`
  while(result.body.length) {

    result.body.forEach(data => {
      fileContent += `${moment(new Date(data.created_at)).format('YYYY-MM-DD hh:mm:ss')}：${data.text}`
      if(data.photo) {
        fileContent += `![图片](${data.photo.largeurl})`
      }

      fileContent += '\n'
    })

    page++
    result = await getPageData(page)
  }

  fs.writeFileSync(TARGET, fileContent)
}

start()


