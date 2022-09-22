import express from 'express'
import RouterHandler from '../router-handler/router-handler.js'

import ev from 'express-validation'
import verifyschema from '../schema/verifyschema.js'
import adminloginschema from '../schema/adminloginschema.js'
import insertuserschema from '../schema/insertuserschema.js'
import deleteuserschema from '../schema/deleteuserschema.js'
import updateuserschema from '../schema/updateuserschema.js'
import opendoorschema from '../schema/opendoorschema.js'

const router = express.Router()

// get
router.get('*', (req, res) => {
  return res.error('Pleas use post')
})

// post
router.post('/verify', ev.validate(verifyschema, {}, {}), RouterHandler.verify)
router.post('/adminlogin', ev.validate(adminloginschema, {}, {}), RouterHandler.adminlogin)
router.post('/adminlogout', RouterHandler.adminlogout)
router.post('/adminchecklog', RouterHandler.adminchecklog)
router.post('/showalluser', RouterHandler.showalluser)
router.post('/checkclient', RouterHandler.checkclient)
router.post('/insertuser', ev.validate(insertuserschema, {}, {}), RouterHandler.insertuser)
router.post('/deleteuser', ev.validate(deleteuserschema, {}, {}), RouterHandler.deleteuser)
router.post('/updateuser', ev.validate(updateuserschema, {}, {}), RouterHandler.updateuser)
router.post('/opendoor', ev.validate(opendoorschema, {}, {}), RouterHandler.opendoor)
router.post('*', (req, res) => {
  return res.error('Not Found')
})

export default router
