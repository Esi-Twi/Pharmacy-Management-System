const Drug = require('../models/drugsModel')

exports.getAllDrugs = async (req, res) => {
    const drugs = await  Drug.find({deleted: false})
    res.status(200).json({success: true, no: drugs.length ,drugs})
}

exports.addNewDrug = async (req, res) => {
    const { name } = req.body
    try {
        const existingDrug = await Drug.findOne({ name, deleted: false })
        if(existingDrug) {
            return res.status(400).json({ success: false, msg: 'Drug already exists!!' })
        }

        const existingDeletedDrug = await Drug.findOne({ name, deleted: true })
        if(existingDeletedDrug) {
            const id = existingDeletedDrug._id
            const reAdded = await Drug.findOneAndReplace(
                id, req.body, {new: true, runValidators: true}
            )
           return res.status(201).json({success: true, msg: 'Drug is created successfully!!!', reAdded})
        }

        const drug = await Drug.create(req.body)
        res.status(200).json({ success: true, msg: "Drug is created successfully", drug })

    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}


exports.editDrug = async (req, res) => {
    try {
        const {id} = req.params
        const drug = await Drug.findByIdAndUpdate(
            id, req.body, {
                new: true, 
                runValidators: true
            }
        )

        // if(!drug) {
        //     res.status(400).json({success: false, msg: 'Drug cannot be found'})
        // }

        res.status(200).json({success: true, msg: 'Drug is updated successfully!!', drug})

    } catch (error) {
        res.status(400).json({success: false, msg: error})
    }
}


exports.deleteDrug = async (req, res) => {
    try {
        const  {id} = req.params
        const drug = await Drug.findByIdAndUpdate(
            id, {deleted: true}, {new: true}
        )
        
        res.status(201).json({success: true, msg: 'Drug deleted successfully!!', drug})

    } catch (error) {
        res.status(400).json({success: false, msg: error})   
    }
}
