import express from 'express'
import path from 'path'
import serveStatic from 'serve-static'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const app = express()

// for bad network connections
// app.use(compression())

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 5173
app.listen(port)
console.log(`app is listening on port: ${port}`)
