const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();
const knex = require('knex');
const register = require('./Controllers/register');
const signin = require("./Controllers/signin");
const profile = require("./Controllers/profile");
const image = require("./Controllers/image");


const db = knex({
  client: 'pg',
   connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
      rejectUnauthorized: false
  }
  }
});

app.use(cors())
app.use(express.json());


app.get('/', (req, res)=> {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

app.put('/image', (req, res) => { image.handleImage(req, res, db);});
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db); });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`);
});
