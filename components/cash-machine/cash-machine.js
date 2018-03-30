const notesAvailable = require('./cash-machine-notes-available');

// This function gets the amount desired and the notes available
// to return the array with the notes according with the amount
const getNotes = (amountInput, notesAvailable) => {
    const notes = notesAvailable.sort((a, b) => b - a);

    if (amountInput === null) {
        return [];
    }

    if (typeof amountInput !== 'number' || isNaN(amountInput)) {
        return 'InvalidArgumentException';
    }

    if (amountInput < 1) {
        return 'InvalidArgumentException';
    }

    if (amountInput % notes[notes.length - 1] !== 0) {
        return 'NoteUnavailableException';
    }

    const _getNotes = (amountInput, notesAvailable, notesWithdrew) => {
        if (amountInput < notesAvailable[0]) {
            return _getNotes(
                amountInput,
                notesAvailable.slice(1),
                notesWithdrew
            );
        } else {
            const remainder = amountInput % notesAvailable[0];
            const newNotes = {
                value: notesAvailable[0].toFixed(2),
                quantity: Math.floor(amountInput / notesAvailable[0])
            };

            if (remainder > 0) {
                return _getNotes(
                    remainder,
                    notesAvailable.slice(1),
                    notesWithdrew.concat(newNotes)
                );
            } else {
                return notesWithdrew.concat(newNotes);
            }
        }
    }

    return _getNotes(amountInput, notes, []);
}

// Exporting the function that will be available to the user
module.exports = {
    withdraw(amountToWithdraw) {
        return getNotes(amountToWithdraw, notesAvailable);
    }
};