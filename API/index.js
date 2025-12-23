const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()


const authRouter = require('./routes/authRouter')
const drugRouter = require('./routes/drugRouter')
const staffRouter = require('./routes/staffRouter')
const salesRouter = require('./routes/salesRouter')
const analyticsRouter = require('./routes/analyticsRouter')

app.use(cors({
    // origin: "http://localhost:5173",
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/drugs', drugRouter)
app.use('/staff', staffRouter)
app.use('/sales', salesRouter)
app.use('/api/analytics', analyticsRouter)

app.get('/', (req,res) => {
    res.send('this is the dunon pharmacy server')
})

const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected✅ ....'))
    .catch((error) => console.log(error))

app.listen(port, () => {
    console.log('Server is listening to port 3000...');
})


