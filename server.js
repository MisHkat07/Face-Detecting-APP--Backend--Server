const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const port = process.env.PORT || 4000;
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
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

app.listen(port, () => {
    console.log('app is running');
});
