export default async (req, res) => {
  if (req.session.type !== 'Admin' || !req.session.isLogin) { return res.error('您尚未登录') }
  if (!global.client[req.body.clientname]) return res.error('无此客户端')
  if (!global.client[req.body.clientname].connection) return res.error('客户端离线')
  if (global.client[req.body.clientname].opendoor.control) return res.error('操作繁忙，请稍后再试')

  global.client[req.body.clientname].opendoor.control = true

  const waitchange = () => {
    return new Promise(resolve => {
      let count = 0
      setInterval(() => {
        if (global.client[req.body.clientname].opendoor.change || count >= 9) {
          return resolve()
        }
        count++
      }, 500)
    })
  }
  await waitchange()
  if (global.client[req.body.clientname].opendoor.change) {
    global.client[req.body.clientname].opendoor.change = false
    return res.success({ status: global.client[req.body.clientname].opendoor.status })
  }

  return res.error('操作超时，请稍后重试')
}
