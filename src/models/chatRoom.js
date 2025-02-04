const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const chatRoomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    status: {
        type: Boolean,
        default: false,
    },

    requiredCar: {
        type: Schema.Types.ObjectId,
        ref: "CarDetails",
    }
    ,
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },


});

const chatRoom = model("ChatRoom", chatRoomSchema);

module.exports = chatRoom;
