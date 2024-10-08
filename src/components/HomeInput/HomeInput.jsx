import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button, FormControl, Grid } from "@mui/material";
import { validateHomeInputs } from "../../utils/validateUtils/validateHome";

const HomeInput = ({ setUserData, userData, setValid }) => {
  // userdata to initlize form
  // if user data was not initlized then we are updating unitalized states like username, etc
  // make a copy of userData so we can display it and still modify it without updating the userData
  // we are updating the copy of userData so thats why we do formData.username,etc
  // and this way when user goes back it will still retain previously entered info
  const [formData, setFormData] = useState({ ...userData });
  const [formError, setFormError] = useState("");

  // handle when user enters data
  const handleChange = (event) => {
    const { name, value } = event.target;
    const numericValue = parseInt(value, 10); // to handle numbers displaying as string
    // 10 is the radix for base 10- allows the string numbers to be parsed as numbers


    // takes current form data and then makes a copy of it where values are updated for ones where fields changed 
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: numericValue,
    }));
  };

  // prevent submission until user fixes their error
  const onSubmit = (event) => {
    event.preventDefault();
    if (validateHomeInputs(setFormError, formData)) {
      setFormError(""); // clear error message if valid
      setUserData(formData);
      localStorage.removeItem("userData");
      // save new userData to local storage
      localStorage.setItem("userData", JSON.stringify(formData));

      setValid(true);
    }
  };

  // error are logged through the formcontrol

  // if user change mind and want to navigate back home


  return (
    <div>
      <TextField
        label="Points"
        name="points"
        value={
          formData.points !== undefined && formData.points !== null
            ? formData.points
            : ""
        } // to resolve the uncontrolled component by giving formData.points a default value
        // this is then set as userData with the handleChange; we also give it an inital value
        onChange={handleChange}
        placeholder="Enter your total points"
        variant="outlined"
        type="number" // ensure no Naan, no commas, no whitespace
        helperText="Please enter your current points, without comma"
        required
      />

      <Grid container spacing={2}>
        {[
          { label: "Reviews", name: "reviews" },
          { label: "Ratings", name: "ratings" },
          { label: "Photos", name: "photos" },
          { label: "Videos", name: "videos" },
          { label: "Captions", name: "captions" },
          { label: "Answers", name: "answers" },
          { label: "Edits", name: "edits" },
          { label: "Reported Incorrect", name: "reportedIncorrect" },
          { label: "Places Added", name: "placesAdded" },
          { label: "Roads Added", name: "roadsAdded" },
          { label: "Facts Checked", name: "factsChecked" },
          { label: "Questions and Answers", name: "questionsAndAnswers" },
        ].map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            <TextField
              label={field.label}
              name={field.name}
              value={
                formData[field.name] !== undefined &&
                formData[field.name] !== null
                  ? formData[field.name]
                  : ""
              } // to resolve the uncontrolled component by giving formData a default value
              onChange={handleChange}
              variant="outlined"
              type="number" // only will accept numbers but materialUI will still display as String so have to parse int
              fullWidth
              margin="normal"
              helperText={`Please enter your number of ${field.label}, without comma`}
            />
          </Grid>
        ))}
      </Grid>

      {formError && ( //render error if user left points blank
        <div>
          <h4 className="errorContainer">{formError}</h4>
        </div>
      )}
      <div className="buttonGroup">
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
        
      </div>
    </div>
  );
};

export default HomeInput;
