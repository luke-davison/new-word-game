import express from 'express'
import path from 'path'

import router from './routes'

const port = 3004

const app = express()
app.use(express.json())
app.use('/api', router)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})

app.use(express.static(path.join(__dirname, '../client/build')))