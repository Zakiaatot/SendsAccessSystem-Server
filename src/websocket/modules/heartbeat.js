export default (ws, req) => {
  const Int = setInterval(() => {
    if (!req.clientId) {
      clearInterval(Int)
      ws.terminate()
    } else if (global.client[req.clientId].connection === 0) {
      clearInterval(Int)
      delete (global.client[req.clientId])
      ws.terminate()
    } else {
      ws.send('Ping')
      global.client[req.clientId].connection = 0
    }
  }, 5000)
}
