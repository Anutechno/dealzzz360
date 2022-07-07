const mongoose = require('mongoose');


const StorySchema = new mongoose.Schema({
    caption: {
      type: String,
      default: '',
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
        time: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    timestamp: {
        type: Date,
        default: new Date(),
      },
},
{
  timestamps:true,
}
);

module.exports = mongoose.model("Story",StorySchema);
