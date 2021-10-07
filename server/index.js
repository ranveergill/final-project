const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const {
  testHandler,
  createUser,
  postAd,
  getAllAds,
  getAdById,
  getByPoster,
  getAdByCategory,
  getAdByType,
  deletePost,
  updatePost,
  likePost,
  sendMessage,
  getFavorites,
  getMessages,
  getMessageDetails,
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./client/build"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  //endpoints

  //test

  .get("/test", testHandler)

  //get all ads

  .get("/allposts", getAllAds)

  //get ad by id

  .get("/posts/:postId", getAdById)

  //get ad by category

  .get("/posts/bycategory/:category", getAdByCategory)

  //get ad by type

  .get("/posts/type/:seeking", getAdByType)

  //get ad by poster email

  .get("/account/posts/:userEmail", getByPoster)

  //get favorites

  .get("/account/favorites/:userEmail", getFavorites)

  //get messages

  .get("/account/messages/:userEmail", getMessages)

  //get message details

  .get("/account/messages/:userEmail/re/:postId/:messageId", getMessageDetails)

  //create new user

  .post("/users", createUser)

  //get user by id

  //post ad

  .post("/posted", postAd)

  //delete ad

  .delete("/posts/:postid/delete", deletePost)

  //update ad

  .put("/posts/:postid/update", updatePost)

  //like post

  .put(`/likepost`, likePost)

  //send message
  .put(`/sendMessage`, sendMessage)

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
