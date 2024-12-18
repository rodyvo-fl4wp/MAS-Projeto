$(document).ready(function () {
    // Fetch professional info
    var UserEmail = localStorage.getItem('userEmail');
    var UserInfo = JSON.parse(localStorage.getItem(UserEmail));

    if (UserInfo && UserInfo.accountType === 'professional') {
        // Populate student dropdowns
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

    // View training plans for selected student
    $('#StudentViewList').on('change', function () {
        var studentEmail = $(this).val();
        var studentInfo = JSON.parse(localStorage.getItem(studentEmail));

        if (studentInfo && studentInfo.trainingPlans) {
            var plansHTML = studentInfo.trainingPlans.map(function (plan, index) {
                var completedStatus = plan.completed
                    ? '<span class="badge bg-success" title="Completed"><i class="bi bi-check-circle"></i> Completed</span>'
                    : '<span class="badge bg-warning text-dark" title="Not Completed"><i class="bi bi-x-circle"></i> In Progress</span>';

                return `
                    <tr data-index="${index}">
                        <td>${plan.planName}</td>
                        <td>${completedStatus}</td>
                        <td>
                            <button class="btn btn-info btn-sm view-plan" data-index="${index}">View</button>
                            <button class="btn btn-danger btn-sm remove-plan" data-index="${index}" data-email="${studentEmail}">Remove</button>
                        </td>
                    </tr>`;
            }).join('');

            $('#plansList').html(plansHTML);
        }
    });

    let currentExercises = []; // Array to store exercises for the current plan

    // Add Exercise to Temporary List
    $('#addExercise').on('click', function () {
        const exercise = $('#exerciseType').val();
        const duration = $('#duration').val();
        const reps = $('#reps').val();
        const sets = $('#sets').val();

        if (!sets || (!duration && !reps)) {
            alert('Please fill in all required fields (Sets and either Duration or Reps).');
            return;
        }

        const exerciseDetails = {
            exercise,
            sets: parseInt(sets, 10),
            duration: duration ? parseInt(duration, 10) : null,
            reps: reps ? parseInt(reps, 10) : null
        };

        // Add to currentExercises
        currentExercises.push(exerciseDetails);

        // Update Exercise List in UI
        const exerciseHTML = `
            <li class="list-group-item">
                ${exerciseDetails.exercise} - 
                Sets: ${exerciseDetails.sets}, 
                Duration: ${exerciseDetails.duration || '-'} seconds, 
                Reps: ${exerciseDetails.reps || '-'}
            </li>`;
        $('#exerciseList').append(exerciseHTML);

        // Clear form fields
        $('#exerciseType').val('Squats');
        $('#duration').val('').prop('disabled', true);
        $('#reps').val('').prop('disabled', true);
        $('#sets').val('');
        $('input[name="optionType"]').prop('checked', false);
    });

    // Save Plan for Selected Student
    $('#savePlan').on('click', function () {
        const studentEmail = $('#StudentList').val();
        const planDay = $('#planDay').val();
        const planTime = $('#planTime').val();

        if (!studentEmail || !planDay || !planTime || currentExercises.length === 0) {
            alert('Please select a student, fill in the day and time, and add at least one exercise.');
            return;
        }

        // Retrieve student info from localStorage
        const studentInfo = JSON.parse(localStorage.getItem(studentEmail)) || { trainingPlans: [] };

        // Create new plan
        const newPlan = {
            planName: `${planDay} at ${planTime}`,
            day: planDay,
            time: planTime,
            exercises: currentExercises,
            completed: false // Default to not completed
        };

        // Save the plan
        studentInfo.trainingPlans = studentInfo.trainingPlans || [];
        studentInfo.trainingPlans.push(newPlan);
        localStorage.setItem(studentEmail, JSON.stringify(studentInfo));

        // Reset UI
        currentExercises = [];
        $('#exerciseList').html('');
        $('#planDay').val('Monday');
        $('#planTime').val('');
        $('#StudentList').val('');

        alert('Training plan saved successfully!');
    });

    // Remove a training plan
    $('#plansList').on('click', '.remove-plan', function () {
        var studentEmail = $(this).data('email');
        var planIndex = $(this).data('index');
        var studentInfo = JSON.parse(localStorage.getItem(studentEmail));

        if (!studentInfo || !studentInfo.trainingPlans || !studentInfo.trainingPlans[planIndex]) {
            alert('Unable to find the training plan.');
            return;
        }

        // Remove the plan from the array
        studentInfo.trainingPlans.splice(planIndex, 1);

        // Save the updated student info back to localStorage
        localStorage.setItem(studentEmail, JSON.stringify(studentInfo));

        // Refresh the plans table
        $(this).closest('tr').remove();

    });

    // View details of selected training plan
    $('#plansList').on('click', '.view-plan', function () {
        var studentEmail = $('#StudentViewList').val();
        if (!studentEmail) {
            alert('Please select a student to view their training plan.');
            return;
        }
    
        var studentInfo = JSON.parse(localStorage.getItem(studentEmail));
        var planIndex = $(this).data('index');
    
        if (!studentInfo || !studentInfo.trainingPlans || !studentInfo.trainingPlans[planIndex]) {
            alert('Unable to find the selected training plan.');
            return;
        }
    
        var plan = studentInfo.trainingPlans[planIndex];
    
        // Debugging logs
        console.log('Student Email:', studentEmail);
        console.log('Student Info:', studentInfo);
        console.log('Plan Index:', planIndex);
        console.log('Selected Plan:', plan);
    
        var planHTML = `<tr><td colspan="4"><strong>Plan for ${plan.day} at ${plan.time}</strong></td></tr>`;
    
        if (!plan.exercises || plan.exercises.length === 0) {
            planHTML += '<tr><td colspan="4">No exercises available in this plan.</td></tr>';
        } else {
            plan.exercises.forEach(function (exercise) {
                planHTML += `
                    <tr>
                        <td>${exercise.exercise}</td>
                        <td>${exercise.sets}</td>
                        <td>${exercise.duration || '-'}</td>
                        <td>${exercise.reps || '-'}</td>
                    </tr>`;
            });
        }
    
        $('#planDetails').html(planHTML);
    });
    

    // Handle radio button changes
    $('input[name="optionType"]').on('change', function () {
        if ($('#chooseDuration').is(':checked')) {
            $('#duration').prop('disabled', false); // Enable Duration
            $('#reps').prop('disabled', true); // Disable Reps
            $('#reps').val(''); // Clear Reps value
        } else if ($('#chooseReps').is(':checked')) {
            $('#reps').prop('disabled', false); // Enable Reps
            $('#duration').prop('disabled', true); // Disable Duration
            $('#duration').val(''); // Clear Duration value
        }
    });


    // Enable tooltips for completion badges
    $(function () {
        $('[data-bs-toggle="tooltip"]').tooltip();
    });

    // Example: Enable inputs when a student is selected
    $('#StudentViewList').on('change', function () {
        $('#duration, #reps').prop('disabled', false); // Enable inputs
    });

});
