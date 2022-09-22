export default (data, req, ws) => {
  const msg = JSON.parse(data)
  if (msg.operate === 'opendoor') {
    if (msg.code === 0) {
      global.client[req.Uid].opendoor.status = 'busy'
    } else {
      global.client[req.Uid].opendoor.status = 'open'
    }
    global.client[req.Uid].opendoor.change = true
  }
}
