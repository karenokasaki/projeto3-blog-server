module.exports = (req, res, next) => {
  const loggedInUser = req.currentUser;

  if (loggedInUser.role !== "ADMIN") {
    return res.status(400).json("Esse usuário não é um Administrador");
  }

  next();
};
