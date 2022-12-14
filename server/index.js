import https from 'https'
import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'

const app = new Koa()

app.use(bodyParser())

app.use(cors())

// logger
app.use(async (ctx, next) => {
  try {
    await next()
    console.warn(`${ctx.method} ${ctx.url} -  ${JSON.stringify(ctx.request.body)}`)
  }
  catch (error) {
    console.error(error)
  }
})

// response
app.use(async (ctx) => {
  ctx.body = 'Hello World'
})

// const config = {
//   domain: 'dev.shizhuang-inc.net',
//   https: {
//     port: 3000,
//     options: {
//       key: fs.readFileSync(path.resolve(process.cwd(), '/Users/admin/cert/privkey.pem'), 'utf8').toString(),
//       cert: fs.readFileSync(path.resolve(process.cwd(), '/Users/admin/cert/server.pem'), 'utf8').toString(),
//     },
//   },
// }
// const serverCallback = app.callback()
// try {
//   const httpsServer = https.createServer(config.https.options, serverCallback)
//   httpsServer.listen(config.https.port, (err) => {
//     if (err)
//       console.error('HTTPS server FAIL: ', err, err && err.stack)
//     else console.warn(`HTTPS server OK: https://${config.domain}:${config.https.port}`)
//   })
// }
// catch (ex) {
//   console.error('Failed to start HTTPS server\n', ex, ex && ex.stack)
// }

app.listen(3000)
