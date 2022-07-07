var Post = require("../models/Post");
const fs = require('fs');
const multer  = require('multer')
const upload = multer({ dest: './uploads/Post' })
const jwt_decode = require("jwt-decode");
var User = require("../models/User");
const cloudinary = require("cloudinary");


// Using Multer
// async function Addpost(req,res){
//     try{
//         const data = jwt_decode(req.headers.token);
//         const user_id = data.user_id;
//         // console.log(data);
        
//         let user = await User.findById(user_id)
//         // const file = [];
//         const { type, caption} = req.body;
//         const files = req.files

//         //console.log(req.files);
//         // convert images into base64 encoding
//         let imgArray = files.map((file) => {
//              let img = fs.readFileSync(file.path)
//              return encode_image = img.toString('base64')
//         })

//         //console.log(imgArray);
//         let result = imgArray.map(async(src, index) => {

//             // create object to store data in the collection
//             let data = {
//                 filename : files[index].originalname,
//                 contentType : files[index].mimetype,
//                 // imageBase64 : src,
//                 userId : user_id,
//                 caption : caption,
//                 type: type,
//             }

//             const check =await Post.findOne({filename:data.filename});
//             //console.log(check);
//             if(check){
//                 var response = {
//                     status: 201,
//                     message: `Duplicate Image.. Image Already Uploaded`,
//                     data: check,
//                 };
//                 return res.status(201).send(response);
//             }
    
//             let postUpload = new Post(data);
//             // mconsole.log(postUpload);
//             return await postUpload
//                     .save()
//                     .then(() => {

//                         var response = {
//                             status: 200,
//                             message: `${files[index].originalname} Uploaded Successfully...!`,
//                             data: postUpload,
//                         };
//                         return res.status(200).send(response);
//                         // return {data:postUpload, msg : `${files[index].originalname} Uploaded Successfully...!`}
//                     })
//                     .catch(error =>{
//                         console.log(error);
//                         if(error){
//                             if(error.name === 'MongoError' && error.code === 11000){
//                                 var response = {
//                                     status: 201,
//                                     error: `Duplicate ${files[index].originalname}. File Already exists! `,
//                                 };
//                                 return res.status(201).send(response);

//                                 // return Promise.reject({ error : `Duplicate ${files[index].originalname}. File Already exists! `});
//                             }
//                             return Promise.reject({ error : error.message || `Cannot Upload ${files[index].originalname} Something Missing!`})
//                         }
//                     })
//         });
    
//         Promise.all(result)
//             .then( msg => {
//                 //res.json(msg);
//                 // res.redirect('/')
//             })
//             .catch(err =>{
//                 res.json(err);
//             })
        
// } catch (error) {
//     var response = {
//       errors:error,
//       status: 400,
//       message: "Operation was not successful",
//     };

//     return res.status(400).send(response);
// }

// }



// using Cloudinary
async function Addpost(req,res){
    try{
        const data = jwt_decode(req.headers.token);
        const user_id = data.user_id;
        // console.log(data);
        
        let user = await User.findById(user_id)
        if(!user){
            var response = {
                status: 201,
                message: "No User Found Login first",
              };
            return res.status(201).send(response);
        }

        const {type, caption} = req.body;

        //console.log(req.files.length);

        //const myCloud =await cloudinary.v2.uploader.upload(req.files[0].path, {

        // Video file
        // const myCloud =await cloudinary.v2.uploader.upload_large(req.files[0].path, {
        //     resource_type: "auto"});
        if(req.files.length>1){
            var img = [];
            for(var b=0;b<req.files.length;b++){
                //console.log(req.files[b]);
                const myCloud =await cloudinary.v2.uploader.upload(req.files[b].path,
                    {folder: "/POSTS"});

                var datas = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
                img.push(datas);
            }

            const newPostData = {
                caption: caption,
                type:type,
                images: img,
                user: user_id,
            };
            const post = await Post.create(newPostData);
        
            var response = {
                status: 200,
                data: post,
                message: "Post Added Successfully",
            };
            return res.status(200).send(newPostData);
        }else{
        const myCloud =await cloudinary.v2.uploader.upload(req.files[0].path,
            {folder: "/POSTS"});

            // console.log(myCloud);
            const newPostData = {
                caption: caption,
                type:type,
                images: {
                  public_id: myCloud.public_id,
                  url: myCloud.secure_url,
                },
                user: user_id,
            };
            const post = await Post(newPostData);
            await post.save();

            var response = {
                status: 200,
                data: post,
                message: "Post Added Successfully",
            };
            return res.status(200).send(newPostData);
        }
} catch (error) {
    var response = {
      errors:error,
      status: 400,
      message: "Operation was not successful",
    };

    return res.status(400).send(response);
}

}


