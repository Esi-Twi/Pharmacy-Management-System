const Staff = require('../models/userModel')
const { generateVerificationToken } = require('../utils/generateVerificationToken')

//     PUT /api/admin/staff/:id → update staff role
//     PATCH /api/admin/staff/:id/status → activate/deactivate staff

exports.getAllStaffs = async (req, res) => {
    const staffs = await Staff.find({ deleted: false }) //test this again
    res.status(200).json({ success: true, no: staffs.length, staffs })
}


exports.addStaff = async (req, res) => {
    try {
        const { email, role } = req.body

        const existingStaff = await Staff.find({ email })
        if (existingStaff) {
            res.status(400).json({ success: false, msg: 'Staff already exists' })
        }

        const verificationToken = generateVerificationToken()

        const staff = Staff.create({
            email,
            role,
            verificationToken,
            verificationTokenValidation: Date.now() + 24 * 60 * 60 * 1000 //24hrs
        })

        res.status(201).json({ success: false, msg: 'Staff created successfully!!', staff })

    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

exports.updateStaffRole = async (req, res) => {
    try {
        const { id } = req.params
        res.json({msg:"update staff role", id});
        

        //admin only updates role and status 

    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

exports.deleteStaff = async (req, res) => {
    const { id } = req.params

    const staff = await Staff.findByIdAndUpdate(
        id, { deleted: true }, { new: true }
    )

    res.status(200).json({ success: true, msg: "Staff deleted successfully!!", staff })
}

exports.updateProfile = async (req, res) => {
    const { id } = req.params

    try {
        const {name, phone, location } = req.body

        if (name) {
            if (!name || !phone || !location) {
                return res.status(400).json({ successs: false, msg: 'Name, phone and location is required!' })
            }

            const staff = await Staff.findByIdAndUpdate(
                id, req.body, { new: true }
            )
            return res.status(200).json({success: true, msg: 'Profile updated successfully!!', staff})
        }

    } catch (error) {
        res.status(400).json({ success: false, error })
        console.log(error);
        
    }
}
