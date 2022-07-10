//write an express node server
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

app.use(cors())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/yo', (req, res) => res.send('Hello Worldings!'))
app.get('/data', (req, res) => {
    console.log('/data hit')
    res.send(  'sample data' )
})

