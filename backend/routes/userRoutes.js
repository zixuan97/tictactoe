const router = require('express').Router();
let User = require('../model/userModel');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const newUser = new User({ username, password, firstName, lastName });

  newUser
    .save()
    .then(() => res.json('User added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;