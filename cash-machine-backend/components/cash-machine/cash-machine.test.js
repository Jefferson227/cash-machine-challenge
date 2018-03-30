const test = require('tape');
const cashMachine = require('./cash-machine');
const notesAvailable = require('./cash-machine-notes-available');

test('Check if there are notes available', (t) => {
    t.assert(notesAvailable.length, 'There are notes available');
    t.end();
});

test('Withdraw valid amount', (t) => {
    t.assert(cashMachine.withdraw(250).length, 'Valid amount withdrew');
    t.end();
});

test('Withdraw invalid amount', (t) => {
    t.assert(cashMachine.withdraw(125) === 'NoteUnavailableException', 'Tried to withdraw an invalid amount');
    t.end();
});

test('Withdraw amount equal zero', (t) => {
    t.assert(cashMachine.withdraw(0) === 'InvalidArgumentException', 'Tried to withdraw amount equal zero');
    t.end();
});

test('Withdraw amount less than zero', (t) => {
    t.assert(cashMachine.withdraw(-120) === 'InvalidArgumentException', 'Tried to withdraw amount less than zero');
    t.end();
});

test('Withdraw passing a null value', (t) => {
    t.assert(!cashMachine.withdraw(null).length, 'Tried to withdraw passing a null value');
    t.end();
});

test('Withdraw a large amount', (t) => {
    t.assert(cashMachine.withdraw(10000000).length, 'Withdrew a large amount');
    t.end();
});