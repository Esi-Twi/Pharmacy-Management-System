const mongoose = require('mongoose')
const Drug = require("./models/drugsModel")

const drugs = require('./databaseExtras/drugs.json')

const start = async() => {
    try {
        await mongoose.connect(process.env.MONG0_URI)
            .then(() => console.log('populated db connected'))
            .catch(error => console.log(error))

            await Drug.create(drugs)
            console.log("Success ....");
            
            process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()