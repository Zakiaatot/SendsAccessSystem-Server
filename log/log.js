import winston from 'winston'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const opendoorlogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.printf((info) => {
      return JSON.stringify({
        time: new Date().toLocaleString('zh-CN'),
        msg: info.message
      }, null, 4)
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: join(__dirname, '/opendoor/opendoor.log'),
      maxsize: 1024
    })
  ]
})

const errorlogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.printf((info) => {
      return JSON.stringify({
        time: new Date().toLocaleString('zh-CN'),
        msg: info.message
      }, null, 4)
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: join(__dirname, '/error/error.log'),
      maxsize: 1024
    })
  ]
})

const carduidlogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.printf((info) => {
      return JSON.stringify({
        time: new Date().toLocaleString('zh-CN'),
        msg: info.message
      }, null, 4)
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: join(__dirname, '/carduid/carduid.log'),
      maxsize: 1024
    })
  ]
})
export {
  opendoorlogger,
  errorlogger,
  carduidlogger
}
