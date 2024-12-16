const mongoose = require('mongoose');

const url = "mongodb+srv://Mohdsadique:8542087579@cluster0.vzvs1.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0"

// asynchronous functions - returns promise
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
    
})
.catch((err) => {
    console.log(err);   
});

module.exports = mongoose;