const express = require("express");
const router = express.Router();

const Posts = require("../../models/Posts");

// Create
router.post("/", async (req, res) => {
  const newPost = new Posts(req.body);

  try {
    const post = await newPost.save();
    if (!post) throw Error("Something went wrong while saving the post!");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// Get
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    if (!posts) throw Error("No Posts!");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// Get by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) throw Error("No Post!");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if (!post) {
      throw Error("No posts found!");
    } else {
      const posts = await Posts.find();
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// Update
router.patch("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
    if (!post) {
      throw Error("Something went wrong while updating the post!");
    } else {
      const posts = await Posts.find();
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
