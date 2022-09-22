import Mongo from '../db.class.js'
import { errorlogger } from '../../../log/log.js'

// data:{name:xxx}
export default async (data) => {
  const mongo = new Mongo()
  try {
    await mongo.start()
    const db = await mongo.use('User')
    const result = await db.deleteOne(data)
    if (result.deletedCount === 0) {
      return {
        code: 0,
        msg: '无此用户'
      }
    }
    return {
      code: 1,
      msg: '删除用户:' + data.name + ' 成功'
    }
  } catch (error) {
    errorlogger.info(error)
    return {
      code: 0,
      msg: '服务器错误，请看日志'
    }
  } finally {
    mongo.end()
  }
}
