import db from '../../db/db.js'

export default async (req, res) => {
  if (req.session.type !== 'Admin' || !req.session.isLogin) { return res.error('您尚未登录') }
  const result = await db.showalluser()
  if (result.code === 0) {
    return res.error(result.msg)
  } else return res.success(result.msg)
}
