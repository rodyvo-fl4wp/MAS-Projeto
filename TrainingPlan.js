$(document).ready(function () {
    // Fetch the logged-in client info from localStorage
    var UserEmail = localStorage.getItem('userEmail');
    var UserInfo = JSON.parse(localStorage.getItem(UserEmail));

    if (!UserInfo || UserInfo.accountType !== 'client') {
        console.error('User is not a client or user data is not available.');
        return;
    }

    // Load the client's training plans from localStorage
    var clientPlans = UserInfo.trainingPlans || [];
    renderPlans();

    function renderPlans() {
        var plansHTML = '';
        if (clientPlans.length === 0) {
            $('#plansList').html('<tr><td colspan="3">No training plans found.</td></tr>');
        } else {
            clientPlans.forEach(function (plan, index) {
                var completedStatus = plan.completed ? 
                    '<span class="badge bg-success" data-bs-toggle="tooltip" data-bs-placement="top" title="Completed"><i class="bi bi-check-circle"></i> Completed</span>' :
                    '<span class="badge bg-warning text-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Not Completed"><i class="bi bi-x-circle"></i> In Progress</span>';

                plansHTML += `
                <tr data-index="${index}">
                    <td>${plan.planName}</td>
                    <td>${completedStatus}</td>
                    <td>
                        <button class="btn btn-info btn-sm view-plan" data-index="${index}">View</button>
                        <button class="btn btn-danger btn-sm remove-plan" data-index="${index}">Remove</button>
                    </td>
                </tr>`;
            });
            $('#plansList').html(plansHTML);
        }

        // Enable tooltips
        $(function () {
            $('[data-bs-toggle="tooltip"]').tooltip();
        });
    }

    // Handle clicking the 'View' button to display exercises of the selected plan
    $('#plansList').on('click', '.view-plan', function () {
        var planIndex = $(this).data('index');
        var plan = clientPlans[planIndex];

        // Display the exercises for the selected plan
        var planDetailsHTML = `
            <tr><td colspan="4"><strong>Plan for ${plan.day} at ${plan.time}</strong></td></tr>
        `;
        plan.exercises.forEach(function (exercise) {
            planDetailsHTML += `
                <tr>
                    <td>${exercise.exercise}</td>
                    <td>${exercise.sets}</td>
                    <td>${exercise.duration || '-'}</td>
                    <td>${exercise.reps || '-'}</td>
                </tr>`;
        });

        $('#planDetails').html(planDetailsHTML);

        // Show the "Mark as Completed" button
        $('#markCompleted').removeClass('d-none').data('planIndex', planIndex);
    });

    // Handle the "Mark as Completed" button click
    $('#markCompleted').on('click', function () {
        var planIndex = $(this).data('planIndex');
        var plan = clientPlans[planIndex];
        
        // Mark the plan as completed
        plan.completed = true;

        // Save the updated plan back to localStorage
        UserInfo.trainingPlans[planIndex] = plan;
        localStorage.setItem(UserEmail, JSON.stringify(UserInfo));

        // Update the table to show the plan as completed
        $('#plansList tr[data-index="' + planIndex + '"] td:nth-child(2)').html(`
            <span class="badge bg-success" data-bs-toggle="tooltip" data-bs-placement="top" title="Completed">
                <i class="bi bi-check-circle"></i> Completed
            </span>
        `);

        $('#markCompleted').addClass('d-none');

        alert('Plan marked as completed!');
    });

    // Handle clicking the "Remove" button to delete a plan
    $('#plansList').on('click', '.remove-plan', function () {
        var planIndex = $(this).data('index');
        
        // Confirm removal
        if (confirm('Are you sure you want to remove this plan?')) {
            // Remove the plan from the array
            clientPlans.splice(planIndex, 1);

            // Save the updated plans back to localStorage
            UserInfo.trainingPlans = clientPlans;
            localStorage.setItem(UserEmail, JSON.stringify(UserInfo));

            // Re-render the plans table
            renderPlans();

            alert('Plan removed successfully!');
        }
    });
});
