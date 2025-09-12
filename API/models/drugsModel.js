const { required } = require('joi')
const mongoose = require('mongoose')
const { drugCategories, drugsForm }  = require('../databaseExtras/lists')


const drugSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Name of drug is required'], 
        trim: true
    }, 
    category: {
        type: String, 
        enum: {
            values:  drugCategories, 
            messages: '{VALUE} is not supported'
        },
        required: [true, 'Drug category is required'], 
    },
    form: {
        type: String, 
        enum: {
            values: drugsForm,
            messages: '{VALUE} is not supported'
        }
    }, 
    batch_number: {
        type: String, 
        required: [true, 'Batch number is required'], 
        trim: true
    },
    expiry_date: {
        type: Date, 
        required: [true, 'Expiry date is required']
    }, 
     manufacture_date: {
        type: Date, 
        required: [true, 'Manufacture date is required']
    }, 
    quantity: {
        type: Number, 
        required: [true, 'Quantity of drug is required'], 
    }, 
    purchase_price: {
        type: Number, 
        required: [true, 'Purchase Price is required']
    }, 
    selling_price: {
        type: Number, 
        required: [true, 'Selling Price is required']
    }, 
    deleted: {
        type: Boolean, 
        default: false
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Drugs', drugSchema)



