var {Category,Subcategory} = require("../models/Category")


async function AddSubCategory(req,res){
    try{
        const {category_id, name, image} = req.body;
        
        const cat = await Category.findById(category_id)
        if(!cat){
            var response = {
                status: 201,
                message: "No Category Found",
              };
            return res.status(201).send(response);
        }

        if(name == "" || image == ""){
            var response = {
                status: 201,
                message: "name and image can not be empty !!",
            };
            return res.status(201).send(response);
        }

        // const cname= await Subcategory.findOne({name:name});
        // if(cname){
        //     var response = {
        //         status: 201,
        //         success:false,
        //         message: 'SubCategory already exit',
        //     };
        //     return res.status(201).send(response);
        // }
        const data ={
            category_id:req.body.category_id,
            name:req.body.name,
            image:req.body.image
        }
        const subcategory = await Subcategory(data);

        // add Subcategory ID into Category
        cat.subcategory.push(subcategory._id);
        await cat.save();

        await subcategory.save()
        .then(() => {

            var response = {
                status: 200,
                data: subcategory,
                message: "SubCategory Added Successfully",
            };
            return res.status(200).send(response);
            })
        .catch(error => {
            res.status(400).json(error)
            return;
        })
    } catch (error) {
        response = {
          errors:error,
          status: 400,
          message: "Operation was not successful",
        };
    
        return res.status(400).send(response);
    }
}


async function GetAllSubCategory(req,res){
    try{

        const subcategory = await Subcategory.find(req.query)
        
        if(subcategory){
            var response = {
                status: 200,
                data: subcategory,
                message: 'successfull',
              };
              return res.status(200).send(response);
        } else{
            var response = {
                status: 201,
                message: "No SubCategory Found",
              };
            return res.status(201).send(response);
        }

    } catch (error) {
        response = {
          errors:error,
          status: 400,
          message: "Operation was not successful",
        };
    
        return res.status(400).send(response);
    }
}


async function GetSubCategory(req,res){
    try{

        const subcategory = await Subcategory.findById(req.params.id)
        
        if(subcategory){
            var response = {
                status: 200,
                data: subcategory,
                message: 'successfull',
              };
              return res.status(200).send(response);
        } else{
            var response = {
                status: 201,
                message: "No SubCategory Found",
              };
            return res.status(201).send(response);
        }

    } catch (error) {
        response = {
          errors:error,
          status: 400,
          message: "Operation was not successful",
        };
    
        return res.status(400).send(response);
    }
}


async function DeleteSubCategory(req,res){
    try{

        const subcategory = await Subcategory.findById(req.params.id)
        
        if(subcategory){
            //await category.remove()
            Subcategory.findByIdAndDelete(req.params.id,(err, docs)=> {
                if (err) {
                  var response = {
                    status: 201,
                    message: err,
                    messages: "SubCategory delete failed",
                  };
                  return res.status(201).send(response);
                } else {
                    var response = {
                        status: 200,
                        message:"SubCategory removed successfully",
                        data:docs,
                    };
                  return res.status(200).send(response);
                }
              });
        } else{
            var response = {
                status: 201,
                message: "No SubCategory Found",
              };
            return res.status(201).send(response);
        }

    } catch (error) {
        response = {
          errors:error,
          status: 400,
          message: "Operation was not successful",
        };
    
        return res.status(400).send(response);
    }
}


async function UpdateSubCategory(req,res){
    try{
        if(req.params.id != ""){
            const {name,image} = req.body;
            const subcategory = await Subcategory.findById(req.params.id)
        
            if(subcategory){
                const data = {
                    image: image,
                    name: name,
                }
                Subcategory.findByIdAndUpdate(req.params.id,{$set:data},{new:true},(err, docs)=> {
                    if (err) {
                      var response = {
                        status: 201,
                        message: err,
                      };
                      return res.status(201).send(response);
                    } else {
                        var response = {
                            status: 200,
                            message:"SubCategory Updated successfully",
                            data:docs,
                          };
                          return res.status(200).send(response);
                    }
                  });
            } else{
                var response = {
                    status: 201,
                    message: "No Category Found",
                  };
                return res.status(201).send(response);
            }
        } else {
            var response = {
                status: 201,
                message: "Enter SubCategory id",
              };
            return res.status(201).send(response);
        }   
    }catch (error) {
        response = {
          errors:error,
          status: 400,
          message: "Operation was not successful",
        };
    
        return res.status(400).send(response);
    }
}



module.exports = {
    AddSubCategory,
    GetAllSubCategory,
    GetSubCategory,
    DeleteSubCategory,
    UpdateSubCategory
}