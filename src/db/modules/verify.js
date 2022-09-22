import Mongo from '../db.class.js'
import { opendoorlogger, errorlogger } from '../../../log/log.js'
// data:{Uid0:Dec,Uid1:Dec,Uid2:Dec,Uid3:Dec}
export default async (data) => {
  const mongo = new Mongo()
  try {
    await mongo.start()
    const db = await mongo.use('User')
    const result = await db.find({ uid: data }).toArray()
    if (result.length > 0) {
      opendoorlogger.info(result[0].name)
      return true
    } else { return false }
  } catch (error) {
    errorlogger.info(error)
    return false
  } finally {
    mongo.end()
  }
}
