import React, { useState } from "react";
import GoalInput from "../../components/CalculationTools/GoalInput";
import DateInput from "../../components/CalculationTools/DateInput";
import FrequencySlider from "../../components/CalculationTools/FrequencySlider";
import dayjs from "dayjs";
import { calculateNumberPerContribution } from "../../utils/smartCalculateFormulas/smartDivide";
import { calculateNumberPerDay } from "../../utils/smartCalculateFormulas/smartDivide";
import {
  calculateDifference,
  calculateDaysInBeteen,
} from "../../utils/calculationUtils";
import { validateInputs } from "../../utils/validateUtils/validateInputs";
import { Button } from "@mui/material";


const DateAndGoal = ({ userData, percentages }) => {
  const [valid, setValid] = useState(true);
  const [difference, setDifference] = useState(0);
  const [numberPerContribution, setNumberPerContribution] = useState({});
  const [numberPerDateFrequency, setNumberPerDateFrequency] = useState({});
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
    if (validateInputs(setValid, setformErrors, userGoal, userData)) {
      console.log("the input is valid"); // tip I learned for seeing if validation works with test input
      const difference = calculateDifference(userData.points, userGoal);
      setDifference(difference);

      const numberPerContribution = calculateNumberPerContribution(
        difference,
        percentages
      );
      console.log("the difference is " + difference);
      console.log(numberPerContribution);
      setNumberPerContribution(numberPerContribution);

      const numberPerDateFrequency = calculateNumberPerDay(
        difference,
        percentages,
        daysInBetween,
        frequency
      );

      setNumberPerDateFrequency(numberPerDateFrequency);
  
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
      <GoalInput userGoal={userGoal} handleChange={handleChange} />
      <DateInput goalDate={goalDate} handleDateChange={handleDateChange} />
      <FrequencySlider
        frequency={frequency}
        handleSliderChange={handleSliderChange}
      />
      {/* <ErrorMessages formErrors={formErrors} />
      <CalculateButtons
        onSmartCalculate={onSmartCalculate}
        onManualCalculate={onManualCalculate}
      /> */}

      {/* creating an array of values of errors object- if there are values(errors)- we conditionally render them */}

      {Object.values(formErrors).length > 0 && (
        <div>
          {Object.values(formErrors).map((error, index) => (
            <h4 className="errorContainer" key={index}>
              {" "}
              {error}{" "}
            </h4>
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
