import express from 'express'
import cors from 'cors'
import db from './db_config.js'

const app = express()

app.set('json spaces', 2)
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/getUsers', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            res.status(500).json(err)
            return
        }
        res.send(results)
    })
})

app.post('/addUser', (req, res) => {
    const { nombreCompleto, edad, ciudad, correo } = req.body
    db.query(`INSERT INTO usuarios(NombreCompleto, Edad, Ciudad, Correo) VALUES('${nombreCompleto}', ${edad}, '${ciudad}', '${correo}')`, (err, results) => {
        if (err) {
            res.status(500).json(err)
            return
        }
        res.send(results)
    })
})

app.listen(5000, () => {
    console.log("Running...")
})
