const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('pusher-chatkit-server');

const app = express();
const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:c2f4fafe-37a4-4976-8b17-f0e9db2f4c36',
  key: 'ddcb0447-241d-43b3-8ac0-0432fe6ce54d:NUl40Ed1d/N2D7qCFPkSJiuflBDrqxrgjsH5DDI2lGA='
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.post('/users', (req, res) => {
  const { username } = req.body;
  chatkit
    .createUser({
	     id: username,
	     name: username
     })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error);
      }
    });
});

const PORT = 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
});
