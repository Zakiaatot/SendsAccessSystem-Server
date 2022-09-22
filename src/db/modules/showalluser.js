import Mongo from '../db.class.js'
import { errorlogger } from '../../../log/log.js'

export default async () => {
  const mongo = new Mongo()
  try {
    await mongo.start()
    const db = await mongo.use('User')
    const result = await db.find().toArray()
    return {
      code: 1,
      msg: result
    }
  } catch (error) {
    errorlogger.info(error)
    return {
      code: 0,
      msg: '发生错误，请看日志'
    }
  } finally {
    mongo.end()
  }
}
