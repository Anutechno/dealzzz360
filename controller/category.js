var { Category } = require("../models/Category");

async function AddCategory(req, res) {
  try {
    const { name, image } = req.body;

    if (name == "" || image == "") {
      var response = {
        status: 201,
        message: "name and image can not be empty !!",
      };
      return res.status(201).send(response);
    }
    const cname = await Category.findOne({ name: name });
    if (cname) {
      var response = {
        status: 201,
        success: false,
        message: "Category already exit",
      };
      return res.status(201).send(response);
    }

    const data = {
      name: req.body.name,
      image: req.body.image,
    };

    const category = await Category(data);
    await category
      .save()
      .then(() => {
        var response = {
          status: 200,
          data: category,
          message: "Category Added Successfully",
        };
        return res.status(200).send(response);
      })
      .catch((error) => {
        res.status(400).json(error);
        return;
      });
  } catch (error) {
    response = {
      errors: error,
      status: 400,
      message: "Operation was not successful",
    };
    return res.status(400).send(response);
  }
}

async function GetAllCategory(req, res) {
  try {
    const category = await Category.find(req.query).populate({
      path: "subcategory",
      select: ["name", "image"],
    });
    if (category) {
      var response = {
        status: 200,
        data: category,
        message: "successfull",
      };
      return res.status(200).send(response);
    } else {
      var response = {
        status: 201,
        message: "No Category Found",
      };
      return res.status(201).send(response);
    }
  } catch (error) {
    response = {
      errors: error,
      status: 400,
      message: "Operation was not successful",
    };

    return res.status(400).send(response);
  }
}

async function GetCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id).populate({
      path: "subcategory",
      select: ["name", "image"],
    });

    if (category) {
      var response = {
        status: 200,
        data: category,
        message: "successfull",
      };
      return res.status(200).send(response);
    } else {
      var response = {
        status: 201,
        message: "No Category Found",
      };
      return res.status(201).send(response);
    }
  } catch (error) {
    response = {
      errors: error,
      status: 400,
      message: "Operation was not successful",
    };

    return res.status(400).send(response);
  }
}

async function DeleteCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      //await category.remove()
      Category.findByIdAndDelete(req.params.id, (err, docs) => {
        if (err) {
          var response = {
            status: 201,
            message: err,
            messages: "Category delete failed",
          };
          return res.status(201).send(response);
        } else {
          var response = {
            status: 200,
            message: "Category removed successfully",
            data: docs,
          };
          return res.status(200).send(response);
        }
      });
    } else {
      var response = {
        status: 201,
        message: "No Category Found",
      };
      return res.status(201).send(response);
    }
  } catch (error) {
    response = {
      errors: error,
      status: 400,
      message: "Operation was not successful",
    };

    return res.status(400).send(response);
  }
}

async function UpdateCategory(req, res) {
  try {
    if (req.params.id != "") {
      const { name, image } = req.body;
      const category = await Category.findById(req.params.id);

      if (category) {
        const data = {
          image: image,
          name: name,
        };
        Category.findByIdAndUpdate(
          req.params.id,
          { $set: data },
          { new: true },
          (err, docs) => {
            if (err) {
              var response = {
                status: 201,
                message: err,
              };
              return res.status(201).send(response);
            } else {
              var response = {
                status: 200,
                message: "Category Updated successfully",
                data: docs,
              };
              return res.status(200).send(response);
            }
          }
        );
      } else {
        var response = {
          status: 201,
          message: "No Category Found",
        };
        return res.status(201).send(response);
      }
    } else {
      var response = {
        status: 201,
        message: "Enter Category id",
      };
      return res.status(201).send(response);
    }
  } catch (error) {
    response = {
      errors: error,
      status: 400,
      message: "Operation was not successful",
    };

    return res.status(400).send(response);
  }
}

module.exports = {
  AddCategory,
  GetAllCategory,
  GetCategory,
  DeleteCategory,
  UpdateCategory,
};
