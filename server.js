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
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'face-detect-app'
  }
});

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send("Success");
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt);});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt);});
app.put('/image',  (req, res) => { image.handleImage(req, res, db);});
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db);});

app.listen(3000, () => {
    console.log('app is running');
});
