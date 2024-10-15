const mysql = require('promise-mysql')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'tube_info'
})
const getTubes = () => async (request, response) => {

    const db = await connection
    const tubeStops =  await db.query('SELECT `name`, `code`, `line` FROM `tube_info` ORDER BY `line`, `name`')
    response.json(tubeStops)
}

getRoute = () => (request, response) => {
    response.send('<h1>journey </h1>')
}

module.exports = {getTubes, getRoute}