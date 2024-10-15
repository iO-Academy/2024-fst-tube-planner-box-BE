const express = require('express')
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const {getTubes, getRoute} = require('./functions.js')

app.get('/', getTubes())

app.get('/journey/:start/:end', getRoute())

app.listen(3000)