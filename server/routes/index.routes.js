const Router = require('express')
const router = new Router()
const user = require('./user.routes')
const device = require('./device.routes')
const type = require('./type.routes')
const brand = require('./brand.routes')

router.use('/user', user)
router.use('/device', device)
router.use('/type', type)
router.use('/brand', brand)

module.exports = router