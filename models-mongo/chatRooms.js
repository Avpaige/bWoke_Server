var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
  room: {
    type: String,
    required: true
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Chat"
  }]
});

var chatRoom = mongoose.model("chatRoom", ChatSchema);

module.exports = chatRoom;
