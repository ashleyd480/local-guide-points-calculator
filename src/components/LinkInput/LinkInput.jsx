
import React, { useState } from "react";

import { TextField, Button, FormControl } from '@mui/material';

const LinkInput = ({ profileLink, setProfileLink, handleFetchMetadata }) => {
    const handleChange = (event) => {
        setProfileLink(event.target.value)
    }; // handle when user link updates 

    const [linkError, setLinkErrors] = useState("");
    const [valid, setValid] = useState(true);

    

    // Validate input fields and set errors
    const validateInputs = () => {
        // initialize our values (these values will be updated but in use state they are const)
        let isValid = true;
        let linkError = ""

        if (!profileLink) {
            linkError = "Profile link is required.";
            isValid = false;
        }
        else {
            //regex for the Google Maps contribution URL that I found out
            const regex = /^https:\/\/www\.google\.com\/maps\/contrib\/\d+$/;
    
            // test the profile link against the regex
            // regex.test is a boolean method to see if string matches input
            if (!regex.test(profileLink)) {
                linkError = "Profile link is not valid. It should be in the format: https://www.google.com/maps/contrib/0123456789";
                isValid = false;
            }
            setLinkErrors(linkError);
            setValid(isValid);
            return isValid;
        };
        
    }

    // Handle form submission
    const onClick = (event) => {
        event.preventDefault();
        if (validateInputs()) {
           handleFetchMetadata(); // prevent submission until user fixes their error 
        }
    };

    // error are logged through the formcontrol 

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <TextField
                    id="profile-link-input"
                    label="Profile Link"
                    value={profileLink}
                    onChange={handleChange}
                    placeholder="Enter your profile link"
                    helperText="Please enter the profile link of your public profile"
                    variant="outlined"
                />
            </FormControl>
            
            <Button variant="contained" onClick={onClick}>Submit</Button>
        </div>
    );
};

export default LinkInput;