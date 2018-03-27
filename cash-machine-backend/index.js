const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

const cashMachine = require('./components/cash-machine/cash-machine');

app.listen(port, () => {
    console.log('Server running');
});

app.get('/withdraw/:amount', (req, res) => {
    const amount = req.params.amount.toLowerCase() === 'null'
        ? null
        : parseInt(req.params.amount);

    res.send(cashMachine.withdraw(amount));
});