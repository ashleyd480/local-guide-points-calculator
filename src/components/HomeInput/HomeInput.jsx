import React, { useState } from "react";
import { TextField, Button, FormControl, Grid } from "@mui/material";

const HomeInput = ({
  setUserData,
  userData,

  setValid,
}) => {


  // const [formData, setFormData] = useState({
  //   points: 0,
  //   reviews: 0,
  //   ratings: 0,
  //   photos: 0,
  //   videos: 0,
  //   captions: 0,
  //   answers: 0,
  //   edits: 0,
  //   reportedIncorrect: 0,
  //   placesAdded: 0,
  //   roadsAdded: 0,
  //   factsChecked: 0,
  //   qa: 0,
  // });

  //userdata to initlize form
  //if user data was not initlized then we are updating unitalized states like username, etc
  // make a copy of userData so we can display it and still modify it without updating the userdata
  // we are updating the copy of user data so thats why we do formData.username,etc
  // and this way when user goes back it will still retain previously entered info 
  const [formData, setFormData] = useState({ ...userData });

  // handle when user enters data
  const handleChange = (event) => {
    const { name, value } = event.target;
    const numericValue = parseInt(value, 10) // to handle numbers displaying as string
  
    setFormData((prevFormData) => ({
      ...prevFormData,
    
      [name]: numericValue
    }));
  };

  // prevent submission until user fixes their error
  const onSubmit = (event) => {
    event.preventDefault();
      setUserData(formData); 
      localStorage.removeItem("userData");
      // save new userData to local storage
    localStorage.setItem("userData", JSON.stringify(formData));
    setValid(true);
    
  };

  // error are logged through the formcontrol

  return (
    <div>
      <TextField
        label="Points"
        name="points"
        value={formData.points} // this is then set as userData with the handleChange
        onChange={handleChange}
        placeholder="Enter your total points"
        variant="outlined"
        type="number" // ensure no Naan, no commas, no whitespace
        helperText="Please enter your current, without comma"
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
          { label: "QA", name: "qa" },
        ].map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            <TextField
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              helperText={`Please enter your number of ${field.label}, without comma`}
            />
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default HomeInput;
