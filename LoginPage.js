$(document).ready(function(){

    $("#viewIcon").click(function(){
        if ($("#viewIcon").hasClass("fa-eye-slash")){
            $("#viewIcon").removeClass("fa-eye-slash").addClass("fa-eye");
            $("#Password").attr("type", "text");
        }
        else{
            $("#viewIcon").removeClass("fa-eye").addClass("fa-eye-slash");
            $("#Password").attr("type", "password");
        }
    })

    $("#submitBtn").click(function(){

        var retval = true
        
        const email = $("#Email").val().trim();
        const password = $("#Password").val().trim();

        const userData = localStorage.getItem(email);

        if (!userData){
            $("#EmailError").removeClass("d-none").text(" Email não está registado.");
        retval = false;
        } else {
            $("#EmailError").addClass("d-none");
        }

        const parsedData = JSON.parse(userData);

            // Check if the password matches the one stored for this email
        if (parsedData.password !== password) {
            $("#PasswordError").removeClass("d-none").text(" Senha incorreta.");
            retval = false;
        } else {
            $("#PasswordError").addClass("d-none");
        }
        
    
        if (retval) {
            localStorage.setItem('userEmail', email)
            window.location.href = "HomePage.html";
        }
    })
})

