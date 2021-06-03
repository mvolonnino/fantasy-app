const UserModel = require("../models/UserModel");
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const generatePass = require("../helpers/generatePass");

dotenv.config();

// const loginUser = async ({ body }, res) => {
//   const { email, idToken } = body;
//   try {
//     const user = new UserModel({ email, idToken });
//     console.log(user);

//     await user.save();

//     res.send(body);
//   } catch (error) {
//     console.log(error);
//     return res.status(422).json({ message: error.message });
//   }
// };

const googlelogin = async ({ body }, res) => {
  const { idToken, OS } = body;
  let client_id;

  if (OS === "ios") {
    client_id = process.env.IOS_GOOGLE_CLIENT_ID;
  }
  if (OS === "android") {
    client_id = process.env.ANDROID_GOOGLE_CLIENT_ID;
  }

  const client = new OAuth2Client(client_id);
  client.verifyIdToken({ idToken }).then((response) => {
    console.log(response.payload);
    const { email_verified, name, email, picture } = response.payload;
    if (email_verified) {
      User.findOne({
        email,
      }).exec((err, user) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            message: err.message,
          });
        }

        if (user) {
          const token = jwt.sign(
            {
              _id: user._id,
            },
            process.env.JWT_SECRET
          );
          const { _id, email, name, picture } = user;
          console.log("exsiting user signed in => ", { email, name });
          res.status(200).send({
            token,
            user: { _id, email, name, picture },
          });
        } else {
          const password = generatePass();
          let newUser = new UserModel({ email, name, password, picture });

          newUser.save((err, data) => {
            if (err) {
              console.log(err);
              return res.status(400).send({
                message: err,
              });
            }

            const token = jwt.sign(
              {
                _id: data._id,
              },
              process.env.JWT_SECRET
            );
            const { _id, email, name, picture } = newUser;
            console.log("new user signed up => ", { newUser });

            res.status(200).send({
              token,
              user: { _id, email, name, picture },
            });
          });
        }
      });
    }
  });
};

module.exports = {
  // loginUser,
  googlelogin,
};
