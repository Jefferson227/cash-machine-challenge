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
            const newNotes = createArrayOfNotes(
                Math.floor(amountInput / notesAvailable[0]),
                notesAvailable[0].toFixed(2)
            );

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

// Creating the array of the notes that will be returned to the user
// due to the amount passed
const createArrayOfNotes = (times, value) => {
    const _createArrayOfNotes = (times, value, notes) => {
        const newNotes = [...notes, value];

        if (times > 1) {
            return _createArrayOfNotes(times - 1, value, newNotes);
        }

        return newNotes;
    }

    return _createArrayOfNotes(times, value, []);
}

// Exporting the function that will be available to the user
module.exports = {
    withdraw(amountToWithdraw) {
        const notesAvailable = [100, 50, 20, 10];
        return getNotes(amountToWithdraw, notesAvailable);
    }
};