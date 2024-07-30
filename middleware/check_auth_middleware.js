const jwt = require("jsonwebtoken");
const Users_Schema = require("../models/users_Models");

const check_auth_middleware = async (req, res, next) => {
  try {
    // Extracting the authentication token from cookies sent with the request
    const headers_token = req.headers.authorization;

    if (!headers_token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const auth_token = headers_token.split(" ")[1];

    console.log(auth_token);

    // Verifying the authenticity of the token using the JWT_SECRET_KEY stored in environment variables
    const verify_token = jwt.verify(auth_token, process.env.JWT_SECRET_KEY);

    // Checking if the token verification failed
    if (!verify_token) {
      // If verification fails, sending an unauthorized status code and message
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    // Extracting the user ID from the verified token payload
    const user_id = verify_token._id;

    // Retrieving the user details from the database based on the user ID
    const find_user = await Users_Schema.findById(user_id).select("-password");

    // return res.json({data:find_user})

    // Storing the user details in the request object for further use in the route handlers
    req.user = find_user;

    // // Calling the next middleware or route handler in the chain
    return next();

    // Uncomment the line below if you want to return the user details in the response
    // return res.json({ success: true, data: find_user });
  } catch (error) {
    // Handling any errors that occur during the authentication process
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

module.exports = check_auth_middleware;
