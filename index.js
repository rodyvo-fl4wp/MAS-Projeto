// ADD PROFESSIONAL ACCOUNT//

var ProfessionalAccount = {
                name: 'Poco',
                accountType: 'professional',
                password: 'pocoloco',
                students:{
                    student1: 'ro.dyvo@ua.pt',
                    student2: 'sofiaramos@ua.pt',
                    student3: 'joaoamaral@ua.pt',
                    student4: 'antoniolima@ua.pt',
                    student5: 'carlossobreiro@ua.pt',
                }
            }

            localStorage.setItem('pocoloco@ua.pt', JSON.stringify(ProfessionalAccount))


// ADD CHECK UPS//


const availableCheckUps = [
        {
            Date: "2024-12-20",
            Time: "10:00 AM",
            Type: "General",
            Location: "Clinic A",
        },
        {
            Date: "2024-12-22",
            Time: "2:00 PM",
            Type: "Dietitian",
            Location: "Clinic B",
        },
        {
            Date: "2024-12-25",
            Time: "9:00 AM",
            Type: "Follow-Up",
            Location: "Clinic C",
        },
        {
            Date: "2024-12-27",
            Time: "11:00 AM",
            Type: "General",
            Location: "Clinic D",
        },
        {
            Date: "2024-12-30",
            Time: "3:00 PM",
            Type: "Dietitian",
            Location: "Clinic E",
        },
    ];
    // Save the available check-ups to localStorage
    localStorage.setItem('Available CheckUps', JSON.stringify(availableCheckUps));

    console.log("Available check-ups have been added to localStorage.");


// ADD GYM CLASSES //

var AvailableClasses = {
                    Yoga: [
                        {
                        Day: 'Monday',
                        Time: '20:30',
                        Duration: 60
                        },
                        {
                        Day: 'Thursday',
                        Time: '20:30',
                        Duration: 60
                        },
                    ],
                    Pilates: [
                        {
                        Day: 'Monday',
                        Time: '13:00',
                        Duration: 40
                        },
                        {
                        Day: 'Monday',
                        Time: '17:30',
                        Duration: 50
                        },
                        {
                        Day: 'Wednesday',
                        Time: '12:10',
                        Duration: 40
                        },
                        {
                        Day: 'Wednesday',
                        Time: '17:30',
                        Duration: 50
                        },
                        {
                        Day: 'Thursday',
                        Time: '08:10',
                        Duration: 40
                        },
                        {
                        Day: 'Thursday',
                        Time: '17:30',
                        Duration: 50
                        },
                        {
                        Day: 'Friday',
                        Time: '17:30',
                        Duration: 50
                        }
                    ],
                    Zumba: [
                        {
                        Day: 'Monday',
                        Time: '12:10',
                        Duration: 40
                        },
                        {
                        Day: 'Monday',
                        Time: '19:30',
                        Duration: 50
                        },
                        {
                        Day: 'Tuesday',
                        Time: '19:30',
                        Duration: 50
                        },
                        {
                        Day: 'Thursday',
                        Time: '12:10',
                        Duration: 40
                        },
                        {
                        Day: 'Thursday',
                        Time: '19:30',
                        Duration: 40
                        },
                        {
                        Day: 'Friday',
                        Time: '13:00',
                        Duration: 40
                        },
                    ],
                }


                console.log(AvailableClasses)
                localStorage.setItem('Available Classes', JSON.stringify(AvailableClasses))

// ADD GYM AND NUTRITIONAL PLANS //

var GymPlanTypes = {
                'Basic': {
                    'Price': 10,
                    'AccessToGym': true,
                    'AccessToClasses': false,
                    'PersonalTrainerSessions': false,
                    'LockerRoomAccess': true,
                    'NutritionPlanIncluded': false,
                    'MonthlyClassesIncluded': 0,
                }, 
                'Standard': {
                    'Price': 15,
                    'AccessToGym': true,
                    'AccessToClasses': true,
                    'PersonalTrainerSessions': false,
                    'LockerRoomAccess': true,
                    'NutritionPlanIncluded': false,
                    'MonthlyClassesIncluded': 4,
                }, 
                'Unlimited': {
                    'Price': 20,
                    'AccessToGym': true,
                    'AccessToClasses': true,
                    'PersonalTrainerSessions': true,
                    'LockerRoomAccess': true,
                    'NutritionPlanIncluded': true,
                    'MonthlyClassesIncluded': 'Unlimited',
                }, 
            }

            var NutritionPlanTypes = {
                'Basic': {
                    'Price': 10,
                    'CustomizedMealPlan': true,
                    'MonthlyDietitianConsultations': 1,
                    'SupplementAdvice': false,
                    'PersonalizedNutritionalReports': false,
                    'bmiWeightTracking': true,
                }, 
                'Balanced': {
                    'Price': 15,
                    'CustomizedMealPlan': true,
                    'MonthlyDietitianConsultations': 2,
                    'SupplementAdvice': true,
                    'PersonalizedNutritionalReports': false,
                    'bmiWeightTracking': true,
                }, 
                'Performance': {
                    'Price': 20,
                    'CustomizedMealPlan': true,
                    'MonthlyDietitianConsultations': 4,
                    'SupplementAdvice': true,
                    'PersonalizedNutritionalReports': true,
                    'bmiWeightTracking': true,
                }, 
            }

            localStorage.setItem('GymPlans', JSON.stringify(GymPlanTypes))
            localStorage.setItem('NutritionPlans', JSON.stringify(NutritionPlanTypes))
