import React, { useState } from "react";
import { TextField, Button, FormControl } from "@mui/material";
import { validateLink } from "../../utils/validateUtils/validatelink";

const LinkInput = ({ profileLink, setProfileLink, handleFetchMetadata }) => {
  const [linkError, setLinkError] = useState("");
  const [valid, setValid] = useState(true);

 
// handle when user enters profile link
  const handleChange = (event) => {
    setProfileLink(event.target.value);
  }; 

 // prevent submission until user fixes their error
  const onClick = (event) => {
    event.preventDefault();
    if (validateLink(setValid, setLinkError, profileLink)) {
      console.log ("this is valid")
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
