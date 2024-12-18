$(document).ready(function () {
    // Fetch the logged-in client info from localStorage
    var UserEmail = localStorage.getItem('userEmail');
    var UserInfo = JSON.parse(localStorage.getItem(UserEmail));

    if (!UserInfo || UserInfo.accountType !== 'client') {
        console.error('User is not a client or user data is not available.');
        return;
    }

    // Load the client's meal plans from localStorage
    var mealPlansHTML = '';
    var clientMealPlans = UserInfo.mealPlans || [];

    if (clientMealPlans.length === 0) {
        $('#mealPlansList').html('<tr><td colspan="3">No meal plans found.</td></tr>');
    } else {
        clientMealPlans.forEach(function (plan, index) {
            var completedStatus = plan.completed ? 
                '<span class="badge bg-success" data-bs-toggle="tooltip" data-bs-placement="top" title="Completed"><i class="bi bi-check-circle"></i> Completed</span>' :
                '<span class="badge bg-warning text-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Not Completed"><i class="bi bi-x-circle"></i> In Progress</span>';

            mealPlansHTML += `
                <tr data-index="${index}">
                    <td>${plan.planName}</td>
                    <td>${completedStatus}</td>
                    <td><button class="btn btn-info btn-sm view-meal-plan" data-index="${index}">View</button></td>
                </tr>`;
        });
        $('#mealPlansList').html(mealPlansHTML);
    }

    // Enable tooltips
    $(function () {
        $('[data-bs-toggle="tooltip"]').tooltip();
    });

    // Handle clicking the 'View' button to display meals of the selected plan
    $('#mealPlansList').on('click', '.view-meal-plan', function () {
        var planIndex = $(this).data('index');
        var plan = clientMealPlans[planIndex];
    
        // Display the meals for the selected plan
        var mealPlanDetailsHTML = `
            <tr><td colspan="4"><strong>Plan for ${plan.day}</strong></td></tr>
        `;
        plan.meals.forEach(function (meal) {
            mealPlanDetailsHTML += `
                <tr>
                    <td>${meal.meal}</td>
                    <td>${meal.details}</td>
                    <td>${meal.calories} cal</td>
                    <td>${meal.measure}</td>
                </tr>`;
        });
    
        $('#mealPlanDetails').html(mealPlanDetailsHTML);
    
        // Show the "Mark as Completed" button
        $('#markMealPlanCompleted').removeClass('d-none').data('planIndex', planIndex);
    });
    

    // Handle the "Mark as Completed" button click
    $('#markMealPlanCompleted').on('click', function () {
        var planIndex = $(this).data('planIndex');
        var plan = clientMealPlans[planIndex];
        
        // Mark the plan as completed
        plan.completed = true;

        // Save the updated plan back to localStorage
        UserInfo.mealPlans[planIndex] = plan;
        localStorage.setItem(UserEmail, JSON.stringify(UserInfo));

        // Update the table to show the plan as completed
        $('#mealPlansList tr[data-index="' + planIndex + '"] td:nth-child(2)').html(`
            <span class="badge bg-success" data-bs-toggle="tooltip" data-bs-placement="top" title="Completed">
                <i class="bi bi-check-circle"></i> Completed
            </span>
        `);

        $('#markMealPlanCompleted').addClass('d-none');

        alert('Meal plan marked as completed!');
    });
});
