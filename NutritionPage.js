$(document).ready(function () {
    // Fetch professional info
    var UserEmail = localStorage.getItem('userEmail');
    var UserInfo = JSON.parse(localStorage.getItem(UserEmail));

    // Check if user is a professional
    if (UserInfo && UserInfo.accountType === 'professional') {
        var StudentList = Object.values(UserInfo.students);
        var $studentDropdown = $('#StudentList');
        var $studentViewDropdown = $('#StudentViewList');

        StudentList.forEach(function (studentEmail) {
            var studentInfo = JSON.parse(localStorage.getItem(studentEmail));
            if (studentInfo) {
                var option = `<option value="${studentEmail}">${studentInfo.name} (${studentEmail})</option>`;
                $studentDropdown.append(option);
                $studentViewDropdown.append(option);
            }
        });
    } else {
        console.error('No students found or user is not a professional.');
        return;
    }

    var mealPlan = [];
    var planDay, planTime;

    // Add meal to the meal plan
    $('#addMeal').on('click', function (e) {
        e.preventDefault();
    
        var meal = $('#mealType').val();
        var details = $('#mealDetails').val();
        var calories = $('#mealCalories').val();
        var measure = $('#mealMeasure').val();
    
        if (!meal || !details || !calories || !measure) {
            alert('Please fill out all fields.');
            return;
        }
    
        var mealObj = { meal, details, calories, measure };
        mealPlan.push(mealObj);
    
        var mealItem = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${meal}: ${details}, ${calories} cal (${measure})
                <button class="btn btn-danger btn-sm remove-meal">Remove</button>
            </li>`;
        $('#mealList').append(mealItem);
    
        // Clear the input fields
        $('#mealDetails').val('');
        $('#mealCalories').val('');
        $('#mealMeasure').val('');
    });
    

    // Remove a meal from the plan
    $('#mealList').on('click', '.remove-meal', function () {
        var index = $(this).parent().index();
        mealPlan.splice(index, 1);
        $(this).parent().remove();
    });

    // Save the complete meal plan to localStorage
    $('#saveMealPlan').on('click', function () {
        var selectedStudent = $('#StudentList').val();
        planDay = $('#planDay').val();
        planTime = $('#planTime').val();
    
        if (!selectedStudent) {
            alert('Please select a student.');
            return;
        }
        if (mealPlan.length === 0) {
            alert('Please add at least one meal to the plan.');
            return;
        }
    
        var studentInfo = JSON.parse(localStorage.getItem(selectedStudent));
        if (!studentInfo) {
            alert('Invalid student selected.');
            return;
        }
    
        studentInfo.mealPlans = studentInfo.mealPlans || [];
        studentInfo.mealPlans.push({
            planName: `Meal Plan ${studentInfo.mealPlans.length + 1}`,
            meals: mealPlan,
            day: planDay,
            time: planTime
        });
        localStorage.setItem(selectedStudent, JSON.stringify(studentInfo));
    
        mealPlan = [];
        $('#mealList').empty();
        alert('Meal plan saved successfully!');
    });
    

    // View meal plans for selected student
    // Display meal plans for the selected student with a Remove button
$('#StudentViewList').on('change', function () {
    var studentEmail = $(this).val();
    var studentInfo = JSON.parse(localStorage.getItem(studentEmail));

    if (studentInfo && studentInfo.mealPlans) {
        var plansHTML = studentInfo.mealPlans.map(function (plan, index) {
            var completedStatus = plan.completed ?
                '<span class="badge bg-success"><i class="bi bi-check-circle"></i> Completed</span>' :
                '<span class="badge bg-warning text-dark"><i class="bi bi-x-circle"></i> In Progress</span>';

            return `
                <tr data-index="${index}">
                    <td>${plan.planName}</td>
                    <td>${completedStatus}</td>
                    <td>
                        <button class="btn btn-info btn-sm view-meal-plan" data-index="${index}">View</button>
                        <button class="btn btn-danger btn-sm remove-meal-plan" data-index="${index}">Remove</button>
                    </td>
                </tr>`;
        }).join('');

        $('#mealPlansList').html(plansHTML);
    } else {
        $('#mealPlansList').html('<tr><td colspan="3">No meal plans available.</td></tr>');
    }
});

// Remove a meal plan
$('#mealPlansList').on('click', '.remove-meal-plan', function () {
    var studentEmail = $('#StudentViewList').val();
    var studentInfo = JSON.parse(localStorage.getItem(studentEmail));
    var planIndex = $(this).data('index');

    if (confirm('Are you sure you want to delete this meal plan?')) {
        studentInfo.mealPlans.splice(planIndex, 1); // Remove the plan
        localStorage.setItem(studentEmail, JSON.stringify(studentInfo)); // Save updated data
        alert('Meal plan removed successfully!');

        // Refresh the meal plans list
        $('#StudentViewList').trigger('change');
    }
});


    // View details of selected meal plan
    $('#mealPlansList').on('click', '.view-meal-plan', function () {
        var studentEmail = $('#StudentViewList').val();
        var studentInfo = JSON.parse(localStorage.getItem(studentEmail));
        var planIndex = $(this).data('index');
        var plan = studentInfo.mealPlans[planIndex];

        var planHTML = `
            <tr><td colspan="2"><strong>Plan for ${plan.day} at ${plan.time}</strong></td></tr>
        `;

        plan.meals.forEach(function (meal) {
            planHTML += `
                <tr>
                    <td>${meal.meal}</td>
                    <td>${meal.details}</td>
                </tr>`;
        });

        $('#mealPlanDetails').html(planHTML);
    });
});