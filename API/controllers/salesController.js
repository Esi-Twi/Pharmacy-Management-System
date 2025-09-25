const Sales = require('../models/salesModel')
const Drugs = require('../models/drugsModel')

exports.createSales = async (req, res) => {
    const { id } = req.params
    try {
        const drugsWithQuantity = req.body
        if (!drugsWithQuantity) {
            return res.status(200).json({ success: false, msg: 'Please select drugs to sell' })
        }

        const salesItems = []
        let totalPrice = 0
        for (item in drugsWithQuantity) {
            const drugId = drugsWithQuantity[item].id
            const drug = await Drugs.findById(drugId)
            const subtotal = drug.selling_price * drugsWithQuantity[item].quantity
            const selectedQuantity = drugsWithQuantity[item].quantity

            totalPrice += subtotal
            salesItems.push({
                drugId,
                drugName: drug.name,
                quantity: selectedQuantity,
                subtotal
            })

            //reducing quantities of drugs left
            await Drugs.findByIdAndUpdate(drugId, {
                quantity: drug.quantity - selectedQuantity
            }, { new: true, runValidators: true })
        }

        const newSale = await Sales.create({
            pharmacistId: id,
            items: salesItems,
            totalPrice
        })
        newSale.save()

        return res.status(201).json({ success: true, msg: "Sales created successfully!!", newSale })

    } catch (error) {
        console.error('Error fetching drug details:', error)
        return res.status(500).json({ success: false, msg: 'Internal server error', error })
    }
}

exports.getAllSales = async (req, res) => {
    const sales = await Sales.find({})
    res.status(200).json({ success: true, msg: "All sales", no: sales.length, sales })
}

exports.getTodaysSales = async (req, res) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todaysSales = await Sales.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    res.status(200).json({success: true, no: todaysSales.length, todaysSales })
}

