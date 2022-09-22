// insertuser数据验证模板
import { Joi } from 'express-validation'
export default {
  body: Joi.object({
    name: Joi.string()
      .required(),
    uid: Joi.object({
      Uid0:
        Joi.number()
          .required(),
      Uid1:
        Joi.number()
          .required(),
      Uid2:
        Joi.number()
          .required(),
      Uid3:
        Joi.number()
          .required()
    }).required()

  })
}
