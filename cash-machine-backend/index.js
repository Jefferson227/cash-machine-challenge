const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3001;

const cashMachine = require('./components/cash-machine/cash-machine');
const notesAvailable = require('./components/cash-machine/cash-machine-notes-available');

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

// Getting the notes available
app.get('/get-notes-available', (req, res) => {
    res.send(
        notesAvailable
            .sort()
            .reverse()
            .map((note) => note.toFixed(2))
    );
});