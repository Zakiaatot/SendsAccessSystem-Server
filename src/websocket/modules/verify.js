export default (info) => {
  let permit = false
  try {
    const url = new URL(info.origin + info.req.url)
    if (url.searchParams.get('token') === global.clienttoken) {
      const Uid = url.searchParams.get('Uid')
      if (global.client[Uid] && global.client[Uid].connection) permit = false
      else {
        info.req.Uid = Uid
        global.client[Uid] = { connection: true, heartbeat: true, opendoor: { control: false, status: null, change: false } }
        permit = true
      }
    }
  } catch (err) {
    permit = false
  }
  return permit
}
