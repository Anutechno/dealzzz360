const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
        // required: true,
    },
    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],

    // Multer
    // filename:{
    //     type : String,
    //     //unique : true,
    // },
    // contentType:{
    //     type : String,
    // },
    // imageBase64 : {
    //     type : String,
    //     //required: true
    // },

    type:{
        type:String,
    },
    caption:{
        type:String,
    },
    createdAt:{
        type: Date,
        default: new Date(),
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    comments:[{
        comment:{
            type:String,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        createdAt:{
            type: Date,
            default: new Date(),
        },
    }],
},
{
    timestamps:true,
}
)


module.exports = mongoose.model("Post",postSchema);

