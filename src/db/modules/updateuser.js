import Mongo from '../db.class.js'
import { errorlogger } from '../../../log/log.js'

// data:{new:{name:"xxx",uid:{Uid0:Dec,......}},old:{name:"xxx"}}
export default async (data) => {
  const mongo = new Mongo()
  try {
    await mongo.start()
    const db = await mongo.use('User')
    const result = await db.updateOne(data.old, { $set: data.new })
    if (!result.matchedCount) {
      return {
        code: 0,
        msg: '无此用户'
      }
    }
    if (result.modifiedCount) {
      return {
        code: 1,
        msg: '更新用户数据成功'
      }
    } else {
      return {
        code: 0,
        msg: '更新用户数据失败'
      }
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
