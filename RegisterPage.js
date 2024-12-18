$(document).ready(function () {
    // Toggle password visibility
    $("#viewIcon").click(function () {
        if ($("#viewIcon").hasClass("fa-eye-slash")) {
            $("#viewIcon").removeClass("fa-eye-slash").addClass("fa-eye");
            $("#Password").attr("type", "text");
        } else {
            $("#viewIcon").removeClass("fa-eye").addClass("fa-eye-slash");
            $("#Password").attr("type", "password");
        }
    });

    // Form submission and validation
    $("#submitBtn").click(function (event) {

        let retval = true;

        // Capture input values
        const username = $("#UserName").val().trim();
        const nummec = $("#NumMec").val().trim();
        const email = $("#Email").val().trim();
        const password = $("#Password").val().trim();

        // Validate username
        if (username.length < 6) {
            $("#UserNameError").removeClass("d-none");
            retval = false;
        } else {
            $("#UserNameError").addClass("d-none");
        }

        // Validate NumMec (must be exactly 6 characters, modify as needed)
        if (nummec.length !== 6 || isNaN(nummec)) {
            $("#NumMecError").removeClass("d-none");
            retval = false;
        } else {
            $("#NumMecError").addClass("d-none");
        }

        // Validate email
        // Email validation regex for @ua.pt domain

        if (!email.endsWith("@ua.pt")) {
            $("#EmailError").removeClass("d-none").text("O email deve terminar com @ua.pt");
            retval = false;
        } else {
            $("#EmailError").addClass("d-none");
        }


        // Validate password
        if (password.length < 8) {
            $("#PasswordError").removeClass("d-none");
            retval = false;
        } else {
            $("#PasswordError").addClass("d-none");
        }

        // Save data to localStorage if validation passes
        if (retval === true) {
            const UserData = {
                name: username,
                nummec: nummec,
                password: password,
                accountType: 'client',
                UserPlans: {
                    UserGymPlan: {
                        PlanType: 'None',
                        PlanDetails: 'None',
                    },
                    UserNutritionPlan: {
                        PlanType: 'None',
                        PlanDetails: 'None',
                    }
                }
            };

            localStorage.setItem(email, JSON.stringify(UserData)); // Save user data
            let new_profile = localStorage.getItem(email);

            console.log("New profile added! " + new_profile);
            alert("Account created successfully!");

            // Redirect to login page
            window.location.href = "LoginPage.html";
        }
    });
});
