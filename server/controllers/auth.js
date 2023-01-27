require("dotenv").config();
const { JWT_SECRET_KEY } = process.env;
const { User } = require("../util/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (username, id) => {
  return jwt.sign({ username, id }, JWT_SECRET_KEY, { expiresIn: 86400000 }); // Sign key with payload (username & id), JWT Secret and expiration of 24 hrs 86400000.
};

module.exports = {
  registerUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      let foundUser = await User.findOne({ where: { username: username } });
      if (foundUser) {
        res.sendStatus("User already exists");
      } else {
        const hash = bcrypt.hashSync(password, 10); // Salt is auto-generated
        const newUser = await User.create({
          username,
          password: hash,
        });
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        const exp = Date.now() + 86400000; // Sets expiration to 24 hrs
        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token: token,
          exp: exp,
        });
      }
    } catch (err) {
      res.status(400).send("Could not create user");
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body; // Desctructure request body

      let foundUser = await User.findOne({ where: { username: username } }); // Finds user in db

      // userAuthenticated compares passwords and returns boolean
      if (foundUser) {
        const userAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );
        // Creates token IF user is authenticated
        if (userAuthenticated) {
          const token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );

          const exp = Date.now() + 86400000; // Sets expiration to 24 hrs

          // Sends data to be used in login handler on frontend
          res.status(200).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            token: token,
            exp: exp,
          });
        } else {
          console.log("Incorrect password");
          res.sendStatus(400)
        }
      } else {
        console.log("User not found");
        res.sendStatus(400)
      }
    } catch (err) {
      console.log("Error logging in");
      console.log(err);
      res.sendStatus(400);
    }
  },
};
