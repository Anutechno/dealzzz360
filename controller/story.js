const User = require("../models/User");
const jwt_decode = require("jwt-decode");
const Story = require("../models/Story");
const cloudinary = require("cloudinary");

async function AddStory(req,res){
    try{
        const data = jwt_decode(req.headers.token);
        const user_id = data.user_id;
    
        let user = await User.findById(user_id)

        if(!user){
            var response = {
                status: 201,
                message: "No User Found Login first",
              };
            return res.status(201).send(response);
        }


        const { caption} = req.body;

        //console.log(req.files);
        //console.log(typeof images);


        const myCloud =await cloudinary.v2.uploader.upload(req.files[0].path, {
            folder: "/STORY",
        });
        //console.log(myCloud);
            //console.log(myCloud);
            const newPostData = {
                caption: caption,
                images: {
                  public_id: myCloud.public_id,
                  url: myCloud.secure_url,
                },
                user: user_id,
            };

            //console.log("hello",newPostData);
            const story = await Story.create(newPostData);
            user.story.push(story._id);
            await user.save();

            var response = {
                status: 200,
                data: story,
                message: "Story Added Successfully",
            };
            return res.status(200).send(response);

    } catch (error) {
        var response = {
          errors:error,
          status: 400,
          message: "Operation was not successful",
        };
    
        return res.status(400).send(response);
    }
}


async function GetAllStory(req,res){
    try{

        const story = await Story.find(req.query).populate({path:"user",select: ['email','username','images']})
                                                 .sort({createdAt: -1})
        
        if(story){
            var response = {
                status: 200,
                data: story,
                message: 'successfull',
              };
              return res.status(200).send(response);
        } else{
            var response = {
                status: 201,
                message: "No Story Found",
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


async function GetStory(req,res){
    try{
        const data = jwt_decode(req.headers.token);
        const user_id = data.user_id;
        //console.log(user_id);

        const story = await Story.findById(req.params.id).populate({path:"user",select: ['email','username','images']});
        
        const user = await User.findById(story.user._id);

        //console.log(user._id.toString());
        if(user_id != user._id.toString()){
            if(story.seen_by.length < 1){
              story.seen_by.push(user_id)
              story.save();
            } else {
            var count=0;
            story.seen_by.forEach((data)=>{
              //console.log(user_id);
              //console.log(data.toString());
                  if(user_id == data.toString()){
                    count =1;
                  }
            })
            if(count ==0){
              story.seen_by.push(user_id)
              story.save();
            }
          }
        }
        if(story){
            var response = {
                status: 200,
                message: 'successfull',
                data: story,
              };
              return res.status(200).send(response);
        } else{
            var response = {
                status: 201,
                message: "No Story Found",
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


async function DeleteStory(req,res){
    try{

        const story = await Story.findById(req.params.id)
        
        if(story){
            //await Post.remove()
            Story.findByIdAndDelete(req.params.id,(err, docs)=> {
                if (err) {
                  var response = {
                    status: 201,
                    message: err,
                    messages: "Story delete failed",
                  };
                  return res.status(201).send(response);
                } else {
                    var response = {
                        status: 200,
                        message:"Story removed successfully",
                        data:docs,
                    };
                  return res.status(200).send(response);
                }
              });
        } else{
            var response = {
                status: 201,
                message: "No Story Found",
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


module.exports = {
    AddStory,
    GetAllStory,
    GetStory,
    DeleteStory,
}


function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();

  month = month.length > 1 ? month : "0" + month;
  let day = date.getDate().toString();

  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}