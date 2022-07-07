const router = require("express").Router();
const  { SendMessage,
         GetAllChat,
         GetConversation,
         GetHistory,
         DeleteMessage,
        } = require("../controller/chat");


router.post("/sendmessage/:id",SendMessage);
router.get("/getall",GetAllChat);
router.get("/getconversation",GetConversation);
router.get("/history",GetHistory);
router.delete("/deletemessage/:id",DeleteMessage);

module.exports = router
