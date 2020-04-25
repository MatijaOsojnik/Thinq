require('dotenv').config();

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use(morgan("combined"))
app.use(cors())

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected")).catch(err => handleError(err));
mongoose.set('debug', true);

const posts = require('./routes/post')
const users = require('./routes/user')

app.use('/posts', posts)
app.use('/users', users)

app.post('/register', (req, res) => {
    res.send(`Hello ${req.body.email}! You have successfully registered `)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
