var User = require("../models/User");
var validation = require("../helper/validation");
const jwt_decode = require("jwt-decode");
// var bcrypt = require("bcryptjs");
var Sendemail = require("../helper/SendEmail");
const cloudinary = require("cloudinary");
var ObjectId = require('mongodb').ObjectId;


// async function Usersignup(req, res) {
//   // try{
//   const { email, username, password, role } = req.body;

//   //console.log(req.files)
//   if (
//     email == "" ||
//     password == "" ||
//     username == "" ||
//     role == ""
//   ) {
//     var response = {
//       status: 201,
//       message:
//         "email, username, role and password and Image can not be empty !!",
//     };
//     return res.status(201).send(response);
//   }

//   let datas = await User.findOne({ username });
//   if (datas) {
//     res.status(201).json({
//       status: 201,
//       success: false,
//       message: "Username Already Exists",
//     });
//     return;
//   }
//   let data = await User.findOne({ email });
//   if (data) {
//     res.status(201).json({
//       status: 201,
//       success: false,
//       message: "Email Already Exists",
//     });
//     return;
//   }
//   if (req.files.length > 1) {
//     const myCloud = [];
//     for (var a = 0; a < req.files.length; a++) {
//       const img = await cloudinary.v2.uploader.upload(req.files[a].path, {
//         folder: "/USERS",
//       });
//       myCloud.push(img);
//     }

//     const userdata = {
//       name: req.body.name,
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       username: req.body.username,
//       email: req.body.email,
//       password: validation.hashPassword(req.body.password),
//       mob_no: req.body.mob_no,
//       bio: req.body.bio,
//       bio_dob: req.body.bio_dob,
//       role: req.body.role,
//       profile_type: req.body.profile_type,
//       address: req.body.address,
//       images: {
//         public_id: myCloud[0].public_id,
//         url: myCloud[0].secure_url,
//       },
//       cimages: {
//         public_id: myCloud[1].public_id,
//         url: myCloud[1].secure_url,
//       },
//     };

//     const user = await User.create(userdata);

//     var response = {
//       status: 200,
//       message: `${role} signup successfully`,
//       data: user,
//     };
//     return res.status(200).send(response);
//   } else {
//     const myCloud = await cloudinary.v2.uploader.upload(req.files[0].path, {
//       folder: "/USERS",
//     });

//     const userdata = {
//       name: req.body.name,
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       username: req.body.username,
//       email: req.body.email,
//       password: validation.hashPassword(req.body.password),
//       mob_no: req.body.mob_no,
//       bio: req.body.bio,
//       bio_dob: req.body.bio_dob,
//       role: req.body.role,
//       profile_type: req.body.profile_type,
//       location: req.body.location,
//       images: {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       },
//     };

//     const user = await User.create(userdata);

//     var response = {
//       status: 200,
//       message: `${role} signup successfully`,
//       data: user,
//     };
//     return res.status(200).send(response);
//   }
//   // } catch (error) {
//   //     var response = {
//   //       errors:error,
//   //       status: 400,
//   //       message: "Operation was not successful",
//   //     };

//   //     return res.status(400).send(response);
//   // }
// }

