import { WebSocketServer } from 'ws'
import verify from './modules/verify.js'
import message from './modules/message.js'
export default (server) => {
  const wss = new WebSocketServer({ server, path: '/SendsAccessClient', verifyClient: verify })

  wss.on('connection', function (ws, req) {
    console.log(req.Uid, ' connect')
    ws.on('message', (data) => {
      message(data, req, ws)
    })
    ws.on('pong', () => {
      global.client[req.Uid].heartbeat = true
    })

    const detectconnection = setInterval(() => {
      if (global.client[req.Uid].heartbeat) {
        ws.ping()
        global.client[req.Uid].heartbeat = false
      } else {
        global.client[req.Uid].connection = false
        ws.terminate()
        console.log(req.Uid, ' disconnect')
        clearInterval(detectconnection)
        clearInterval(operate)
      }
    }, 5000)

    const operate = setInterval(() => {
      if (global.client[req.Uid].opendoor.control) {
        ws.send(JSON.stringify({ operate: 'opendoor' }))
        global.client[req.Uid].opendoor.control = false
      }
    }, 300)
  })
}
