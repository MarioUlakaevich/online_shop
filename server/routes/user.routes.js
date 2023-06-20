const Router = require('express')
const router = new Router()
const useController = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')

router.post('/registration', useController.registration)
router.post('/login', useController.login)
router.get('/auth', auth, useController.check)

module.exports = router