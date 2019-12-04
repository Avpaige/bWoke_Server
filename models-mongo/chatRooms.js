var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ChatRoomSchema = new Schema({
  room: {
    type: String,
    required: true
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Chat"
  }]
});

var chatRoom = mongoose.model("ChatRoom", ChatRoomSchema);

module.exports = chatRoom;
