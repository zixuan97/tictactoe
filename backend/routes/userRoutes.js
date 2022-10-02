const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../model/userModel');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const newUser = new User({ username, password, firstName, lastName });
  bcrypt.hash(password, 5, function (err, hash) {
    newUser.password = hash;
    newUser
      .save()
      .then(() => res.json('User added!'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
});

router.route('/login').post(async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username: username }).exec();
  if (existingUser) {
    const passwordCompare = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (passwordCompare) {
      res.status(200).json({ message: 'login sucess', user: existingUser });
    }
    //if password is incorrect, return error message
    else {
      res.status(500).json({ message: 'wrong credentials' });
    }
  } else {
    res.status(401).json('not register');
  }
});

module.exports = router;
