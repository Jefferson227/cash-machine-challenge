const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3001;

const cashMachine = require('./components/cash-machine/cash-machine');

// Avoiding CORS problem
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
});

// Starting the server
app.listen(port, () => {
    console.log('Server running');
});

// Creating the route for the withdraw function
app.get('/withdraw/:amount', (req, res) => {
    const amount = req.params.amount.toLowerCase() === 'null'
        ? null
        : parseInt(req.params.amount);

    res.send(cashMachine.withdraw(amount));
});