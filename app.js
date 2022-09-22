import { createServer } from 'http'
import express from 'express'
import websocket from './src/websocket/index.js'
import cors from 'cors'
import session from 'express-session'
import router from './src/router/router.js'
import ev from 'express-validation'
import { errorlogger } from './log/log.js'

const app = express()
const server = createServer(app)

// pre middleware
app.use((req, res, next) => {
  res.success = (msg) => {
    res.json({
      code: 1,
      msg
    })
  }
  res.error = (msg) => {
    res.json({
      code: 0,
      msg
    })
  }
  next()
})
const corsoption = {
  origin: 'https://sends.hackerfly.cn',
  credentials: true
}
app.use(cors(corsoption))
app.use(session({
  name: 'SendsAccessSystemAuth',
  secret: 'zakiaatot',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: null,
    secure: false
  }
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// router
app.use('/', router)

// websocket
websocket(server)

// error middleware
app.use(function (err, req, res, next) {
  errorlogger.info(err)
  // 数据验证失败
  if (err instanceof ev.ValidationError) {
    console.log(err.details)
    return res.error('请输入正确的请求参数')
  }
  // 未知错误
  if (err) return res.error(err)
  return res.error('Unkown error at last!')
})

export const ServerStart = (port) => {
  port = port || 9002
  server.listen(port, () => {
    console.log('http://localhost:' + port)
    global.adminname = 'xxx'
    global.adminpassword = 'xxx'
    global.client = {}
    global.clienttoken = 'xxx'
    setInterval(() => {
      console.log(global.client)
    }, 5000)
  })
}
