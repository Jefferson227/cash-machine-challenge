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

    const _getNotes = (amountInput, notesAvailable, highestNoteIndex, notesWithdrew) => {
        if (amountInput < notesAvailable[highestNoteIndex]) {
            return _getNotes(
                amountInput,
                notesAvailable,
                highestNoteIndex + 1,
                notesWithdrew
            );
        } else {
            const remainder = amountInput % notesAvailable[highestNoteIndex];
            const newNotes = createArrayOfNotes(
                Math.floor(amountInput / notesAvailable[highestNoteIndex]),
                notesAvailable[highestNoteIndex].toFixed(2)
            );

            if (remainder > 0) {
                return _getNotes(
                    remainder,
                    notesAvailable,
                    highestNoteIndex + 1,
                    notesWithdrew.concat(newNotes)
                );
            } else {
                return notesWithdrew.concat(newNotes);
            }
        }
    }

    return _getNotes(amountInput, notes, 0, []);
}

const addNotesWithdrew = (previousNotes, newNotes) => [...previousNotes, ...newNotes];

const createArrayOfNotes = (times, value, notes) => {
	const newNotes = [...notes, value];

	if (times > 1) {
    	return createArrayOfNotes(times - 1, value, newNotes);
    }

    return newNotes;
}

const getInitialParameters = () => {
    return Object.freeze({
        notesAvailable: [100, 50, 20, 10],
        highestNoteIndex: 0,
        notesWithdrew: []
    });
}

module.exports = {
    withdraw: (amountToWithdraw) => {
        const initialParameters = getInitialParameters();
        const notes = getNotes(
            amountToWithdraw,
            initialParameters.notesAvailable,
            initialParameters.highestNoteIndex,
            initialParameters.notesWithdrew
        );

        return typeof notes === 'string'
            ? notes
            : notes.map((value) => value.toFixed(2));
    }
};