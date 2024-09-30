import React from "react";
import { TextField, FormControl } from "@mui/material";

const GoalInput = ({ userGoal, handleChange }) => (
    <div>
    <FormControl fullWidth margin="normal">
      <TextField
        label="Desired Goal"
        name="userGoal"
        value={userGoal}
        onChange={handleChange}
        placeholder="Enter your desired points"
        helperText="Please enter the desired points, without comma"
        variant="outlined"
        type = "number"
      />
    </FormControl>
  </div>
);

export default GoalInput;
