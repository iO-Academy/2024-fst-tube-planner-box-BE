const express = require('express');
const app = express();
const mysql = require('promise-mysql')
const fs = require('fs')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tube_info'
})

const tubes = JSON.parse(fs.readFileSync('./public/assets/tubeInfo.json', 'utf-8'))

console.log(tubes)

const insertData = async () => {
    const db = await connection
    for (let tubeLine in tubes) {

        tubes[tubeLine].forEach( async (tubeStop) => {
            const line = tubeLine
            const code = tubeStop.code
            const name = tubeStop.name
            const time_to_prev = tubeStop.timeToPrev
            const time_to_next = tubeStop.timeToNext
            const zone = tubeStop.zone

            const sqlQuery = `INSERT INTO tube_info (line, code, name, time_to_prev, time_to_next, zone) VALUES (?, ?, ?, ?, ?, ?)`
            await db.query(sqlQuery, [line, code, name, time_to_prev, time_to_next, zone])

        })
    }
}

insertData()


app.listen(3000);