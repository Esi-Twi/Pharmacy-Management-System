const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()


const authRouter = require('./routes/authRouter')
const drugRouter = require('./routes/drugRouter')
const staffRouter = require('./routes/staffRouter')
const salesRouter = require('./routes/salesRouter')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/drugs', drugRouter)
app.use('/staff', staffRouter)
app.use('/sales', salesRouter)

app.get('/', (req,res) => {
    res.send('this is the dunon pharmacy server')
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected✅ ....'))
    .catch((error) => console.log(error))

app.listen(process.env.PORT, () => {
    console.log('Server is listening to port 3000...');
})


