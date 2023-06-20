const Router = require('express')
const typeController = require('../controllers/typeController')
const router = new Router()
const check = require('../middleware/checkMiddleware')

router.post('/', check('ADMIN'), typeController.create)
router.get('/', typeController.getAll)

module.exports = router