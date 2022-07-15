const router = require("express").Router();
const {verifyToken} = require("../helper/validation");
var multer = require('multer');
var fs = require("fs-extra");
const {
    Usersignup, 
    Usersignin, 
    GetAllUser,
    GetUser,
    DeleteUser,
    UpdateUser,
    Logout,
    Following,
    ResetPassword,
    UpdatePassword,
    UpdateBanner,
    Search,
    } = require("../controller/user");


// set storage
const storage = multer.diskStorage({
    destination : function ( req , file , callback ){
        var path = `./uploads/User`;
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
    storage : storage,
    // limits: {
    // fileSize: 1024 * 1024 * 5
    // }
    // fileFilter:fileFilter

})


router.post("/signup",upload.array("images",10),Usersignup);
router.post("/signin",Usersignin);
router.post("/logout",Logout);

router.get("/getall",verifyToken,GetAllUser);
router.get("/get/:id",verifyToken,GetUser);
router.delete("/delete/:id",verifyToken,DeleteUser);
router.patch("/update/:id",verifyToken,upload.array("images",10),UpdateUser);
router.patch("/updatebanner",verifyToken,upload.array("images",10),UpdateBanner);

// follow n unfollow user
router.post("/follow/:followId",verifyToken,Following);

// Reset Password
router.post("/resetpassword",ResetPassword);
router.post("/updatePassword/:id",verifyToken,UpdatePassword);

// global search
//router.post("/search",verifyToken,Search);
router.post("/search",Search);

module.exports = router
