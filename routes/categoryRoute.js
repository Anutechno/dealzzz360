const router = require("express").Router();
const {
    AddCategory, 
    GetAllCategory, 
    GetCategory, 
    DeleteCategory,
    UpdateCategory,
    } = require("../controller/category");


router.post("/add",AddCategory);
router.get("/getall",GetAllCategory);
router.get("/get/:id",GetCategory);
router.delete("/delete/:id",DeleteCategory);
router.patch("/update/:id",UpdateCategory);


module.exports = router;