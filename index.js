// Mounting the Vue object
let vm = new Vue({
  el: '#container',
  data: {
    amount: '',
    notes: [],
    errorMessage: ''
  },
  methods: {
    withdrawAmount: withdrawAmount
  },
  computed: {
    disableWithdrawButton: disableWithdrawButton
  }
});

// Getting the data from the endpoint
function withdrawAmount() {
  axios.get(`http://localhost:3001/withdraw/${this.amount}`)
    .then(withdrawAmountSuccess)
    .catch(withdrawAmountError);
}

// Passing the data from the endpoint to the view
function withdrawAmountSuccess(res) {
    if (typeof res.data !== 'string') {
      vm.notes = res.data;
      vm.errorMessage = '';
    } else {
      switch(res.data) {
        case 'InvalidArgumentException':
          vm.errorMessage = 'An invalid amount has been submitted.';
          break;
        case 'NoteUnavailableException':
          vm.errorMessage = 'There\'s no available notes for this amount.';
          break;
        default:
          vm.errorMessage = 'An error has occurred.';
          break;
      }

      vm.notes = [];
    }
}

// Catching the error from the endpoint
function withdrawAmountError() {
    vm.errorMessage = 'An error has occurred.';
    vm.notes = [];
}

// Disabling/enabling the withdraw button
function disableWithdrawButton() {
  return this.amount ? false : true;
}