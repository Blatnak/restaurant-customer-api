/*
Customer satisfaction API
*/

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Global app object
const app = express();

// Middleware config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Database connection

mongoose.connect(process.env.MONGO_URI, 
    { useUnifiedTopology: true, useNewUrlParser: true })



app.get("/", function(request, response) {
    return response.send("Welcome to customer satisfaction API")
})

const ReviewSchema = new mongoose.Schema({
    locationId : {
        type : Number,
        required: true
    },

    score : {
        type : Number,
        min: 1,
        max: 5,
        required: true
    },

    dateTime : {
        type : Date,
        default: Date.now
    }
})

const Review = mongoose.model("review", ReviewSchema);

app.post("/review", function(req, res) {
    Review.create(req.body).then(function (review) {
        res.send(review);
    })
})


// Bootstrap server
const server = app.listen(process.env.PORT || 3000, function () {
    console.log(`Listening on port ${server.address().port}`);
});