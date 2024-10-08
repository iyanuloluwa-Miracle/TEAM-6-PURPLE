const User = require("../models/User");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/authValidator");
const createError = require("http-errors");
let blackList = fs.readFileSync("./blackList.json");
let b = JSON.parse(blackList);

const register = async (req, res, next) => {
  // Validate request body
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password, firstName, lastName } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error(error);
    next(createError(500, "Error registering user"));
  }
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    const index = b.indexOf(user.email);
    b.splice(index, 1);
    fs.writeFileSync('./blackList.json', JSON.stringify(b));

    res.json({ message: "Login successful", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

const logout = (req, res) => {

  if (req.user) {
    const { email } = req.user;
    b.push(email);
    fs.writeFileSync('./blackList.json', JSON.stringify(b));
  }
  delete req.user;
  res.status(200).json({ message: "Logout successful" });
};


module.exports = {
  register,
  login,
  logout,
};
