import React from "react";
import { TextField, FormControl } from "@mui/material";

const GoalInput = ({ userGoal, handleChange }) => (
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
    </FormControl>
  </div>
);

export default GoalInput;
