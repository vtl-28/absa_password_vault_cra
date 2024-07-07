const jwt = require("jsonwebtoken");

function generate_token(id){
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generate_token;