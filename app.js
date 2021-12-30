const express = require("express");
const PostModel = require("./models").post;
const CommentModel = require("./models").comment;

const app = express();
const PORT = 3000;

app.get("/posts", (req, res) => {
  PostModel.findAll({
    include: {
      model: CommentModel,
      attributes: { exclude: ["id", "postId"] },
    },
  })
    .then((data) => {
      res.status(200).json({
        status: 1,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        msg: "there is something error",
        err: err,
      });
    });
});

app.get("/comments", (req, res) => {
  CommentModel.findAll({
    include: {
      model: PostModel,
      attributes: { exclude: ["id"] },
    },
  })
    .then((data) => {
      res.status(200).json({
        status: 1,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        msg: "there is something error",
        err: err,
      });
    });
});

app.listen(PORT, () => {
  console.log("Sever running at 3000");
});
