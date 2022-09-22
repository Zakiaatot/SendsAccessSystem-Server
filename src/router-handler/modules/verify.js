import db from '../../db/db.js'
import { carduidlogger } from '../../../log/log.js'
export default async (req, res) => {
  carduidlogger.info(req.body)
  if (await db.verify(req.body)) { return res.success() }
  return res.error()
}
