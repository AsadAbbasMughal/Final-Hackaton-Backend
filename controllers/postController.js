import Post from "../models/Post.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🟢 Create Post (with user id and Cloudinary image)
export const createPost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    let imageUrl = "";
    if (req.body.image) {
      // Upload image to Cloudinary
      const uploaded = await cloudinary.uploader.upload(req.body.image, {
        folder: "posts",
      });
      imageUrl = uploaded.secure_url;
    }

    const newPost = new Post({
      user: req.user._id,
      description: req.body.description,
      image: imageUrl,
    });

    const savedPost = await newPost.save();
    await savedPost.populate("user", "name email");

    res.status(201).json(savedPost);
  } catch (err) {
    console.error("❌ Error creating post:", err);
    res.status(500).json({
      message: "Error creating post",
      error: err.message,
    });
  }
};

// 🟢 Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 }); // ✅ Latest post first
    res.json(posts);
  } catch (err) {
    console.error("❌ Error fetching posts:", err);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// 🟠 Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (
      post.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting post:", err);
    res.status(500).json({ message: "Error deleting post" });
  }
};
