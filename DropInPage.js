$(document).ready(function () {
    // Fetch logged-in client info from localStorage
    var UserEmail = localStorage.getItem('userEmail');
    var UserInfo = JSON.parse(localStorage.getItem(UserEmail));

    if (!UserInfo || UserInfo.accountType !== 'client') {
        console.error('User is not a client or user data is not available.');
        return;
    }

    // Check if a drop-in is already scheduled
    var scheduledDropIn = UserInfo.scheduledDropIn || null;

    // Render the initial state
    renderDropIn();

    function renderDropIn() {
        if (scheduledDropIn) {
            // Show the scheduled drop-in summary
            $('#dropInFormContainer').addClass('d-none');
            $('#dropInSummary').removeClass('d-none');
            $('#scheduledDropIn').text(`${scheduledDropIn.day} at ${scheduledDropIn.time}`);
        } else {
            // Show the drop-in form
            $('#dropInFormContainer').removeClass('d-none');
            $('#dropInSummary').addClass('d-none');
        }
    }

    // Handle scheduling a drop-in
    $('#markDropIn').on('click', function () {
        var dropInDay = $('#dropInDay').val();
        var dropInTime = $('#dropInTime').val();

        if (!dropInDay || !dropInTime) {
            alert('Please select both a day and a time.');
            return;
        }

        if (scheduledDropIn) {
            alert('You already have a scheduled drop-in. Please cancel it first.');
            return;
        }

        // Save the drop-in to UserInfo
        scheduledDropIn = { day: dropInDay, time: dropInTime };
        UserInfo.scheduledDropIn = scheduledDropIn;
        localStorage.setItem(UserEmail, JSON.stringify(UserInfo));

        // Update the UI
        renderDropIn();
        alert(`Drop-in scheduled for ${dropInDay} at ${dropInTime}!`);
    });

    // Handle canceling a drop-in
    $('#cancelDropIn').on('click', function () {
        if (!confirm('Are you sure you want to cancel your drop-in?')) return;

        // Clear the scheduled drop-in
        scheduledDropIn = null;
        delete UserInfo.scheduledDropIn;
        localStorage.setItem(UserEmail, JSON.stringify(UserInfo));

        // Update the UI
        renderDropIn();
        alert('Your drop-in has been canceled.');
    });
});