async function GetAllPost(req,res){
    try{
        const post = await Post.find(req.query).populate({path:"likes",select: ['email','username']})
                                               .populate({path:"comments.user",select: ['email','username']})
                                               .populate({path:"user",select: ['email','username','images']})
                                               .sort({createdAt: -1})

        if(post){
            var response = {
                status: 200,
                data: post,
                message: 'successfull',
              };
              return res.status(200).send(response);
        } else{
            var response = {
                status: 201,
                message: "No Post Found",
              };
            return res.status(201).send(response);
        }
    } catch (error) {
        var response = {
          errors:error,
          status: 400,
          message: "Operation was not successful",
        };
    
        return res.status(400).send(response);
    }
}


async function GetPost(req,res){
    try{
        const post = await Post.findById(req.params.id).populate({path:"likes",select: ['email','username']})
                                                       .populate({path:"comments.user",select: ['email','username']})
                                                       .populate({path:"user",select: ['email','username','images']})
        if(post){
            var response = {
                status: 200,
                data: post,
                message: 'successfull',
              };
              return res.status(200).send(response);
        } else{
            var response = {
                status: 201,
                message: "No Post Found",
              };
            return res.status(201).send(response);
        }
    } catch (error) {
        var response = {
          errors:error,
          status: 400,
          message: "Operation was not successful",
        };
    
        return res.status(400).send(response);
    }
}


