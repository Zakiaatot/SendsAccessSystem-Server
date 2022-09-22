export default async (req, res) => {
  if (req.session.type !== 'Admin' || !req.session.isLogin) { return res.error('您尚未登录') }
  return res.success(global.client)
}
