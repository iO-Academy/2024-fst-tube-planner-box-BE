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
    const tubeStops =  await db.query('SELECT `name`, `code`, `line`, `id` FROM `tube_info` ORDER BY `line`, `id`;')
    response.json(tubeStops)
}

const getRoute = () => async (request, response) => {
    const from = request.query.from
    const to = request.query.to

    const fromCode = from.slice(-3)
    const toCode = to.slice(-3)
    const db = await connection

    const findingLinesQuery = await db.query("SELECT code, line, COUNT(line) AS `station_count` FROM `tube_info` WHERE `code` = ? OR `code` = ? GROUP BY `line` HAVING `station_count` > 1",
        [fromCode, toCode])

    if (findingLinesQuery.length < 1)
    {
        routeLine = ''
    } else {
        routeLine = findingLinesQuery[0].line

    }
    const getFromId = await db.query("SELECT `id` FROM `tube_info` WHERE `code` = ? AND `line` = ?", [fromCode, routeLine])
    const getToId = await db.query("SELECT `id` FROM `tube_info` WHERE `code` = ? AND `line` = ?", [toCode, routeLine])

    let fromID = ''
    let toID = ''

    if (getFromId.length < 1 || getToId.length < 1) {
            toID
            fromID
    } else {
            fromID = getFromId[0].id
            toID = getToId[0].id
    }
    
    let route = await db.query(
        'SELECT * FROM tube_info WHERE (`id` BETWEEN ? AND ?) AND `line` = ?',
        [toID, fromID, routeLine]
    )
    
    if(route.length < 1) {
        route = await db.query(
            'SELECT * FROM tube_info WHERE `id` BETWEEN ? AND ? AND `line` = ? ORDER BY `id` DESC ',
            [fromID, toID, routeLine]
        )
    }
    response.json(route)
}

module.exports = {getTubes, getRoute}