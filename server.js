require('dotenv').config();

const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const image = require('./controllers/image');
const profile = require('./controllers/profile');
const register = require('./controllers/register');
const signin = require('./controllers/signin');

const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Success'));
app.get('/profile/:id', profile.handleProfileGet(knex));

app.post('/imageurl', image.handleApiCall);
app.post('/register', register.handleRegister(knex, bcrypt));
app.post('/signin', signin.handleSignin(knex, bcrypt));

app.put('/image', image.handleImage(knex));

const PORT = process.env.PORT || 3000; // Make sure to set PORT environment variable

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
