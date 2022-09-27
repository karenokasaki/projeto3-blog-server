const express = require("express");
const router = express.Router();

const UserModel = require("../models/User.model");
const PostModel = require("../models/Post.model");
const CommentModel = require("../models/Comment.model");

const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "Hotmail",
  auth: {
    user: "turma85wdft@hotmail.com",
    pass: "SenhaSegura@123",
  },
});

router.post("/create", isAuth, attachCurrentUser, async (req, res) => {
  try {
    console.log(req.currentUser);
    const idAuthor = req.currentUser._id;

    const newPost = await PostModel.create({ ...req.body, author: idAuthor });

    const author = await UserModel.findByIdAndUpdate(
      idAuthor,
      {
        $push: { posts: newPost._id },
      },
      { new: true }
    );

    //envio de email
    const mailOptions = {
      from: "turma85wdft@hotmail.com",
      to: author.email,
      subject: "Você criou um post!",
      html: `<h1>Seu post:</h1> <p>${newPost.content}</p>`,
    };

    // Dispara e-mail para o usuário
    await transporter.sendMail(mailOptions);

    return res.status(201).json([newPost, author]);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/my-posts", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedInUser = req.currentUser;

    const posts = await PostModel.find({ author: loggedInUser._id })
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      });

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/post/:idPost", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedInUser = req.currentUser;
    const { idPost } = req.params;

    if (!loggedInUser.posts.includes(idPost)) {
      return res.status(400).json({ message: "Post não encontrado" });
    }

    const post = await PostModel.findById(idPost)
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.put("/edit/:idPost", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedInUser = req.currentUser;
    const { idPost } = req.params;

    if (!loggedInUser.posts.includes(idPost)) {
      return res.status(400).json({ message: "Post não encontrado" });
    }

    const editedPost = await PostModel.findByIdAndUpdate(
      idPost,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json(editedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.delete(
  "/delete/:idPost",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedInUser = req.currentUser;
      const { idPost } = req.params;

      if (!loggedInUser.posts.includes(idPost)) {
        return res.status(400).json({ message: "Post não encontrado" });
      }

      //deletar o post
      const deletedPost = await PostModel.findByIdAndDelete(idPost);

      // deletando a REFERENCIAS do id DO POST do meu usuário (se quem criou o post)
      await UserModel.findByIdAndUpdate(deletedPost.author, {
        $pull: { posts: idPost },
      });

      // deleto todos os comentários desse post.
      await CommentModel.deleteMany({ post: idPost });

      return res
        .status(200)
        .json("Post deleteado. Usuário atualizado. Comentários deletados");
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
);

module.exports = router;
