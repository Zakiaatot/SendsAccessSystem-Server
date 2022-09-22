import Mongo from '../db.class.js'
import { errorlogger } from '../../../log/log.js'

// data:{name:"xxx",uid:{Uid0:Dec,......}}
export default async (data) => {
  const mongo = new Mongo()
  try {
    await mongo.start()
    const db = await mongo.use('User')
    const result1 = await db.find({ name: data.name }).toArray()
    const result2 = await db.find({ uid: data.uid }).toArray()
    if (result1.length > 0 || result2.length > 0) {
      return {
        code: 0,
        msg: '用户名或卡号已存在'
      }
    }
    const result = await db.insertOne(data)
    if (result.acknowledged) {
      return {
        code: 1,
        msg: '插入用户:' + data.name + ' 成功'
      }
    } else {
      return {
        code: 0,
        msg: '插入用户:' + data.name + ' 失败'
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
