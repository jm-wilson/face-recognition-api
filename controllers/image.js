const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY, // Make sure to set CLARIFAI_KEY environment variable
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('unable to work with API'));
};

const handleImage = (knex) => (req, res) => {
  const { id } = req.body;

  knex('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((data) => {
      res.json(data[0].entries);
    })
    .catch((err) => res.status(400).json('Unable to get entries'));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