async function Usersignup(req, res) {
  const { email, password, role } = req.body;

  if (email == "" || password == "" || role == "") 
  {
    var response = {
      status: 201,
      message:
        "email, role and password can not be empty !!",
    };
    return res.status(201).send(response);
  }

  //console.log(req.files)
  if(role == "USER"){
    
  const {username} = req.body;
    if (username == "") 
    {
      var response = {
        status: 201,
        message:
          "username can not be empty !!",
      };
      return res.status(201).send(response);
    }

    let datas = await User.findOne({ username });
    if (datas) {
      res.status(201).json({
        status: 201,
        success: false,
        message: "Username Already Exists",
      });
      return;
    }
    let data = await User.findOne({ email });
    if (data) {
      res.status(201).json({
        status: 201,
        success: false,
        message: "Email Already Exists",
      });
      return;
    }
    const userdata = {
      username: req.body.username,
      email: req.body.email,
      password: validation.hashPassword(req.body.password),
      role: req.body.role,
    };
  
    const user = await User.create(userdata);
  
    const token = validation.generateUserToken(
      user.email,
      user._id,
      user.role,
      "logged",
      1
    );
    // console.log(token);
    var response = {
      status: 200,
      message: `${role} signup successfully`,
      data: user,
      token:token,
    };
    return res.status(200).send(response);
  } else {
    //console.log(req.bod
    
    let data = await User.findOne({ email });
    if (data) {
      res.status(201).json({
        status: 201,
        success: false,
        message: "Email Already Exists",
      });
      return;
    };
    //console.log(req.files);
    if(req.files.length > 1){
      const myCloud = [];
      for (var a = 0; a < req.files.length; a++) {
        const img = await cloudinary.v2.uploader.upload(req.files[a].path, {
          folder: "/USERS",
        });
        myCloud.push(img);
      }
      const userdata = {
        name: req.body.name,
        contact_person: req.body.contact_person,
        title: req.body.title,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        // username: req.body.username,
        email: req.body.email,
        password: validation.hashPassword(req.body.password),
        // mob_no: req.body.mob_no,
        // bio: req.body.bio,
        // bio_dob: req.body.bio_dob,
        role: req.body.role,
        // profile_type: req.body.profile_type,
        // location: req.body.location,
        images: {
          public_id: myCloud[0].public_id,
          url: myCloud[0].secure_url,
        },
        cimages: {
          public_id: myCloud[1].public_id,
          url: myCloud[1].secure_url,
        },
      };
  

      const user = await User(userdata);

      await user.save();
  
      // const token = validation.generateUserToken(
      //   user.email,
      //   user._id,
      //   user.role,
      //   "logged",
      //   1
      // );

      var response = {
        status: 200,
        message: `${role} signup successfully`,
        data: user,
        //token:token
      };
      return res.status(200).send(response);
    } else {
      var response = {
        status: 201,
        message: `Upload Logo and Banner images`,
      };
      return res.status(200).send(response);
    }
  }
 
}

async function Usersignin(req, res) {
  try {
    const { email, username, password } = req.body;

    if (email == "" || password == "") {
      var response = {
        status: 201,
        message: "email and password can not be empty !!",
      };
      return res.status(201).send(response);
    } else {
      // var data = await User.findOne(email ? { email } : { username });
      var data = await User.findOne({email:email});
      // console.log(data);
      if (data) {
        // console.log(data);
        // console.log(data.password);
        // console.log(validation.comparePassword(password,data.password));
        if (validation.comparePassword(data.password, password)) {
          const token = validation.generateUserToken(
            data.email,
            data._id,
            data.role,
            "logged",
            1
          );

          var response = {
            status: 200,
            data: data,
            token: token,
            message: "User signin successfully",
          };

          const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          };

          return res.status(200).cookie("token", token, options).send(response);
        } else {
          var response = {
            status: 201,
            message: "Incorrect email or password",
          };
          return res.status(201).send(response);
        }
      } else {
        var response = {
          status: 201,
          data: data,
          message: "Incorrect username or password",
        };
        return res.status(201).send(response);
      }
    }
  } catch (error) {
    var response = {
      errors: error,
      status: 400,
      message: "Operation was not successful",
    };

    return res.status(400).send(response);
  }
}

