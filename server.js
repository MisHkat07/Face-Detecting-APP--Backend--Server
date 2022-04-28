const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: 'postgresql-perpendicular-08980',
    user: 'postgres',
    password: 'test',
    database: 'smart-brain',
  },
});

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Success");
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt);});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt);});
app.put('/image',  (req, res) => { image.handleImage(req, res, db);});
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db);});

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('app is running');
});
