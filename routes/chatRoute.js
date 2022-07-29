const router = require("express").Router();
var multer = require("multer");
var fs = require("fs-extra");

const {
  SendMessage,
  GetAllChat,
  GetConversation,
  GetHistory,
  DeleteMessage,
  ChatList,
} = require("../controller/chat");

const storage = multer.diskStorage({
        destination : function ( req , file , callback ){
            var path = `./uploads/Chat`;
            fs.mkdirsSync(path);
            //callback(null, 'uploads')
            callback(null, path);
        },
        filename : function (req, file , callback){
            // image.jpg
            // var ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
            // return callback(null, file.fieldname + '-' + Date.now() + ext)
            // callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
            callback(null, file.originalname)
            // save file as original name
            // callback(null, file.originalname + ext)
        }
    
    })
    
    //   const fileFilter=(req, file, cb)=>{
    //    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
    //        cb(null,true);
    //    }else{
    //        cb(null, false);
    //    }
    //   }
const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 10000
  // }
});
router.post("/sendmessage/:id", upload.array("message",10),SendMessage);
router.get("/getall", GetAllChat);
router.get("/getconversation", GetConversation);
router.get("/chatlist", ChatList);
router.get("/history", GetHistory);
router.delete("/deletemessage/:id", DeleteMessage);

module.exports = router;
