const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types,
        ref:"User"
    },
},
{
    timestamps:true,
}
)


module.exports = mongoose.model("Post",postSchema);

