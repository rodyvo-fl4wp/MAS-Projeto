var gymPrice = 0;
var nutritionPrice = 0;
var gymPlan = 'None';
var nutritionPlan = 'None';

            function selectGymPlan(plan) {
                if (plan === 'basic') {
                    gymPlan = 'Basic';
                    gymPrice = 10;
                } else if (plan === 'standard') {
                    gymPlan = 'Standard';
                    gymPrice = 15;
                } else if (plan === 'unlimited') {
                    gymPlan = 'Unlimited';
                    gymPrice = 20;
                } else if (plan === ''){
                    gymPlan = 'None';
                    gymPrice = 0;
                }
                document.querySelectorAll('.selected-gym-plan').forEach(element => {
                    element.textContent = 'Gym Plan: ' + gymPlan;
                });
                calculateTotalPrice();
            }

            function selectNutritionPlan(plan) {
                if (plan === 'basic') {
                    nutritionPlan = 'Basic';
                    nutritionPrice = 15;
                } else if (plan === 'balanced') {
                    nutritionPlan = 'Balanced';
                    nutritionPrice = 20;
                } else if (plan === 'performance') {
                    nutritionPlan = 'Performance';
                    nutritionPrice = 25;
                } else if (plan === ''){
                    nutritionPlan = 'None';
                    nutritionPrice = 0;
                }
                document.querySelectorAll('.selected-nutrition-plan').forEach(element => {
                    element.textContent = 'Nutrition Plan: ' + nutritionPlan;
                });
                calculateTotalPrice();
            }

            function calculateTotalPrice() {
                var total = gymPrice + nutritionPrice;
                var discount = 1

                if (gymPlan === 'Standard' && nutritionPlan != 'None'){
                    discount -= 0.05
                } else if (gymPlan === 'Unlimited' && nutritionPlan != 'None'){
                    discount -= 0.15
                }

                if (nutritionPlan === 'Balanced' && gymPlan != 'None'){
                    discount -= 0.05
                } else if (nutritionPlan === 'Performance' && gymPlan != 'None'){
                    discount -= 0.15
                }

                total = total * discount
                total = parseFloat(total.toFixed(2))
                discount = (-discount + 1) * 100
                discount = parseFloat(discount.toFixed(0))

                document.getElementById('total-price').textContent = '$' + total;
                document.getElementById('discount').textContent = discount + '%';

            } 


function showCheckoutModal() {
    
    document.getElementById('modal-gym-plan').textContent = gymPlan;
    document.getElementById('modal-nutrition-plan').textContent = nutritionPlan;
    document.getElementById('modal-total-price').textContent = '$' + (gymPrice + nutritionPrice);
    document.getElementById('modal-discount').textContent = document.getElementById('discount').textContent;

    var myModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    myModal.show();
}

function completePurchase() {
    var userEmail = localStorage.getItem('userEmail')

    var UserInfo = localStorage.getItem(userEmail)
    var parsedUserInfo = JSON.parse(UserInfo)

    const GymPlans = JSON.parse(localStorage.getItem('GymPlans'))
    const NutritionPlans = JSON.parse(localStorage.getItem('NutritionPlans'))

    console.log(gymPlan)
    console.log(nutritionPlan)

    var UserPlans = {
        'UserGymPlan': {
            PlanType: gymPlan,
            PlanDetails: GymPlans[gymPlan] || 'None',
        },
        'UserNutritionPlan': {
            PlanType: nutritionPlan,
            PlanDetails: NutritionPlans[nutritionPlan] || 'None'
        }
    }

    parsedUserInfo.UserPlans = UserPlans

    localStorage.setItem(userEmail, JSON.stringify(parsedUserInfo))

    alert('Your purchase is completed!');

    window.location.href = 'PlanCheck.html'
}

$(document).ready(function(){
    var userEmail = localStorage.getItem('userEmail')

    var UserInfo = localStorage.getItem(userEmail)
    var parsedUserInfo = JSON.parse(UserInfo)

    if (parsedUserInfo.UserPlans.UserGymPlan.PlanType != 'None' || parsedUserInfo.UserPlans.UserNutritionPlan.PlanType != 'None'){
        window.location.href = 'PlanCheck.html'
    }
})










