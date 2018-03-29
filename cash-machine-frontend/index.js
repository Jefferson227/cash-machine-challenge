// Mounting the Vue object
let vm = new Vue({
  el: '#container',
  data: {
    amount: '',
    notes: [],
    notesErrorMessage: '',
    notesAvailable: '',
    notesAvailableErrorMessage: ''
  },
  methods: {
    withdrawAmount: withdrawAmount
  },
  computed: {
    disableWithdrawButton: disableWithdrawButton,
  },
  created: getNotesAvailable
});

// Common constant
const defaultErrorMessage = 'An error has occurred.';

// Getting the full path to the API's endpoints
function getEndpointUrl(endpoint) {
  return `http://localhost:3001${endpoint}`;
}

// Getting the data from the endpoint
function withdrawAmount() {
  axios.get(getEndpointUrl(`/withdraw/${this.amount}`))
    .then(withdrawAmountSuccess)
    .catch(withdrawAmountError);
}

// Getting the notes available from the endpoint
function getNotesAvailable() {
  axios.get(getEndpointUrl('/get-notes-available'))
    .then(getNotesAvailableSuccess)
    .catch(getNotesAvailableError);
}

// Passing the data from the endpoint to the view
function withdrawAmountSuccess(res) {
    if (typeof res.data !== 'string') {
      vm.notes = res.data;
      vm.notesErrorMessage = '';
    } else {
      switch(res.data) {
        case 'InvalidArgumentException':
          vm.notesErrorMessage = 'An invalid amount has been submitted.';
          break;
        case 'NoteUnavailableException':
          vm.notesErrorMessage = 'There\'s no available notes for this amount.';
          break;
        default:
          vm.notesErrorMessage = defaultErrorMessage;
          break;
      }

      vm.notes = [];
    }
}

// Catching the error from the endpoint
function withdrawAmountError() {
    vm.notesErrorMessage = defaultErrorMessage;
    vm.notes = [];
}

// Returning the notes available to be displayed in the view
function getNotesAvailableSuccess(res) {
  vm.notesAvailable = res.data.join(', ');
  vm.notesAvailableErrorMessage = '';
}

// Returning the notes available to be displayed in the view
function getNotesAvailableError() {
  vm.notesAvailableErrorMessage = defaultErrorMessage;
  vm.notesAvailable = '';
}

// Disabling/enabling the withdraw button
function disableWithdrawButton() {
  return this.amount ? false : true;
}