$(document).ready(function () {

    // Set Profile//
    var Name = $("#UserName");
    var Email = $("#Email");
    var NumMec = $("#NumMec");
    var Password = $("#Password");

    const UserEmail = localStorage.getItem('userEmail');

    const UserData = localStorage.getItem(UserEmail);

    const parsedData = JSON.parse(UserData);

    Name.val(parsedData.name);
    Email.val(UserEmail);
    NumMec.val(parsedData.nummec);
    Password.val(parsedData.password);
    
    // Edit Info//
    $('.edit-icon').on('click', function () {
        // Find the corresponding input field (sibling)
        const inputField = $(this).siblings('input');
        
        // Get the email from localStorage (or any unique identifier) to locate the user data
        var email = localStorage.getItem('userEmail');
        
        // Check if the email exists in localStorage
        if (!email) {
            console.log('User not found in localStorage');
            return;
        }

        // Check if the input is disabled
        if (inputField.prop('disabled')) {
            // Enable the input for editing
            inputField.prop('disabled', false).focus(); // Focus on the field
            $(this).removeClass('fa-pen-to-square').addClass('fa-save'); // Change icon to save
    
            // If this input field is a password, temporarily show the text
            if (inputField.attr('type') === 'password') {
                inputField.attr('data-original-type', 'password'); // Store the original type
                inputField.attr('type', 'text');
            }
        } else {
            // Save the input and disable editing
            inputField.prop('disabled', true);
            $(this).removeClass('fa-save').addClass('fa-pen-to-square'); // Change icon back to edit

            const updatedValue = inputField.val(); // Get the updated value
            console.log(updatedValue);

            let retval = true; // Validation flag
            
            // Validation checks
            if (inputField.attr('id') === 'UserName') {
                if (updatedValue.length < 6) {
                    $("#UserNameError").removeClass("d-none");
                    retval = false;
                } else {
                    $("#UserNameError").addClass("d-none");
                    parsedData.name = updatedValue; // Update name if valid
                }
            } else if (inputField.attr('id') === 'Email') {
                if (!updatedValue.endsWith("@ua.pt")) {
                    $("#EmailError").removeClass("d-none").text("O email deve terminar com @ua.pt");
                    retval = false;
                } else {
                    $("#EmailError").addClass("d-none");
                    localStorage.removeItem(email)
                    email = updatedValue; // Update email if valid
                    localStorage.removeItem('userEmail'); // Remove old email key
                    localStorage.setItem(updatedValue, JSON.stringify(parsedData)); // Store with the new email as key
                    localStorage.setItem('userEmail', updatedValue); // Update the userEmail key
                }
            } else if (inputField.attr('id') === 'NumMec') {
                if (updatedValue.length !== 6 || isNaN(updatedValue)) {
                    $("#NumMecError").removeClass("d-none");
                    retval = false;
                } else {
                    $("#NumMecError").addClass("d-none");
                    parsedData.nummec = updatedValue; // Update numMec if valid
                }
            } else if (inputField.attr('id') === 'Password') {
                if (updatedValue.length < 8) {
                    $("#PasswordError").removeClass("d-none");
                    retval = false;
                } else {
                    $("#PasswordError").addClass("d-none");
                    parsedData.password = updatedValue; // Update password if valid
                }
            }

            // If all fields are valid, save the data
            if (retval) {
                // Save the updated userData back to localStorage
                localStorage.setItem(email, JSON.stringify(parsedData)); // Store updated data
                console.log('Saved:', updatedValue); // Log the updated value for debugging
            }

            // Restore the original type if it was a password
            if (inputField.attr('data-original-type') === 'password') {
                inputField.attr('type', 'password');
                inputField.removeAttr('data-original-type'); // Clean up the attribute
            }
        }
    });

    $('#log-out').on('click',function(){
        localStorage.removeItem('userEmail')
        window.location.href = 'index.html'
    })


    $('#home-page-btn').on('click', function(){
        window.location.href = 'HomePage.html'
    })
});
