export default async (req, res) => {
  if (req.session.type === 'Admin' && req.session.isLogin) { return res.error('您已经登录') }
  if (req.body.name !== global.adminname || req.body.password !== global.adminpassword) return res.error('账号或密码错误')
  req.session.type = 'Admin'
  req.session.isLogin = true
  if (req.body.isRemeber) {
    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 60
  }
  return res.success('登录成功')
}
