$(document).ready(function(){

    var UserEmail = localStorage.getItem('userEmail')
    var UserInfo = localStorage.getItem(UserEmail)
    parsedUserInfo = JSON.parse(UserInfo)
    nutritionplan = parsedUserInfo.UserPlans.UserNutritionPlan
    
    GymType = $('#gym-plan-type')
    AccessToGym  = $('#gym-plan-access-to-gym')
    AccessToClasses = $('#gym-plan-access-to-classes')
    PTSessions = $('#gym-plan-personal-trainer-sessions')
    MonthlyClassesIncluded = $('#gym-plan-monthly-classes-included')
    LockerRoomAccess = $('#gym-plan-locker-room-access')
    GymMonthlyCost = $('#gym-plan-monthly-cost')
    NutritionalPlanIncluded = $('#gym-plan-personal-nutritional-plan')


    if (parsedUserInfo.UserPlans.UserGymPlan.PlanType === 'None'){

    }
    else{
        GymType.text(parsedUserInfo.UserPlans.UserGymPlan.PlanType)

        if (parsedUserInfo.UserPlans.UserGymPlan.PlanDetails.AccessToClasses){
            AccessToClasses.text('✔').addClass('check')
        }
        else{
            AccessToClasses.text('✘').addClass('not')
        }

        if (parsedUserInfo.UserPlans.UserGymPlan.PlanDetails.AccessToGym){
            AccessToGym.text('✔').addClass('check')
        }
        else{
            AccessToGym.text('✘').addClass('not')
        }

        if (parsedUserInfo.UserPlans.UserGymPlan.PlanDetails.LockerRoomAccess){
            LockerRoomAccess.text('✔').addClass('check')
        }
        else{
            LockerRoomAccess.text('✘').addClass('not')
        }

        if (parsedUserInfo.UserPlans.UserGymPlan.PlanDetails.PersonalTrainerSessions){
            PTSessions.text('✔').addClass('check')
        }
        else{
            PTSessions.text('✘').addClass('not')
        }

        if (parsedUserInfo.UserPlans.UserGymPlan.PlanDetails.NutritionalPlanIncluded){
            NutritionalPlanIncluded.text('✔').addClass('check')
        }
        else{
            NutritionalPlanIncluded.text('✘').addClass('not')
        }

        MonthlyClassesIncluded.text(parsedUserInfo.UserPlans.UserGymPlan.PlanDetails.MonthlyClassesIncluded)
        GymMonthlyCost.text(parsedUserInfo.UserPlans.UserGymPlan.PlanDetails.Price + '$')
    }


    NutritionType = $('#nutrition-plan-type')
    CustomizedMealPlan = $('#nutrition-plan-customized-meal-plan')
    Bmi = $('#nutrition-plan-bmi')
    PersonalizedNutritionalReports =  $('#nutrition-plan-reports')
    SuplementAdvice = $('#nutrition-plan-advice')
    MonthlyDietitianConsultationsIncluded = $('#nutrition-plan-dietitian')
    NutritionMonthlyCost = $('#nutrition-plan-monthly-cost')



    if (nutritionplan.PlanType === 'None'){

    }
    else{
        NutritionType.text(nutritionplan.PlanType)

        if (nutritionplan.PlanDetails.CustomizedMealPlan){
            CustomizedMealPlan.text('✔').addClass('check')
        }
        else{
            CustomizedMealPlan.text('✘').addClass('not')
        }

        if (nutritionplan.PlanDetails.bmiWeightTracking){
            Bmi.text('✔').addClass('check')
        }
        else{
            Bmi.text('✘').addClass('not')
        }

        if (nutritionplan.PlanDetails.PersonalizedNutritionalReports){
            PersonalizedNutritionalReports.text('✔').addClass('check')
        }
        else{
            PersonalizedNutritionalReports.text('✘').addClass('not')
        }

        if (nutritionplan.PlanDetails.SupplementAdvice){
            SuplementAdvice.text('✔').addClass('check')
        }
        else{
            SuplementAdvice.text('✘').addClass('not')
        }


        MonthlyDietitianConsultationsIncluded.text(nutritionplan.PlanDetails.MonthlyDietitianConsultations)
        NutritionMonthlyCost.text(nutritionplan.PlanDetails.Price + '$')
    }





















    $('#go-back-button').on('click', function(){
        window.location.href = 'HomePage.html'
    })
    // CANCEL PLAN
    $('#cancel-plan-btn').on('click',function(){

    parsedUserInfo.UserPlans.UserGymPlan.PlanDetails = 'None'
    parsedUserInfo.UserPlans.UserGymPlan.PlanType = 'None'
    parsedUserInfo.UserPlans.UserNutritionPlan.PlanDetails = 'None'
    parsedUserInfo.UserPlans.UserNutritionPlan.PlanType = 'None'

    localStorage.setItem(UserEmail, JSON.stringify(parsedUserInfo))

    window.location.href = 'HomePage.html'

    })
})