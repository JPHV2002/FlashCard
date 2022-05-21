import express from 'express'

import Routes from './routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/backend/', Routes)

export default app