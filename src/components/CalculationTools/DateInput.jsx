import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

const DateInput = ({ goalDate, handleDateChange }) => (
  <div>
    <p> Enter desired date to reach goal by :)</p>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        name="goalDate"
        value={goalDate}
        onChange={handleDateChange}
        minDate={dayjs().add(1, "day")} // restrict to dates at least one day from today! lovin' this feature!
        renderInput={(params) => (
          <TextField
            {...params} // customize how text field appears
            placeholder="Enter the desired date"
            helperText="Please select a valid date"
            variant="outlined"
          />
        )}
      />
    </LocalizationProvider>
  </div>
);

export default DateInput;
