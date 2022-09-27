const { expressjwt: expressJWT } = require("express-jwt");

module.exports = expressJWT({
  secret: process.env.TOKEN_SIGN_SECRET,
  algorithms: ["HS256"],
});

//cria a chave req.auth