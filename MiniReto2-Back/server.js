const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
var cors = require('cors')
app.use(cors())

const db = require('knex')({
  client: 'mysql2',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    database : 'miniReto'
  }
});

app.get("/api/equipos", (req, res) => {
  db.select('*').from('Equipos').then((equipos) => {
    res.status(200).json(equipos)
  })
});

app.post("/api/pet", (req, res) => {
  console.log('El cuerpo de la peticion:', req.body);
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);