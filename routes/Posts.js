const express = require("express");
const router = express.Router();
const {
  getPost,
  getPostById,
  setPost,
  updatePost,
  deletePost,
} = require("../controllers/Posts");

router.route("/").get(getPost).post(setPost);
router.route("/:id").put(updatePost).delete(deletePost).get(getPostById);

// router.route("/").get(protect, getPosts).post(protect, setPost);
// router.route("/:id").delete(protect, deletePost).put(protect, updatePost);

module.exports = router;
