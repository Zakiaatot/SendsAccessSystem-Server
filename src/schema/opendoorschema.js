// opendoor数据验证模板
import { Joi } from 'express-validation'
export default {
  body: Joi.object({
    clientname: Joi.string()
      .required()
  })
}
