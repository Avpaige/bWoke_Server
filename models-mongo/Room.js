var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ChatRoomSchema = new Schema({
  room: {
    type: String,
    allowNull: false,
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Chat"
  }]
});

var room = mongoose.model("room", ChatRoomSchema);

module.exports = room;
