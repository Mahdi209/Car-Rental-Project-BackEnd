const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: "ChatRoom",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const message = model("Message", messageSchema);

module.exports = message;
