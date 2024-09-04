import React, { useState } from "react";

import { TextField, Button, FormControl } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { calculateNumberPerContribution } from "../../utils/smartCalculateFormulas/smartDivide";
import {
  calculateDifference,
  calculateDaysInBeteen,
} from "../../utils/calculationUtils";

const DateAndGoal = ({ userData, percentages }) => {
  const [goalError, setGoalError] = useState("");
  const [valid, setValid] = useState(true);
  const [difference, setDifference] = useState(0);
  const [numberPerContribution, setNumberPerContribution] = useState({});
  // const [userGoal, setUserGoal] = useState(0);

  const [inputFormData, setInputFormData] = useState({
    userGoal: 0,
    goalDate: dayjs().add(1, 'day') // default to tomorrow's date
  });
  // const [goalDate, setGoalDate] = React.useState(dayjs());

  const handleChange = (event) => {
    const { name, value } = event.target; // destructure to access the .name and .value properties
    setInputFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // update the value of that name key from input form
    }));
  };

// need to handle date change seperately b/c w/ MUI it doesn't use event object for change but rather returns a `new date value` *** #learning!
  const handleDateChange = (newDate) => {
    setInputFormData((prevFormData) => ({
      ...prevFormData,
      goalDate: newDate,
    }));
  };

  // keeping variables cleaner
  const userGoal = inputFormData.userGoal;
  const goalDate = inputFormData.goalDate;
  // format goalDate as MM, dd, yyyy - otherwise rendering as unix
  const formattedGoalDate = inputFormData.goalDate.format("MM, DD, YYYY");

  // validate input fields and set errors
  const validateInputs = () => {
    // initialize our values (these values will be updated but in use state they are const)
    let isValid = true;
    let errorMessage = "";
    const userPoints = userData.points;
    if (!userGoal) {
      errorMessage = "Your goal of poitns is required.";
      isValid = false;
    } else if (userGoal <= userPoints || userGoal === 0) {
      errorMessage =
        "You must enter a goal that greater than current number of points";
      isValid = false;
    } else if (isNaN(userGoal)) {
      // check for valid number
      errorMessage = "Please enter a valid number for your goal.";
      isValid = false;
    } else if (/\,/.test(userGoal)) {
      // user can't use commas, else will produce Naan
      errorMessage = "Please do not use commas in your goal.";
      isValid = false;
    }
    setGoalError(errorMessage);
    setValid(isValid);

    return isValid;
  };

  // prevent submission until user fixes their error for button
  const onClick = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      const difference = calculateDifference(
        userData.points,
        inputFormData.userGoal
      );
      setDifference(difference);

      const numberPerContribution = calculateNumberPerContribution(
        difference,
        percentages
      );
      console.log("the difference is " + difference);
      console.log(numberPerContribution);
      setNumberPerContribution(numberPerContribution);
    }
  };

  // manage click of manual calculate

  const onClick2 = (event) => {
    const daysInBetween = calculateDaysInBeteen(formattedGoalDate);
    console.log("just testing date for now" + formattedGoalDate);
    console.log("and days in between is " + daysInBetween);
  };

  return (
    <div>
      <p> Please enter your number without a comma! :)</p>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Desired Goal"
          name="userGoal"
          value={inputFormData.userGoal}
          onChange={handleChange}
          placeholder="Enter your desired points"
          helperText="Please enter the desired points, without comma"
          variant="outlined"
        />
        <p> Enter desired date to reach goal by :)</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            name="goalDate"
            value={inputFormData.goalDate}
            onChange={handleDateChange}
            minDate={dayjs().add(1, 'day')} // restrict to dates at least one day from today! lovin' this feature!
            renderInput={(
              params // customize how text field appears
            ) => (
              <TextField
                {...params}
                placeholder="Enter the desired date"
                helperText="Please select a valid date"
                variant="outlined"
              />
            )}
          />
        </LocalizationProvider>
      </FormControl>
      {goalError && <h4 className="errorContainer">{goalError}</h4>}
      <Button variant="contained" onClick={onClick}>
        Smart Calculate
      </Button>

      <Button variant="contained" onClick={onClick2}>
        Manual Calculate
      </Button>
    </div>
  );
};

export default DateAndGoal;
