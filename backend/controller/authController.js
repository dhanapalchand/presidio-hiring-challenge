const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({ id: user._id, token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signup = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const city = req.body.city;
  const state = req.body.state;
  const pincode = req.body.pincode;
  const address = req.body.address;
  const country = req.body.country;
  const role=req.body.role;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      pincode,
      city,
      state,
      country,
      role,
      address,
    );

    const token = createToken(user._id);

    res.status(200).json({ id: user._id, token, user });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

module.exports = {
  signup,
  login,
};
