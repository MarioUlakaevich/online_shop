const jwt = require("jsonwebtoken")
const ApiError = require("../errors/ApiError")
const { User, Basket } = require("../models/models")
const bcrypt = require("bcrypt")


const generateJWT = (id, email, role) => {
  return jwt.sign(
    {id, email, role}, 
    process.env.SECRET_KEY,
    {expiresIn: '24h'}  
  )
}

class UserController {
  async registration(req, res, next){
    const {email, password, role} = req.body 
    if (!email || !password) return next(APIError.badRequest('Incorrect email or password'))

    const candidate = await User.findOne({where: {email}})
    if(candidate) return next(ApiError.badRequest('User already exist'))

    const hashPass = await bcrypt.hash(password, 5)
    const user = await User.create({email, password: hashPass, role})
    const basket = await Basket.create({userId: user.id})
    const token = generateJWT(user.id, user.email, user.role)

    return res.json({token})
  }

  async login(req, res, next){
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if(!user){
      return next(ApiError.badRequest('User not found'))
    }

    let compare = bcrypt.compareSync(password, user.password)
    if (!compare) return next(ApiError.badRequest('Password incorrect'))

    const token = generateJWT(user.id, user.email, user.role)

    return res.json({token})
  }

  async check(req, res, next){
    const token = generateJWT(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }
}

module.exports = new UserController()