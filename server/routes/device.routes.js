const Router = require('express')
const deviceController = require('../controllers/deviceController')
const router = new Router()
const check = require('../middleware/checkMiddleware')

router.post('/', check('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router