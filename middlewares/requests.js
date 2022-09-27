function logRequests(req, res, next) {
  console.log("Request:", req.body);

  console.log("Passei pelo middleware");

  req.teste = "eu criei essa chave e agora ela tá disponível na rota";

  next();
}

module.exports = logRequests;
