import express from 'express'
import Routes from './routes'

const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/backend/', Routes)

export default app