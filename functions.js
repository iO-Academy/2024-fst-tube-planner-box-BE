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
    const db = await connection

    const findingLinesQuery = await db.query('SELECT `line` FROM tube_info WHERE `code` = ? OR `code` = ?',
        [fromCode, toCode])

    const newArray = []
    const duplicates = []
    const lineArray = []

   findingLinesQuery.forEach((item) => {
        lineArray.push(item.line)
    })

    lineArray.forEach((item) => {
        if(newArray.includes(item)) {
            duplicates.push(item)
        }
        else {
            newArray.push(item)
        }
    })

    // console.log(newArray)
    console.log(duplicates)

    // for now we are going to use duplicate[0] because we are tired



    const route = await db.query(
        'SELECT * FROM tube_info WHERE `name` BETWEEN ? AND ? AND `line` = ?',
        [toCode, fromCode, duplicates[0]]
    )
    console.log(to, from)
    console.log(route)


    response.json(route)
}

module.exports = {getTubes, getRoute}