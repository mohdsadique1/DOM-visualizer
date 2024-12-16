// importing express
const express = require('express');
const UserRouter = require('./routers/userRouter');
const PageRouter = require('./routers/pageRouter');

const cors = require('cors');

// initializing express
const app = express();
const port = 5000;

// middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/user', UserRouter);
app.use('/page', PageRouter);

// accept and process request
// route
app.get('/', (req, res) => {
    res.send('response from express');
});

// start the server
app.listen(port, () => {
    console.log('server started');
});