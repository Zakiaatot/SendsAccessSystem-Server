import db from '../../db/db.js'

export default async (req, res) => {
  if (req.session.type !== 'Admin' || !req.session.isLogin) { return res.error('您尚未登录') }
  const data = { new: req.body.new, old: req.body.old }
  const result = await db.updateuser(data)
  if (result.code === 0) {
    return res.error(result.msg)
  } else return res.success(result.msg)
}
