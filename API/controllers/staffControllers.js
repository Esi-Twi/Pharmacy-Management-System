const Staff = require('../models/userModel')
const { generateVerificationToken } = require('../utils/generateVerificationToken')


exports.getAllStaffs = async (req, res) => {
    const staffs = await Staff.find({ deleted: false })
    res.status(200).json({ success: true, no: staffs.length, staffs })
}

//not done with the processs
exports.addStaff = async (req, res) => {
    try {
        const { email, role } = req.body

        if (!email || !role) {
            res.status(400).json({ success: false, msg: "Email and password is required" })
        }

        const existingStaff = await Staff.findOne({ email, deleted: false })
        if (existingStaff) {
            return res.status(400).json({ success: false, msg: 'Staff already exists' })
        }

        const existingDeletedStaff = await Staff.findOne({ email, deleted: true })
        if (existingDeletedStaff) {
            const id = existingDeletedStaff._id
            const verificationToken = generateVerificationToken()

            const reAdded = await Staff.findOneAndReplace(
                id, {
                email,
                role,
                verificationToken,
                verificationTokenValidation: Date.now() + 24 * 60 * 60 * 1000 //24hrs
            }, { new: true, runValidators: true }
            )
            return res.status(201).json({ success: true, msg: 'Staff created successfully!!!', reAdded })
        }


        const verificationToken = generateVerificationToken()
        const newStaff = Staff.create({
            email,
            role,
            verificationToken,
            verificationTokenValidation: Date.now() + 24 * 60 * 60 * 1000 //24hrs
        })
        return res.status(201).json({ success: true, msg: 'Staff created successfully!!' })

    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

exports.updateStaffRole = async (req, res) => {
    const { id } = req.params
    try {
        const { role } = req.body
        const updated = await Staff.findByIdAndUpdate(
            id, { role }, { new: true, runValidators: true }
        )
        res.status(200).json({ success: true, msg: "Staff role updated successfully!!", updated });

    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

exports.deleteStaff = async (req, res) => {
    const { id } = req.params
    try {
        const staff = await Staff.findByIdAndUpdate(
            id, { deleted: true }, { new: true }
        )

        res.status(200).json({ success: true, msg: "Staff deleted successfully!!", staff })
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

exports.updateProfile = async (req, res) => {
    const { id } = req.params

    try {
        const { name, phone, location } = req.body

        if (!name) {
            return res.status(400).json({ successs: false, msg: 'Name is required!' })
        }

        const staff = await Staff.findByIdAndUpdate(
            id, req.body, { new: true }
        )
        return res.status(200).json({ success: true, msg: 'Profile updated successfully!!', staff })

    } catch (error) {
        res.status(400).json({ success: false, error })
        console.log(error);

    }
}

exports.getStaff = async (req, res) => {
    const { id } = req.params
    try {
        const staff = await Staff.findById(id)

        res.json({ staff })

    } catch (error) {
        console.log('Error in get data route' + error);
        return res.status(500).json({ success: false, msg: 'Something went wrong', error: error.message })
    }
}

exports.updateStaffStatus = async (req, res) => {
    const { id } = req.params
    try {
        const { status } = req.body
        const updated = await Staff.findByIdAndUpdate(
            id, { status }, { new: true, runValidators: true }
        )
        res.status(200).json({ success: true, msg: "update staff role", updated });

    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}