import React, { useState } from "react";

import { TextField, Button, FormControl } from "@mui/material";
import { calculateNumberPerContribution } from "../../utils/smartCalculateFormulas/smartDivide";
import { calculateDifference } from "../../utils/calculationUtils";


const DateAndGoal = ({userGoal, setUserGoal, userData, percentages}) => {
  const [goalError, setGoalError] = useState("");
const [valid, setValid] = useState(true);
  const [difference, setDifference] = useState(0);
  const [numberPerContribution, setNumberPerContribution] = useState({});

    const handleChange = (event) => setUserGoal(event.target.value);


      // validate input fields and set errors
        const validateInputs = () => {
        // initialize our values (these values will be updated but in use state they are const)
        let isValid = true;
        let errorMessage = "";
        const userPoints = userData.points;
        if (!userGoal) {
            errorMessage = "Your goal of poitns is required.";
            isValid = false;
        }
        else if (userGoal <= userPoints || userGoal === 0) {
            errorMessage =
            "You must enter a goal that greater than current number of points";
          isValid = false;
        }
        else if (isNaN(userGoal)) {// check for valid number
            errorMessage = "Please enter a valid number for your goal.";
            isValid = false;
        } else if (/\,/.test(userGoal)) {// user can't use commas, else will produce Naan
            errorMessage = "Please do not use commas in your goal.";
            isValid = false;
        }
        setGoalError(errorMessage);
        setValid(isValid);

        return isValid;
    }

 


    // prevent submission until user fixes their error
    const onClick = (event) => {
        event.preventDefault();
      if (validateInputs()) {
        const difference = calculateDifference(userData.points, userGoal);
        setDifference(difference);
  
          const numberPerContribution = calculateNumberPerContribution(difference, percentages);
          console.log ("the difference is " + difference )
          console.log(numberPerContribution);
          setNumberPerContribution(numberPerContribution)
        }
    }

  return (
      <div>
          <p> Please enter your number without a comma! :)</p>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Desired Goal"
          value={userGoal}
          onChange={handleChange}
          placeholder="Enter your desired points"
          helperText="Please enter the desired points, without comma"
          variant="outlined"
        />
      </FormControl>
      {goalError && <h4 className="errorContainer">{goalError}</h4>}
      <Button variant="contained" onClick={onClick}>
        Smart Calculate
      </Button>
    </div>
  );
};

export default DateAndGoal;
