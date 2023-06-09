const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(bodyParser.json());
var cors = require('cors')
app.use(cors())

const db = require('knex')({
  client: 'mysql2',
  connection: {
    host : 'us-cdbr-east-06.cleardb.net',
    user : 'b16d4e3abd038c',
    port : 3306,
    password: '0de20fbf',
    database : 'heroku_45421c123dd3e2a'
  }
});

app.get("/api/equipos", (req, res) => {
  db.select('*').from('Equipos').then((equipos) => {
    res.status(200).json(equipos)
  })
});

app.post("/api/equipos", (req, res) => {
  const { name, info, img } = req.body;

  if(!name || !info || !img) return res.status(400).json("invalid body");

  db('Equipos')
      .insert(
      {name, info, img},
      ).then(equipo => {
          res.status(201).json(equipo);
      }).catch(err => {
          res.status(500).json({ "message": 'Unable to add team'});
      });
});

app.patch("/api/equipos/:id", (req, res) => {
  const { id } = req.params;
  const { name, info, img } = req.body;

  if(!name || !info || !img) return res.status(400).json("invalid body");

  db('Equipos')
      .where('id', id)
      .update({name, info, img})
      .then(equipo => {
          if (equipo) {
              return res.status(200).json({"message": "Updated successfully"});
          }
          res.status(400).json({"message": "Team ID does not exist"});
      }).catch(err => {
          res.status(500).json({"message": "Unable to update team", "error":err.sqlMessage});
      });
});

app.delete("/api/equipos/:id", (req, res) => {
  const { id } = req.params;

  db('Equipos')
      .where('id', id)
      .del()
      .then(comment => {
          if (comment) {
              return res.status(200).json("Deleted successfully");
          }
          res.status(400).json({"message": "Team ID does not exist"});
      }).catch(err => {
          res.status(500).json({"message": "Unable to delete team"});
      });
});

app.get("/api/rankings", (req, res) => {
  db.select('*').from('Rankings').then((equipos) => {
    res.status(200).json(equipos)
  })
});

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);