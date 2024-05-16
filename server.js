const express = require('express')
require('dotenv').config()

const mongoose = require("mongoose")
const port = 3000
const Fries = require('./models/fries')
const fries = require('./models/fries')

const app = express()


mongoose.connect(process.env.MONGODB_URI)



app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/fries/:friesId', async (req,res) => {
// i need to get the actual fries
    const fries = await Fries.findById(req.params.friesId)
// send them back
    res.send(fries)
})

app.get('/fries', async (req,res) => {
    // i need to get the actual fries
        const fries = await Fries.find()
    // send them back
    res.render('fries.ejs', {
        fries: fries,
      })
    })
// tell express to expect some json in the request 

app.use(express.json())

//posting a new fry 
app.post('/fries', async (req, res) => {
// 1) get the fry  from our request
console.log(req.body)
// 2) create the fry using mongoose
const fries = await Fries.create(req.body)
// 3) send back the new fry to the user 
res.send(fries)
})

app.delete('/fries', async (req, res) => {

    const fries = await Fries.deleteOne(req.body)

    res.send(fries)
})

app.put("/fries/:friesId", async (req, res) => {

    const fries = await Fries.findById(req.params.friesId)

    let updateFries = await Fries.updateOne(fries, req.body)

    res.send(updateFries)
})

app.put("/fries", async (req, res) => {

    const fries = await Fries.updateOne(req.body, {name: 'MCCAN'})

    res.send(fries)
})

app.listen(port, () => {
    console.log('listening on port 3000')
    console.log(`Your secret is ${process.env.SECRET_PASSWORD}`);
    // console.log(`My mongo db url is ${process.env.MONGODB_URI}`);
})