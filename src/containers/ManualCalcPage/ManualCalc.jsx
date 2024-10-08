import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserDataContext";
import GoalInput from "../../components/CalculationTools/Goal/GoalInput";
import DateInput from "../../components/CalculationTools/Date/DateInput";
import FrequencySlider from "../../components/CalculationTools/Frequency/FrequencySlider";
import dayjs from "dayjs";
import { calculateNumberPerContribution } from "../../utils/smartCalculateFormulas/smartDivide";
import { calculateNumberPerDay } from "../../utils/smartCalculateFormulas/smartDivide";
import {
  calculateDifference,
  calculateDaysInBeteen,
} from "../../utils/calculationUtils";
import { validateManualInputs } from "../../utils/validateUtils/validateManualInputs";
import { Button } from "@mui/material";
import ManualInstructions from "../../components/Instructions/ManualInstructions";
import ManualFilter from "../../components/CalculationTools/ManualFilter/ManualFilter";
import ManualCalcResult from "../../components/ManualCalcResult/ManualCalcResult";
import { calculateFilteredPercentages } from "../../utils/calculationUtils";

const ManualCalc = () => {
  // port over userData info
  const { userData, setUserData } = useContext(UserDataContext);

  // port over percentages
  const location = useLocation();
  const { percentages } = location.state;
  const [checkedCategoriesPercentages, setCheckedCategoriesPercentages] =
    useState({});
  const [valid, setValid] = useState(false);
  const [difference, setDifference] = useState(0);
  const [numberPerContribution, setNumberPerContribution] = useState({});
  const [numberPerDateFrequency, setNumberPerDateFrequency] = useState({});
  const [userGoal, setUserGoal] = useState("");
  const [goalDate, setGoalDate] = useState(dayjs().add(1, "day")); // default to tomorrow's date
  const [frequency, setFrequency] = useState(1);
  const [formErrors, setformErrors] = useState({
    userGoal: "",
    goalDate: "",
    frequency: "",
    checkedCategories: "",
  });

  const [categoriesCheckedData, setCategoriesCheckedData] = useState([]); // checklist
  const [showTable, setShowTable] = useState(false); // state to track table visibility,this is then set to true when we click button

  // to receive checked cateegories, setting categoriesCheckedData to checked ones 
  const handleCategoriesChange = (checkedCategories) => {
    setCategoriesCheckedData(checkedCategories);
  };

  // to render user data on page refresh
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [setUserData]);

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
  // manage click of manual calculate
  const onManualCalculate = (event) => {
    event.preventDefault();
    setShowTable(false); // reset showing the table so if not validated, no table is shown
    if (
      validateManualInputs(
        setValid,
        setformErrors,
        userGoal,
        userData,
        daysInBetween,
        frequency,
        categoriesCheckedData
      )
    ) {
      console.log("the input is valid"); // tip I learned for seeing if validation works with test input
      const difference = calculateDifference(userData.points, userGoal);
      setDifference(difference);

      const checkedCategoriesPercentages = calculateFilteredPercentages(
        categoriesCheckedData
      );
      setCheckedCategoriesPercentages(checkedCategoriesPercentages);
      console.log("manual % ", checkedCategoriesPercentages);

      const numberPerContribution = calculateNumberPerContribution(
        difference,
        checkedCategoriesPercentages
      );
      console.log("the difference is " + difference);
      console.log("and days in between is " + daysInBetween);
      console.log(numberPerContribution);
      setNumberPerContribution(numberPerContribution);

      const numberPerDateFrequency = calculateNumberPerDay(
        difference,
        checkedCategoriesPercentages,
        daysInBetween,
        frequency
      );

      setNumberPerDateFrequency(numberPerDateFrequency);

      setShowTable(true);
    }
  };


  return (
    <div>
      <h3> Manual Calculate: </h3>
      <ManualInstructions />
      <GoalInput userGoal={userGoal} handleChange={handleChange} />
      <DateInput goalDate={goalDate} handleDateChange={handleDateChange} />
      <FrequencySlider
        frequency={frequency}
        handleSliderChange={handleSliderChange}
      />
      {/* {console.log(categoriesCheckedData)} */}
      <ManualFilter onCategoriesChange={handleCategoriesChange} />

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
      <div className="buttonGroup">
        <Button variant="contained" onClick={onManualCalculate}>
          Manual Calculate
        </Button>
      </div>

      {showTable && (
        <ManualCalcResult
          userGoal={userGoal}
          difference={difference}
          goalDate={goalDate}
          frequency={frequency}
          checkedPercentages={checkedCategoriesPercentages}
          categoriesCheckedData={categoriesCheckedData}
          numberPerContribution={numberPerContribution}
          numberPerDateFrequency={numberPerDateFrequency}
        />
      )}
    </div>
  );
};
export default ManualCalc;
