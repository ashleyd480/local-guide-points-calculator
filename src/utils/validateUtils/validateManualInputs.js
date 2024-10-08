export const validateManualInputs = (setValid, setformErrors, userGoal, userData, daysInBetween, frequency, categoriesCheckedData) => {

  // initialize our values (these values will be updated but in use state they are const)
  let isValid = true;
  let formErrors = {}; // an object of errors- key is field like userGoal and value is error message
  const userPoints = userData.points;

  console.log("Frequency:", frequency);
  console.log("Days in Between:", daysInBetween);
  
  // #learning, have to use seperate if statements, otherwise using if/else it will only display first error it encounters
  // concatenates errors with ternary- checks if existing error and if not- just show new error
  // if existing error(s)- then take the current errors and display them first and append new error
  // only needed this ternary because multiple validation checks for that one field 

  if (!userGoal) {
    formErrors.userGoal = "Your goal of points is required and can't be 0.";
    isValid = false;
  }
    
  if (userGoal <= userPoints) {
    formErrors.userGoal =
      (formErrors.userGoal ? formErrors.userGoal + ", " : "") +
      "You must enter a goal that is greater than the current number of points.";
    isValid = false;
  }
    
  if (userGoal === 0) {
    formErrors.userGoal =
      (formErrors.userGoal ? formErrors.userGoal + ", " : "") +
      "Your goal can't be 0.";
    isValid = false;
  }
    
  if (isNaN(userGoal)) {
    formErrors.userGoal =
      (formErrors.userGoal ? formErrors.userGoal + ", " : "") +
      "Please enter a valid number for your goal.";
    isValid = false;
  }
    
  if (/,/.test(userGoal)) {
    formErrors.userGoal =
      (formErrors.userGoal ? formErrors.userGoal + ", " : "") +
      "Please do not use commas in your goal.";
    isValid = false;
  }
  
  if (frequency > daysInBetween) {
    if (!(daysInBetween === 0 && frequency === 1)) {  
      formErrors.frequency = "Your frequency exceeds the number of days to reach your goal date. Please decrease the frequency slider or select a later date.";
      isValid = false;
      // originally had this as nested if/else but it was incorrectly setting is-valid to true even if other validation inputs did not pass
    }
  }
    

      if (categoriesCheckedData.length === 0) {
        formErrors.checkedCategories = "Please select at least one category.";
        isValid = false;

      }
    
   
  
    setformErrors(formErrors);
    setValid(isValid);

    return isValid;
    // learned don't have to put in {}, otherwise not correctly return boolean; to return value back- tested by see if non valid input can console.log "is valid"
  };

