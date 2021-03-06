const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const knex = require('knex')
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'giochoa',
      password : '',
      database : 'facerecog'
    }
  });

const saltRounds = 10;
const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
	res.send(db.users);
})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res)  =>{register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res ) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, () =>{
	console.log('app is running');
})
