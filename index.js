const express = require('express');
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser')

// const route = require('./routers')
const database = require('./db');
const { default: mongoose } = require('mongoose');

const port = 3001;

// connect to db

database.connect();
require('./imageDetails')
const Images = mongoose.model("ImageDetails")

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.get('/', (req, res, next) => {
//     res.send("fdsfdsfs")
// })

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

app.post('/upload-image', async(req, res) => {
    const {base64} = req.body;
    try {
        Images.create({image:base64})

        // res.send({Status:"ok"})
        res.json({
            status: "Upload Image Successfully"
        })
    } catch (error) {
        // res.send({Status:"error", data:error})
        res.json({
            status: 'error'
        })
    }
})

app.get('/get-image', async(req, res) => {
    try {
        await Images.find({})
            .then(data => {
                res.json({
                    status: 'Get Image Successfully!!!',
                    data,
                })
            })
    } catch (error) {
        
    }
})