const router = require("express").Router();
const {verifyToken} = require("../helper/validation");
const User = require("./userRoute");
const Category = require("./categoryRoute");
const Subcategory = require("./subcategoryRoute");
const Post = require("./postRoute")
const Chat = require("./chatRoute");
const Story = require("./storyRoute");


router.use("/user", User);
router.use("/category", verifyToken, Category);
router.use("/subcategory", verifyToken, Subcategory);
router.use("/post", verifyToken,Post);
router.use("/chat", verifyToken,Chat);
router.use("/story", verifyToken,Story);


module.exports = router
