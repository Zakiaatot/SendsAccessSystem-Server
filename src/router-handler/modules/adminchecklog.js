export default async (req, res) => {
  if (req.session.type === 'Admin' && req.session.isLogin) { return res.success('您已经登录') }
  return res.error('您还未登录')
}
