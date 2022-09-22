export default async (req, res) => {
  if (req.session.type !== 'Admin' || !req.session.isLogin) { return res.error('您尚未登录') }
  req.session.destroy()
  res.clearCookie('SendsAccessSystemAuth')
  return res.success('登出成功')
}