async function DeletePost(req,res){
    try{

        const post = await Post.findById(req.params.id)
        
        if(post){
            //await Post.remove()
            Post.findByIdAndDelete(req.params.id,(err, docs)=> {
                if (err) {
                  var response = {
                    status: 201,
                    message: err,
                    messages: "Post delete failed",
                  };
                  return res.status(201).send(response);
                } else {
                    var response = {
                        status: 200,
                        message:"Post removed successfully",
                        data:docs,
                    };
                  return res.status(200).send(response);
                }
              });
        } else{
            var response = {
                status: 201,
                message: "No Post Found",
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


async function UpdatePost(req,res){
    try{
        if(req.params.id != ""){

            const {type, caption} = req.body;

            const post = await Post.findById(req.params.id)
        
            if(post){
                const data = {
                    caption: req.body.caption,
                }
                Post.findByIdAndUpdate(req.params.id,{$set:data},{new:true},(err, docs)=> {
                    if (err) {
                      var response = {
                        status: 201,
                        message: err,
                      };
                      return res.status(201).send(response);
                    } else {
                        var response = {
                            status: 200,
                            message:"Post Updated successfully",
                            data:docs,
                          };
                          return res.status(200).send(response);
                    }
                  });
            } else{
                var response = {
                    status: 201,
                    message: "No Post Found",
                  };
                return res.status(201).send(response);
            }
        } else {
            var response = {
                status: 201,
                message: "Enter Post id",
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


// Post Likes
async function Likes(req,res){
    try{
        const data = jwt_decode(req.headers.token);
        const user_id = data.user_id;
        // console.log(data);

        const post = await Post.findById(req.params.id);

        if(post){

            var isLiked = false;

            // console.log(post.likes.length);
            for (var a = 0; a < post.likes.length; a++) {
                var liker = post.likes[a];

                if (liker == user_id) {
                    isLiked = true;
                    break;
                }
            }
            // console.log(isLiked);
            if(isLiked){
                post.likes.pull(user_id)
                await post.save();

                var response = {
                    status: 200,
                    message: 'Post has been Disliked.',
                    data: post,
                  };
                  return res.status(200).send(response);
            }
            else {
                post.likes.push(user_id)
                await post.save();
                
                var response = {
                    status: 200,
                    message: 'Post has been liked.', 
                    data: post,
                  };
                  return res.status(200).send(response);
            }
            
        } else{
            var response = {
                status: 201,
                message: "No Post Found",
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


// Post Comments
async function Comments(req,res){
    try{
        const data = jwt_decode(req.headers.token);
        const user_id = data.user_id;
        // console.log(data);

        const {comment} = req.body;

        const post = await Post.findById(req.params.id);

        if(post){
            var datas ={
                comment: comment,
                user: user_id,
            }

            post.comments.push(datas);
            await post.save();

            var response = {
                    status: 200,
                    message: 'Post Commented', 
                    data: post,
                };
            return res.status(200).send(response);
        } else{
            var response = {
                status: 201,
                message: "No Post Found",
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


async function DeleteComments(req,res){
    try{
        const {comment_id} = req.body;

        const post = await Post.findById(req.params.id)

        if(post.comments.length>0){
            post.comments.forEach(async(data)=>{
                // console.log(data._id);
                if(comment_id == data._id.toString())
                {
                    //post.comments.pull(datas);
                    post.comments.pull(data);
                    await post.save();
                    var response = 
                        {
                              status: 200,
                              message:"Comment removed successfully",
                              comments : data,
                              data:post,
                        };
                    return res.status(200).send(response);
                }
            })
        } else {
            var response = {
                    status: 201,
                    message: "No Comments Found",
                  };
            return res.status(201).send(response);
        }

       // console.log(post.comments[0]._id.toString());
       // console.log(comment_id);
        
        
       
        // if(post){
        //     //await Post.remove()
        //     Post.findByIdAndDelete(req.params.id,(err, docs)=> {
        //         if (err) {
        //           var response = {
        //             status: 201,
        //             message: err,
        //             messages: "Comment delete failed",
        //           };
        //           return res.status(201).send(response);
        //         } else {
        //             var response = {
        //                 status: 200,
        //                 message:"Comment removed successfully",
        //                 data:docs,
        //             };
        //           return res.status(200).send(response);
        //         }
        //       });
        // } else{
        //     var response = {
        //         status: 201,
        //         message: "No Comment Found",
        //       };
        //     return res.status(201).send(response);
        // }

    } catch (error) {
        response = {
          errors:error,
          status: 400,
          message: "Operation was not successful",
        };
    
        return res.status(400).send(response);
    }
}


//Only Following users Post
async function FollowingPost(req,res){
    try{
        const todayDate = getFormattedDate();
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        
        response = {
            status: 200,
            message: 'Post Commented', 
            time: time,
            todayDate: todayDate,
        };
        return res.status(400).send(response);
        
    } catch (error) {
        response = {
          errors:error,
          status: 400,
          message: "Operation was not successful",
        };
        return res.status(400).send(response);
    }
}


async function GetPostImage(req,res){
    try{
        res.download("./uploads/Post/"+req.params.file);
    } catch (error) {
        response = {
          errors:error,
          status: 400,
          message: "Operation was not successful",
        };
        return res.status(400).send(response);
    }
}



module.exports ={
    Addpost,
    GetAllPost,
    GetPost,
    DeletePost,
    UpdatePost,
    Likes,
    Comments,
    DeleteComments,
    FollowingPost,
    GetPostImage,
};


function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
}