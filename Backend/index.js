// importing express
const express = require('express');
const UserRouter = require('./routers/userRouter');
const DomRouter = require('./routers/domRouter');

const cors = require('cors');
const domModel = require('./models/domModel');

// initializing express
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use('/user', UserRouter);
app.use('/dom', DomRouter);

// accept and process request
// route
app.get('/', (req, res) => {
    res.send('response from express');
});

// start the server
app.listen(port, () => {
    console.log('server started');
});