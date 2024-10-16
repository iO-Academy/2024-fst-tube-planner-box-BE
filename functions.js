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

const getRoute = () => async (request, response) => {
    const from = request.query.from
    const to = request.query.to
    const db = await connection

    const route = await db.query(
        'SELECT `name`, `code`, `line` FROM `tube_info` WHERE `name` = ? OR `name` = ?',
        [from, to]
    )

    response.json({
        from: from,
        to: to
    })
}

module.exports = {getTubes, getRoute}