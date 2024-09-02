
import React, { useState } from "react";

import { Input, Button, FormHelperText, FormControl } from '@mui/material';
// FormHelper and FormControl for error handling messsages on material UI
// This allow me to shorten my code on container InputPage as error handling done here

const InputForm = ({ userPointsProp, inputDataProp, setInputData, onSubmit }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputData((prevInputData) => ({
            ...prevInputData,
            [name]: value,
        }));
    };

    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(true);

    



    // Validate input fields and set errors
    const validateInputs = () => {
        // initialize our valus
        const errors = {}; // create a new errors object to avoid mutating the previous state
        let isValid = true;

        if (!inputDataProp.profileLink) {
            errors.profileLink = "Profile link is required.";
            isValid = false;
        }
        else {
            //regex for the Google Maps contribution URL that I found out
            const regex = /^https:\/\/www\.google\.com\/maps\/contrib\/\d+$/;
    
            // Test the profile link against the regex
            // regex.test is a boolean method to see if string matches input
            if (!regex.test(inputDataProp.profileLink)) {
                errors.profileLink = "Profile link is not valid. It should be in the format: https://www.google.com/maps/contrib/0123456789";
                isValid = false;
            }

            if (!inputDataProp.desiredPoints) {
                errors.desiredPoints = "Desired points are required.";
                isValid = false;
            } else if (isNaN(inputDataProp.desiredPoints)) {
                errors.desiredPoints = "Please enter a valid number for desired points.";
                isValid = false;
            }
            else if (inputDataProp.desiredPoints <= userPointsProp) {
                errors.desiredPoints = "Your desired points cant be less than your current points";
                isValid = false;
            }

            setErrors(errors);
            setValid(isValid);
            return isValid;
        };
        
    }

    // Handle form submission
    const onClick = (event) => {
        event.preventDefault();
        if (validateInputs()) {
            onSubmit(); // prevent submission until user fixes their error 
        }
    };

    // error are logged through the formcontrol 

    return (
        <div>
            <form>
                <FormControl fullWidth error={!!errors.profileLink}>
                    <label>
                        Profile Link:
                        <Input
                            type="text"
                            name="profileLink"
                            value={inputDataProp.profileLink}
                            onChange={handleChange}
                            placeholder="Enter your profile link"
                        />
                    </label>
                    <FormHelperText>{errors.profileLink}</FormHelperText>
                </FormControl>
                <br />
                <FormControl fullWidth error={!!errors.desiredPoints}>
                    <label>
                        Desired Points:
                        <Input
                            type="number"
                            name="desiredPoints"
                            value={inputDataProp.desiredPoints}
                            onChange={handleChange}
                            placeholder="Enter desired points"
                        />
                    </label>
                    <FormHelperText>{errors.desiredPoints}</FormHelperText>
                </FormControl>
                <Button variant="contained" onClick={onClick}>Submit</Button>
            </form>
        </div>
    );
};

export default InputForm;