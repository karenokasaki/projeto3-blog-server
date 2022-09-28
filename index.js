const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./config/db.config");
dbConnection();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.REACT_APP_URI }));

//middleware teste
//const logRequest = require("./middlewares/requests");
//app.use(logRequest);

//ROTAS
const UsersRoute = require("./routes/users.routes");
app.use("/users", UsersRoute);

const PostsRoute = require("./routes/posts.routes");
app.use("/posts", PostsRoute);

const CommentsRoute = require("./routes/comments.routes");
app.use("/comments", CommentsRoute);

const UploadImgRoute = require("./routes/uploadimg.routes");
app.use("/", UploadImgRoute);

app.listen(Number(process.env.PORT), () => {
  console.log("Server up and running on port", process.env.PORT);
});
