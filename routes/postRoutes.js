const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");

//Code to include all the routes for the blog post (select, create, update and delete)

//Get all the posts
router.get("/", async(req, res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

//get a specific post
router.get("/:id", getPost, (req,res)=>{
    res.json(res.post);
});

//create a post
router.post("/", async(req,res)=>{
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    try{
        const newPost = await post.save();
        res.status(201).json(newPost);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

// Update a post
router.patch("/:id", getPost, async (req, res) => {
    // Check if the title is provided and update it
    if (req.body.title != null) {
        res.post.title = req.body.title;
    }
    // Check if the content is provided and update it
    if (req.body.content != null) {
        res.post.content = req.body.content;
    }
    try {
        const updatedPost = await res.post.save();  // Save the updated post to the database
        res.json(updatedPost);                      // Return the updated post in the response
    } catch (err) {
        res.status(400).json({ message: err.message });  // Return a 400 error if saving fails
    }
});

//delete post
router.delete('/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) return res.status(404).send('Post not found');
      res.status(200).send('Post deleted');
    } catch (error) {
      res.status(500).send('Error deleting post');
    }
  });
  

// Middleware function to get post by ID
async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: "Cannot find post" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.post = post;
    next();
}

module.exports = router;