const express = require('express')
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const {getTubes, getRoute} = require('./functions.js')
const {response} = require("express");
const mysql = require("promise-mysql");

app.get('/', getTubes())

app.get('/route', getRoute())

app.listen(3000)