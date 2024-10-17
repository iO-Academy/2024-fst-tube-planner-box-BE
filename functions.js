const mysql = require('promise-mysql')
const {set} = require("express/lib/application");
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

    const fromCode = from.slice(-3)
    const toCode = to.slice(-3)
    console.log(fromCode)
    console.log(toCode)
    const db = await connection

    const findingLinesQuery = await db.query("SELECT code, line, COUNT(line) AS `station_count` FROM `tube_info` WHERE `code` = ? OR `code` = ? GROUP BY `line` HAVING `station_count` > 1",
        [fromCode, toCode])

    // let routeLine = ''
    // if (routeLine > 0) {
        routeLine = findingLinesQuery[0].line
    // }



    let route = await db.query(
        'SELECT * FROM tube_info WHERE `code` BETWEEN ? AND ? AND `line` = ?',
        [toCode, fromCode, routeLine]
    )


    if(route.length < 1) {
        route = await db.query(
            'SELECT * FROM tube_info WHERE `code` BETWEEN ? AND ? AND `line` = ?',
            [fromCode, toCode, routeLine]
        )
        route = route.reverse()
    }


    console.log(route)
    response.json(route)
}

module.exports = {getTubes, getRoute}