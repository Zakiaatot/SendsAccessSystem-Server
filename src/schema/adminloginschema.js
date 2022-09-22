// 管理员登录数据验证模板
import { Joi } from 'express-validation'
export default {
  body: Joi.object({
    name:
      Joi.string()
        .required(),
    password:
      Joi.string()
        .regex(/[a-f0-9]{32}/) // 32位md5
        .required(),
    isRemeber:
    Joi.boolean()
      .required()
  })
}
