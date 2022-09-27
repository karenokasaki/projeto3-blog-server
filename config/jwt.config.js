const jwt = require("jsonwebtoken");

function generateToken(user) {
  // o user será passado no momento que o token for gerado
  const { _id, name, email, role } = user;

  //assinando com a nossa assinatura
  const signature = process.env.TOKEN_SIGN_SECRET;
  //configurando o tempo de expiração
  const expiration = "10h";

  //a função sign assina o token com o nosso segredo e também guarda as informações do usuário
  // é assim que sabemos quem é o dono do token (ou seja, o usuário fazendo a requisição)

  return jwt.sign({ _id, name, email, role }, signature, {
    expiresIn: expiration,
  });
}

module.exports = generateToken;
