import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
})

export default connection
