const express = require('express')
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.static('public'))
app.use(express.json())

app.use(express.urlencoded({extended: true}))

const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server =
    http.createServer((request, response) => {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/plain')
        response.end('Success!')
    })

app.get('/', (request, response) => {
    response.send('<h1>Hello Express!</h1>')
})

app.get('/journey/:start/:end', (request, response) => {
    response.send('<h1>journey </h1>')
})
server.listen(port, hostname, () => {
    console.log('Server is running on port ' + port)
})

app.listen(3000)