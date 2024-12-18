$(document).ready(function(){

    var UserEmail = localStorage.getItem('userEmail')
    var UserInfo = localStorage.getItem(UserEmail)
    parsedUserInfo = JSON.parse(UserInfo)

    var UserPlan = parsedUserInfo.UserPlans

    var UserGymPlan = UserPlan.UserGymPlan
    var UserNutritionPlan = UserPlan.UserNutritionPlan

    if (UserGymPlan.PlanType === 'None' && UserNutritionPlan.PlanType === 'None'){
        $("#plan-menu").attr('href', 'PlanSubscription.html')
    }
    else{
        $("#plan-menu").attr('href', 'PlanCheck.html')
    }

})