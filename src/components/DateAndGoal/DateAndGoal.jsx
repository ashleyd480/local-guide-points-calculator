import React, { useState } from "react";

import { TextField, Button, FormControl, Box, Slider } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { calculateNumberPerContribution } from "../../utils/smartCalculateFormulas/smartDivide";
import {
  calculateDifference,
  calculateDaysInBeteen,
} from "../../utils/calculationUtils";
import { validateInputs } from "../../utils/validateUtils/validateInputs";
import frequencyMarks from "../../utils/dataUtils/frequencyMarks";

const DateAndGoal = ({ userData, percentages }) => {
  const [valid, setValid] = useState(true);
  const [difference, setDifference] = useState(0);
  const [numberPerContribution, setNumberPerContribution] = useState({});
  const [userGoal, setUserGoal] = useState(0);
  const [goalDate, setGoalDate] = useState(dayjs().add(1, "day")); // default to tomorrow's date
  const [frequency, setFrequency] = useState(1);
  const [formErrors, setformErrors] = useState({
    userGoal: "",
    goalDate: "",
    frequency: "",
  });

  /* ---- ON CHANGE HANDLER ---- */

  const handleChange = (event) => {
    setUserGoal(event.target.value);
  };

  // need to handle date change seperately b/c w/ MUI it doesn't use event object for change but rather returns a `new date value` *** #learning!
  const handleDateChange = (newDate) => {
    setGoalDate(newDate);
  };

  // for  handle slider- since it doesn't use event object #learning
  const handleSliderChange = (event, newValue) => {
    setFrequency(newValue);
  };

  /* ---- VALIDATION ---- */

  // format goalDate as MM, dd, yyyy - otherwise rendering as unix
  const formattedGoalDate = goalDate.format("MM, DD, YYYY");
  const daysInBetween = calculateDaysInBeteen(formattedGoalDate);

  /* ----ON CLICK ---- */
  // prevent submission until user fixes their error for button
  const onSmartCalculate = (event) => {
    event.preventDefault();
    if (validateInputs(setValid,setformErrors, userGoal, userData )) {
      const difference = calculateDifference(
        userData.points,
        userGoal
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

  const onManualCalculate = (event) => {
    if (validateInputs(setValid, setformErrors, userGoal, userData)) {
      console.log("just testing date for now" + formattedGoalDate);
      console.log("and days in between is " + daysInBetween);
    }
  };

  return (
    <div>
      <p> Please enter your number without a comma! :)</p>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Desired Goal"
          name="userGoal"
          value={userGoal}
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
            value={goalDate}
            onChange={handleDateChange}
            minDate={dayjs().add(1, "day")} // restrict to dates at least one day from today! lovin' this feature!
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
        <Box sx={{ width: 300 }}>
          <p> Enter how often you want to do per week :)</p>
          <Slider
            aria-label="Frequency"
            defaultValue={1}
            value={frequency}
            onChange={handleSliderChange}
            step={1} // Adjusting the step to match the mark values
            marks={frequencyMarks}
            valueLabelDisplay="on" // force numbers to show on ticks
            min={1}
            max={7}
          />
        </Box>
      </FormControl>

      {/* creating an array of values of errors object- if there are values(errors)- we conditionally render them */}

      {Object.values(formErrors).length > 0 && (
        <div>
          {Object.values(formErrors).map((error, index) => (
            <h4 className="errorContainer" key={index}> {error} </h4>
          ))}
        </div>
      )}
      
      <Button variant="contained" onClick={onSmartCalculate}>
        Smart Calculate
      </Button>

      <Button variant="contained" onClick={onManualCalculate}>
        Manual Calculate
      </Button>
    </div>
  );
};

export default DateAndGoal;
