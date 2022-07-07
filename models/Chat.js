const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    message:{
        type:String,
    },
    sender:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    receiver:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    type:{
        type:String,
        default:"unseen"
    },
    time:{
        type:String,
    },
    date:{
        type:String,
    },
},
{
    timestamps:true,
})

module.exports  = mongoose.model('Chat', ChatSchema);