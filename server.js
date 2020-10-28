const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '',
    database: 'smart-brain',
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Success'));
app.get('/profile/:id', profile.handleProfileGet(knex));

app.post('/signin', signin.handleSignin(knex, bcrypt));
app.post('/register', register.handleRegister(knex, bcrypt));
app.post('/imageurl', image.handleApiCall);

app.put('/image', image.handleImage(knex));

const PORT = process.env.PORT; // Make sure to set PORT environment variable
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
