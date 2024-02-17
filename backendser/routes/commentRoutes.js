// Express Router 
const express = require("express");
const router = express.Router();

// JWT Auth Middleware
const {getAccessToRoute} = require("../middlewares/authMiddleware.js");

// Comment Controllers
const {getComments, addComment, deleteComment} = require("../controllers/commentControllers.js");

/* Get Comment or Comments by Video ID
localhost:5000/api/comments/videoId 
*/
router.get("/:videoId", getAccessToRoute, getComments);

/* Add a Comment
localhost:5000/api/comments/
*/
router.post("/", getAccessToRoute, addComment);

/* Delete a Comment 
localhost:5000/api/comments/:id
*/
router.delete("/:id", getAccessToRoute, deleteComment);

module.exports = router;