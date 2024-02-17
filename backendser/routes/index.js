// Express Router 
const express = require("express");
const router = express.Router();

// Routes
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes.js");
const videoRoutes = require("./videoRoutes.js");
const commentRoutes = require("./commentRoutes.js");

console.log("Estoy en index.js - line 11")

/* Express Router Middleware
localhost:5000/api/auth/
localhost:5000/api/users/
localhost:5000/api/videos/
localhost:5000/api/comment 
*/
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/videos", videoRoutes);
router.use("/comments", commentRoutes);

module.exports = router;