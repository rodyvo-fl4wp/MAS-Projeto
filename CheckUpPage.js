document.addEventListener("DOMContentLoaded", function () {
    // Retrieve data from localStorage
    const AvailableCheckUps = JSON.parse(localStorage.getItem('Available CheckUps')) || [];
    const userEmail = localStorage.getItem('userEmail');
    const userInfo = JSON.parse(localStorage.getItem(userEmail)) || {};

    // Knockout ViewModel
    function ViewModel() {
        const self = this;

        // Observables for available check-ups
        self.AvailableCheckUps = ko.observableArray(AvailableCheckUps);

        // Observables for scheduled check-ups
        self.scheduledCheckUps = ko.observableArray(Object.values(userInfo.scheduledCheckUps || {}));

        // Function to schedule a check-up
        self.scheduleCheckUp = function (checkUpDetails) {
            // Create a unique identifier for the check-up
            const checkUpKey = `${checkUpDetails.Date}_${checkUpDetails.Time}_${checkUpDetails.Type}`;

            // Check if the check-up is already scheduled
            if (self.isCheckUpScheduled(checkUpKey)) {
                alert('You have already scheduled this check-up.');
                return;
            }

            // Add to user's scheduled check-ups (stored as an object)
            userInfo.scheduledCheckUps = userInfo.scheduledCheckUps || {};

            userInfo.scheduledCheckUps[checkUpKey] = {
                date: checkUpDetails.Date,
                time: checkUpDetails.Time,
                type: checkUpDetails.Type,
                location: checkUpDetails.Location,
            };

            // Save updated user info to localStorage
            localStorage.setItem(userEmail, JSON.stringify(userInfo));

            // Notify user and update the list
            alert('Check-up successfully scheduled!');
            self.scheduledCheckUps(Object.values(userInfo.scheduledCheckUps)); // Update the observable array
        };

        // Function to check if the check-up is already scheduled
        self.isCheckUpScheduled = function (checkUpKey) {
            return userInfo.scheduledCheckUps && userInfo.scheduledCheckUps[checkUpKey] !== undefined;
        };

        // Function to cancel a scheduled check-up
        self.cancelCheckUp = function (scheduledCheckUp) {
            const checkUpKey = `${scheduledCheckUp.date}_${scheduledCheckUp.time}_${scheduledCheckUp.type}`;

            // Remove the check-up from the scheduledCheckUps object
            delete userInfo.scheduledCheckUps[checkUpKey];

            // Update user info in localStorage
            localStorage.setItem(userEmail, JSON.stringify(userInfo));

            // Notify user and update the list
            alert('Check-up canceled.');
            self.scheduledCheckUps(Object.values(userInfo.scheduledCheckUps)); // Update the observable array
        };
    }

    // Apply Knockout bindings
    ko.applyBindings(new ViewModel());
});
