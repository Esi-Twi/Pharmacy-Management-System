const mongoose = require('mongoose')

const drugsSoldSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    number: {
        type: Number, 
        required: true
    }
})


const reportingSchema = new mongoose.Schema({
    totalRevenue: {
        type: Number,
        required: true  
    }, 
    transactions: { type: Number }, 
    topDrugsSold: [drugsSoldSchema], 
    lowStock: [drugsSoldSchema], 

}, {
    timestamps: true
})

module.exports = mongoose.model('Report', reportingSchema)
