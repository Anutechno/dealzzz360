const router = require("express").Router();
const {GetAllNotification} = require("../controller/notification")





router.get("/getall",GetAllNotification);




module.exports = router;
