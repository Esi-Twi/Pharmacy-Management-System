const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)

app.get('/', (req,res) => {
    res.send('this is the dunon pharmacy server')
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected✅ ....'))
    .catch((error) => console.log(error))

app.listen(process.env.PORT, () => {
    console.log('Server is listening to port 3000...');
})


