const getNotes = (amountInput, notesAvailable, highestNoteIndex, notesWithdrew) => {
    if (amountInput === null) {
        return [];
    }

    if (typeof amountInput !== 'number' || isNaN(amountInput)) {
        return 'InvalidArgumentException';
    }

    if (amountInput < 1) {
        return 'InvalidArgumentException';
    }

    if (amountInput % notesAvailable[notesAvailable.length - 1] !== 0) {
        return 'NoteUnavailableException';
    }

    if (amountInput < notesAvailable[highestNoteIndex]) {
		return getNotes(
            amountInput,
            notesAvailable,
            highestNoteIndex + 1,
            notesWithdrew
        );
    } else {
    	const remainder = amountInput % notesAvailable[highestNoteIndex];
        const newNotes = createArrayOfNotes(
            Math.floor(amountInput / notesAvailable[highestNoteIndex]),
            notesAvailable[highestNoteIndex],
            []
        );
        
        if (remainder > 0) {
        	return getNotes(
            	remainder,
                notesAvailable,
                highestNoteIndex + 1,
                addNotesWithdrew(notesWithdrew, newNotes)
            );
        } else {
        	return addNotesWithdrew(notesWithdrew, newNotes);
        }
    }
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