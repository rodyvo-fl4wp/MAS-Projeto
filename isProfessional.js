$(document).ready(function(){


    UserEmail = localStorage.getItem('userEmail')
    var UserInfo = JSON.parse(localStorage.getItem(UserEmail))

    if (UserInfo.accountType === 'professional'){
        $('#professional-mode').removeClass('d-none')
        $('#client-mode').addClass('d-none')
        $('#plan-menu').addClass('d-none')
    }


})