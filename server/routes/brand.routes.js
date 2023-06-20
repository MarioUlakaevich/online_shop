const Router = require('express')
const brandController = require('../controllers/brandController')
const router = new Router()
const check = require('../middleware/checkMiddleware')

router.post('/', check('ADMIN'), brandController.create)
router.get('/', brandController.getAll)

module.exports = router