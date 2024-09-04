export const validateInputs = (setValid,setformErrors, userGoal, userData) => {

    // initialize our values (these values will be updated but in use state they are const)
    let isValid = true;
    let formErrors = {}; // an object of errors
    const userPoints = userData.points;
    if (!userGoal) {
      formErrors.userGoal = "Your goal of points is required and can't be 0.";
      isValid = false;
    } else if (userGoal <= userPoints || userGoal === 0) {
      formErrors.userGoal =
        "You must enter a goal that greater than current number of points";
      isValid = false;
    } else if (isNaN(userGoal)) {
      // check for valid number
      formErrors.userGoal = "Please enter a valid number for your goal.";
      isValid = false;
    } else if (/\,/.test(userGoal)) {
      // user can't use commas, else will produce Naan
      formErrors.userGoal = "Please do not use commas in your goal.";
      isValid = false;
    }
  
    setformErrors(formErrors);
    setValid(isValid);

    return { isValid };
  };

