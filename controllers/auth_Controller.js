const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const Users_Schema = require("../models/users_Models");

const signup_Controller = async (req, res) => {
  try {
    const body = req.body;

    const salt = bcryptjs.genSaltSync(10);

    const hash_Password = bcryptjs.hashSync(body.password, salt);

    const new_User = await Users_Schema.create({
      ...body,
      password: hash_Password,
    });

    return res.json({ success: true, data: new_User });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const login_Controller = async (req, res) => {
  try {
    const body = req.body;
    const user = await Users_Schema.findOne({ email: body.email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const is_Valid_Password = await bcryptjs.compare(
      body.password,
      user.password
    );
    if (!is_Valid_Password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRECR_KEY, {
      expiresIn: "1h",
    });

    user.$inc("login_count", 1);

    await user.save();

    res.cookie("auth_token", token, {
      http: true,
      expires: new Date(Date.now() + 1 * 1 * 60 * 60 * 1000),
    });
    return res.json({
      success: true,
      message: "Login Successfully!",
      access_token: token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const check_auth_controller = async (req, res) => {
  try {
    const user = req.user;

    return res.json({ success: true, data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

module.exports = { signup_Controller, login_Controller, check_auth_controller };
