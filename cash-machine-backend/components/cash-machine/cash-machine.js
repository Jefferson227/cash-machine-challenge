const getNotes = (amountInput, notesAvailable, highestNoteIndex, notesWithdrew) => {
    if (amountInput === null) {
        return [];
    }

    if (typeof amountInput !== 'number' || isNaN(amountInput)) {
        throwInvalidArgumentError();
    }

    if (amountInput < 1) {
        throwInvalidArgumentError();
    }

    if (amountInput % notesAvailable[notesAvailable.length - 1] !== 0) {
        throwNoteUnavailableError();
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

const throwNoteUnavailableError = () => {
    throw new Error('NoteUnavailableException');
}

const throwInvalidArgumentError = () => {
    throw new Error('InvalidArgumentException');
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
    
        return getNotes(
            amountToWithdraw,
            initialParameters.notesAvailable,
            initialParameters.highestNoteIndex,
            initialParameters.notesWithdrew
        )
        .map((value) => value.toFixed(2));
    }
};