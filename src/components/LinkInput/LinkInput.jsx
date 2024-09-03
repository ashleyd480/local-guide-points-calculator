import React, { useState } from "react";


import { TextField, Button, FormControl } from "@mui/material";

const LinkInput = ({ profileLink, setProfileLink, handleFetchMetadata }) => {
  const [linkError, setLinkError] = useState("");
  const [valid, setValid] = useState(true);

 
// handle when user enters profile link
  const handleChange = (event) => {
    setProfileLink(event.target.value);
  }; 

  // validate input fields and set errors
  const validateInputs = () => {
    // initialize our values (these values will be updated but in use state they are const)
    let isValid = true;
    let errorMessage = "";

    if (!profileLink) {
      errorMessage = "Profile link is required.";
      isValid = false;
    } else {
      //regex for the Google Maps contribution URL that I found out
      const regex = /^https:\/\/www\.google\.com\/maps\/contrib\/\d+$/;

      // test the profile link against the regex
      // regex.test is a boolean method to see if string matches input
      if (!regex.test(profileLink)) {
        errorMessage =
          "Profile link is not valid. It should be in the format: https://www.google.com/maps/contrib/0123456789";
        isValid = false;
      }
    }
    setLinkError(errorMessage); // to move this outside of the if statement
    setValid(isValid);
    return isValid;
  };

 // prevent submission until user fixes their error
  const onClick = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      handleFetchMetadata(); 
    }
  };

  // error are logged through the formcontrol

  return (
    <div>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Profile Link"
          value={profileLink}
          onChange={handleChange}
          placeholder="Enter your profile link"
          helperText="Please enter the profile link of your public profile"
          variant="outlined"
        />
      </FormControl>
      {linkError && <h4 className="errorContainer">{linkError}</h4>}
      <Button variant="contained" onClick={onClick}>
        Submit
      </Button>
    </div>
  );
};

export default LinkInput;
