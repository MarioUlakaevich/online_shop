const express = require('express')
require('dotenv').config()
const sequelize = require('./db_connect')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index.routes')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())

app.use(fileUpload({}))
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(port, () => {
      console.log(`server started on port ${port}`)
    })
  } catch (err) {

  }
}

start()