async function GetAllUser(req, res) {
  try {
    const user = await User.find(req.query)
      .populate({ path: "followers", select: ["email", "username"] })
      .populate({ path: "following", select: ["email", "username"] })
      .populate({ path: "story", select: ["caption", "images"] })
      .populate({ path: "category",select: ["name", "image"] })
      .populate({ path: "subcategory",select: ["name", "image"] });



    if (user) {
      var response = {
        status: 200,
        data: user,
        message: "successfull",
      };
      return res.status(200).send(response);
    } else {
      var response = {
        status: 201,
        message: "No User Found",
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

async function GetUser(req, res) {
  try {
    const user = await User.findById(req.params.id).populate({ path: "followers", select: ["email", "username"] })
                                                   .populate({ path: "following", select: ["email", "username"] })
                                                   .populate({ path: "story", select: ["caption", "images"] })
                                                   .populate({ path: "category",select: ["name", "image"] })
                                                   .populate({ path: "subcategory",select: ["name", "image"] });

    if (user) {
      var response = {
        status: 200,
        data: user,
        message: "successfull",
      };
      return res.status(200).send(response);
    } else {
      var response = {
        status: 201,
        message: "No User Found",
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

async function DeleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // if (user.cimages) {
      //   const imageId = user.cimages[0].public_id;
      //   await cloudinary.v2.uploader.destroy(imageId);
      // }
      // const imageId = user.images[0].public_id;
      // await cloudinary.v2.uploader.destroy(imageId);
      // await User.remove()
      User.findByIdAndDelete(req.params.id, (err, docs) => {
        if (err) {
          var response = {
            status: 201,
            message: err,
            messages: "User delete failed",
          };
          return res.status(201).send(response);
        } else {
          var response = {
            status: 200,
            message: "User removed successfully",
            data: docs,
          };
          return res.status(200).send(response);
        }
      });
    } else {
      var response = {
        status: 201,
        message: "No User Found",
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

async function UpdateUser(req, res) {
  try{
    if (req.params.id != "") {
      // const {location} = req.body;
      const user = await User.findById(req.params.id);
      if (user) {
        if(user.role == "USER"){
          if(req.files.length>0){
            const myCloud = await cloudinary.v2.uploader.upload(req.files[0].path, {
              folder: "/USERS",
            });
            // res.json("hello")

            const data = {
              // name: req.body.name,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              username: req.body.username,
              email: req.body.email,
              mob_no: req.body.mob_no,
              bio: req.body.bio,
              gender:req.body.gender, 
              about_us: req.body.about_us,
              address: req.body.address,
              latitude:req.body.latitude,
              longitude:req.body.longitude,
              images: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              },
            }
            User.findByIdAndUpdate(
              req.params.id,
              { $set: data },
              { new: true },
              async(err, docs) => {
                if (err) {
                  var response = {
                    status: 201,
                    message: err,
                  };
                  return res.status(201).send(response);
                } else {

                  if(req.body.category){
                    docs.category = [];
                    //console.log(req.body.category.length);
                    if(req.body.category.length == 24){
                      docs.category= ObjectId(req.body.category)
                      await docs.save();
                    }
                    //console.log(typeof req.body.subcategory);
                    else{
                    for(var b=0; b<req.body.category.length;b++){
                      //console.log(typeof req.body.subcategory[b]);
                      //console.log(docs.subcategory[b]);
                      docs.category[b] = ObjectId(req.body.category[b])
                      //docs.subcategory.push(req.body.subcategory[b])
                      await docs.save();
                    }}
                    
                    if(req.body.subcategory){
                      docs.subcategory = [];
                        if(req.body.subcategory.length == 24){
                          docs.subcategory= ObjectId(req.body.subcategory)
                          await docs.save();
                        }
                        //console.log(typeof req.body.subcategory);
                        else{
                        for(var b=0; b<req.body.subcategory.length;b++){
                          //console.log(typeof req.body.subcategory[b]);
                          //console.log(docs.subcategory[b]);
                          docs.subcategory[b] = ObjectId(req.body.subcategory[b])
                          //docs.subcategory.push(req.body.subcategory[b])
                          await docs.save();
                        }}
                   }
                   }
                  var response = {
                    status: 200,
                    message: "User Updated successfully",
                    data: docs,
                  };
                  return res.status(200).send(response);
                }
              }
            )


          } else {
            const data = {
              // name: req.body.name,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              username: req.body.username,
              email: req.body.email,
              mob_no: req.body.mob_no,
              bio: req.body.bio,
              gender:req.body.gender, 
              about_us: req.body.about_us,
              address: req.body.address,
              latitude:req.body.latitude,
              longitude:req.body.longitude,
            }
            User.findByIdAndUpdate(
              req.params.id,
              { $set: data },
              { new: true },
              async(err, docs) => {
                if (err) {
                  var response = {
                    status: 201,
                    message: err,
                  };
                  return res.status(201).send(response);
                } else {
                  //console.log(req.body);
                 if(req.body.category){
                  docs.category = [];
                  //console.log(req.body.category.length);
                  if(req.body.category.length == 24){
                    docs.category= ObjectId(req.body.category)
                    await docs.save();
                  }
                  //console.log(typeof req.body.subcategory);
                  else{
                  for(var b=0; b<req.body.category.length;b++){
                    //console.log(typeof req.body.subcategory[b]);
                    //console.log(docs.subcategory[b]);
                    docs.category[b] = ObjectId(req.body.category[b])
                    //docs.subcategory.push(req.body.subcategory[b])
                    await docs.save();
                  }}

                  if(req.body.subcategory){
                    docs.subcategory = [];
                      if(req.body.subcategory.length == 24){
                        docs.subcategory= ObjectId(req.body.subcategory)
                        await docs.save();
                      }
                      //console.log(typeof req.body.subcategory);
                      else{
                      for(var b=0; b<req.body.subcategory.length;b++){
                        //console.log(typeof req.body.subcategory[b]);
                        //console.log(docs.subcategory[b]);
                        docs.subcategory[b] = ObjectId(req.body.subcategory[b])
                        //docs.subcategory.push(req.body.subcategory[b])
                        await docs.save();
                      }}
                 }
                 }
                  var response = {
                    status: 200,
                    message: "User Updated successfully",
                    data: docs,
                  };
                  return res.status(200).send(response);
                }
              }
            )
          }
        } else {
          if(req.files.length>0){

      //       const myCloud = [];
      // for (var a = 0; a < req.files.length; a++) {
      //   const img = await cloudinary.v2.uploader.upload(req.files[a].path, {
      //     folder: "/USERS",
      //   });
      //   myCloud.push(img);
      // }

      const myCloud = await cloudinary.v2.uploader.upload(req.files[0].path, {
        folder: "/USERS",
      });

      const userdata = {
        name: req.body.name,
        contact_person: req.body.contact_person,
        title: req.body.title,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        // username: req.body.username,
        email: req.body.email,
        gender:req.body.gender, 
        // password: validation.hashPassword(req.body.password),
        // mob_no: req.body.mob_no,
        // bio: req.body.bio,
        // bio_dob: req.body.bio_dob,
        // role: req.body.role,
        // profile_type: req.body.profile_type,
        address: req.body.address,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        images: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        // images: {
        //   public_id: myCloud[0].public_id,
        //   url: myCloud[0].secure_url,
        // },
        // cimages: {
        //   public_id: myCloud[1].public_id,
        //   url: myCloud[1].secure_url,
        // },
      };
            User.findByIdAndUpdate(
              req.params.id,
              { $set: userdata },
              { new: true },
              async(err, docs) => {
                if (err) {
                  var response = {
                    status: 201,
                    message: err,
                  };
                  return res.status(201).send(response);
                } else {

                  if(req.body.category){
                    docs.category = [];
                    //console.log(req.body.category.length);
                    if(req.body.category.length == 24){
                      docs.category= ObjectId(req.body.category)
                      await docs.save();
                    }
                    //console.log(typeof req.body.subcategory);
                    else{
                    for(var b=0; b<req.body.category.length;b++){
                      //console.log(typeof req.body.subcategory[b]);
                      //console.log(docs.subcategory[b]);
                      docs.category[b] = ObjectId(req.body.category[b])
                      //docs.subcategory.push(req.body.subcategory[b])
                      await docs.save();
                    }}
                    
                    if(req.body.subcategory){
                      docs.subcategory = [];
                        if(req.body.subcategory.length == 24){
                          docs.subcategory= ObjectId(req.body.subcategory)
                          await docs.save();
                        }
                        //console.log(typeof req.body.subcategory);
                        else{
                        for(var b=0; b<req.body.subcategory.length;b++){
                          //console.log(typeof req.body.subcategory[b]);
                          //console.log(docs.subcategory[b]);
                          docs.subcategory[b] = ObjectId(req.body.subcategory[b])
                          //docs.subcategory.push(req.body.subcategory[b])
                          await docs.save();
                        }}
                   }
                   }

                  var response = {
                    status: 200,
                    message: "SuperMart Updated successfully",
                    data: docs,
                  };
                  return res.status(200).send(response);
                }
              }
            )
          } else {
            const data = {
              name: req.body.name,
              contact_person: req.body.contact_person,
              title: req.body.title,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              //username: req.body.username,
              email: req.body.email,
              gender:req.body.gender, 
              //mob_no: req.body.mob_no,
              //bio: req.body.bio, 
              //about_us: req.body.about_us,
              address: req.body.address,
              latitude:req.body.latitude,
              longitude:req.body.longitude,
            }
            User.findByIdAndUpdate(
              req.params.id,
              { $set: data },
              { new: true },
              async(err, docs) => {
                if (err) {
                  var response = {
                    status: 201,
                    message: err,
                  };
                  return res.status(201).send(response);
                } else {
                  //console.log(req.body);
                  if(req.body.category){
                    docs.category = [];
                    //console.log(req.body.category.length);
                    if(req.body.category.length == 24){
                      docs.category= ObjectId(req.body.category)
                      await docs.save();
                    }
                    //console.log(typeof req.body.subcategory);
                    else{
                    for(var b=0; b<req.body.category.length;b++){
                      //console.log(typeof req.body.subcategory[b]);
                      //console.log(docs.subcategory[b]);
                      docs.category[b] = ObjectId(req.body.category[b])
                      //docs.subcategory.push(req.body.subcategory[b])
                      await docs.save();
                    }}
                    
                    if(req.body.subcategory){
                      docs.subcategory = [];
                        if(req.body.subcategory.length == 24){
                          docs.subcategory= ObjectId(req.body.subcategory)
                          await docs.save();
                        }
                        //console.log(typeof req.body.subcategory);
                        else{
                        for(var b=0; b<req.body.subcategory.length;b++){
                          //console.log(typeof req.body.subcategory[b]);
                          //console.log(docs.subcategory[b]);
                          docs.subcategory[b] = ObjectId(req.body.subcategory[b])
                          //docs.subcategory.push(req.body.subcategory[b])
                          await docs.save();
                        }}
                   }
                   }
                   
                  var response = {
                    status: 200,
                    message: "Supermart Updated successfully",
                    data: docs,
                  };
                  return res.status(200).send(response);
                }
              }
            )
          }
        }
        
      } else {
        var response = {
          status: 201,
          message: "No User Found",
        };
        return res.status(201).send(response);
      }
    } else {
      var response = {
        status: 201,
        message: "Enter User id",
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

async function UpdatePassword(req, res) {
  try {
    if (req.params.id != "") {
      const user = await User.findById(req.params.id)

      if (user) {
        const {old_password, new_password, repeat_password} = req.body;

        if (validation.comparePassword(user.password, old_password)) {
          if(new_password == repeat_password){
            
            const data = {
              password:validation.hashPassword(new_password),
            };
             User.findByIdAndUpdate(
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
                    message: "Password Updated successfully",
                    data: docs,
                  };
                  return res.status(200).send(response);
                }
              }
            );
          } else {
            var response = {
              status: 201,
              message: "repeat password not matched",
            };
            return res.status(201).send(response);
          }
        } else {
          var response = {
            status: 201,
            message: "Incorrect old password",
          };
          return res.status(201).send(response);
        }
  
      } else {
        var response = {
          status: 201,
          message: "Password Not Found",
        };
        return res.status(201).send(response);
      }

    } else {
      var response = {
        status: 201,
        message: "Please Enter User ID",
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

async function Logout(req, res) {
  try {
    // res.clearCookie('refreshToken')
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      // .cookie("accessToken", null, { expires: new Date(Date.now()), httpOnly: true })
      // .cookie("refreshToken", null, { expires: new Date(Date.now()), httpOnly: true })
      // .cookie("authSession", null, { expires: new Date(Date.now()), httpOnly: true })
      // .cookie("refreshTokenID", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    console.log("error", error);
    response = {
      status: 201,
      message: "Operation was not successful",
    };
    return res.status(201).send(response);
  }
}

async function Following(req, res) {
  try {
    const data = jwt_decode(req.headers.token);
    const user_id = data.user_id;
    // console.log(data);

    const user = await User.findById(req.params.followId);

    if (!user) {
      var response = {
        status: 201,
        message: "No User Found",
      };
      return res.status(201).send(response);
    }

    const users = await User.findById(user_id);

    if (user) {
      var isfollow = false;

      // console.log(users.following.length);
      for (var a = 0; a < users.following.length; a++) {
        var following = users.following[a];

        if (following.toString() == user._id.toString()) {
          isfollow = true;
          break;
        }
      }
      // console.log(isfollow);

      if (isfollow) {
        // remove into follower list
        user.followers.pull(user_id);
        await user.save();
        // remove into following list
        users.following.pull(user._id);
        await users.save();

        var response = {
          status: 200,
          message: "User has been UnFollowed",
          data: users,
        };
        return res.status(200).send(response);
      } else {
        // add into follower list
        user.followers.push(user_id);
        await user.save();
        // add into following list
        users.following.push(user._id);
        await users.save();

        var response = {
          status: 200,
          message: "User has been Followed.",
          data: users,
        };
        return res.status(200).send(response);
      }
    } else {
      var response = {
        status: 201,
        message: "No Post Found",
      };
      return res.status(201).send(response);
    }
  } catch (error) {
    console.log("error", error);
    response = {
      status: 201,
      message: "Operation was not successful",
    };
    return res.status(201).send(response);
  }
}

async function ResetPassword(req, res) {
  try {
    const { email, username } = req.body;
    if (email == "" || username == "") {
      var response = {
        status: 201,
        message: "email or username can not be empty !!",
      };
      return res.status(201).send(response);
    }

    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    var datas = await User.findOne(email ? { email } : { username });

    if (!datas) {
      var response = {
        status: 201,
        message: "User Not Found !!",
      };
      return res.status(201).send(response);
    }

    const data = await Sendemail.sendEmail(
      email,
      datas.username,
      "Password reset",
      result
    );
    //console.log(data);
    if (data.error) {
      var response = {
        status: 201,
        message: "Password Sending Failed !!!!",
        error: data.error,
      };
      return res.status(201).send(response);
    } else {
      datas.password = validation.hashPassword(result);
      await datas.save();
      // console.log(result);
      var response = {
        status: 200,
        message: "Password has been successfully send to your EmailId.",
        messageId: data.messageId,
        password: result,
      };
      return res.status(200).send(response);
    }
  } catch (error) {
    console.log("error", error);
    response = {
      status: 201,
      message: "Operation was not successful",
    };
    return res.status(201).send(response);
  }
}

module.exports = {
  Usersignup,
  Usersignin,
  Logout,
  GetAllUser,
  GetUser,
  DeleteUser,
  UpdateUser,
  Following,
  ResetPassword,
  UpdatePassword,
};



  
