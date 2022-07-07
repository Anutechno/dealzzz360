const router = require("express").Router();
const {
    AddSubCategory, 
    GetAllSubCategory, 
    GetSubCategory, 
    DeleteSubCategory,
    UpdateSubCategory,
    } = require("../controller/subcategory");


router.post("/add",AddSubCategory);
router.get("/getall",GetAllSubCategory);
router.get("/get/:id",GetSubCategory);
router.delete("/delete/:id",DeleteSubCategory);
router.patch("/update/:id",UpdateSubCategory);


module.exports = router;