const { string } = require('joi')
const mongoose = require('mongoose')

const SalesItemSchema = new mongoose.Schema(
    {
        drugId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drugs",
            required: true
        },
        drugName : {
            type: String, 
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        subtotal: {
            type: Number, 
            required: true
        }
    }, {
        _id: false
    }
)

const salesSchema = new mongoose.Schema({
    pharmacistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
     pharmacistName: {
        type: String,
        required: true
    },
    items: [SalesItemSchema],
    totalPrice: {
        type: Number,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        default: "Cash"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Sales", salesSchema)