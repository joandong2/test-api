// handle promises w/o try-catch block
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Post = require("../models/Posts");
let post;

const getPost = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

const getPostById = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    post = await Post.findById(req.params.id);
  } else {
    res.status(400);
    throw new Error("Post not found");
  }

  res.status(200).json(post);
});

const setPost = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.body) {
    res.status(400);
    throw new Error("Please add missing fields!");
  }

  const Post = await Post.create({
    title: req.body.title,
    body: req.body.body,
  });

  res.status(200).json(Post);
});

const updatePost = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    post = await Post.findById(req.params.id);
  } else {
    res.status(400);
    throw new Error("Post not found");
  }

  // new: true will create if it doesn't exist
  if (post) {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  }

  res.status(200).json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    post = await Post.findById(req.params.id);
  } else {
    res.status(400);
    throw new Error("Post not found");
  }

  if (post) {
    await post.remove();
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPost,
  getPostById,
  setPost,
  updatePost,
  deletePost,
};
