document.addEventListener("DOMContentLoaded", function () {
    // Retrieve data from localStorage
    const AvailableClasses = JSON.parse(localStorage.getItem('Available Classes')) || {};
    const userEmail = localStorage.getItem('userEmail');
    const userInfo = JSON.parse(localStorage.getItem(userEmail)) || {};

    // Knockout ViewModel
    function ViewModel() {
        const self = this;

        // Observables for available classes
        self.PilatesClasses = ko.observableArray(AvailableClasses.Pilates || []);
        self.YogaClasses = ko.observableArray(AvailableClasses.Yoga || []);
        self.ZumbaClasses = ko.observableArray(AvailableClasses.Zumba || []);

        // Observables for subscribed classes
        self.subscribedClasses = ko.observableArray(Object.values(userInfo.subscribedClasses || {}));

        // Function to subscribe to a class
        self.subscribeToClasses = function (type, classDetails) {
            // Create a unique identifier for the class
            const classKey = `${type}_${classDetails.Day}_${classDetails.Time}`;

            // Check if the class is already subscribed
            if (self.isSubscribedToClass(classKey)) {
                alert('You are already subscribed to this class.');
                return;
            }

            // Add to user's subscribed classes (stored as an object)
            userInfo.subscribedClasses = userInfo.subscribedClasses || {};

            // Prevent subscribing to the same class twice
            userInfo.subscribedClasses[classKey] = {
                type: type,
                day: classDetails.Day,
                time: classDetails.Time,
                duration: classDetails.Duration,
            };

            // Save updated user info to localStorage
            localStorage.setItem(userEmail, JSON.stringify(userInfo));

            // Notify user and update the list
            alert('Successfully registered to your new class');
            self.subscribedClasses(Object.values(userInfo.subscribedClasses)); // Update the observable array
        };

        // Function to check if the class is already subscribed
        self.isSubscribedToClass = function (classKey) {
            return userInfo.subscribedClasses && userInfo.subscribedClasses[classKey] !== undefined;
        };

        // Function to remove a subscription
        self.removeSubscription = function (subscribedClass) {
            const classKey = `${subscribedClass.type}_${subscribedClass.day}_${subscribedClass.time}`;
            // Remove the class from the subscribedClasses object
            delete userInfo.subscribedClasses[classKey];

            // Update user info in localStorage
            localStorage.setItem(userEmail, JSON.stringify(userInfo));

            // Notify user and update the list
            alert('Subscription cancelled');
            self.subscribedClasses(Object.values(userInfo.subscribedClasses)); // Update the observable array
        };
    }

    // Apply Knockout bindings
    ko.applyBindings(new ViewModel());
});
