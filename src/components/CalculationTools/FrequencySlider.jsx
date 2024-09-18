import React from 'react';
import { Box, Slider } from '@mui/material';
import frequencyMarks from '../../utils/dataUtils/frequencyMarks';

const FrequencySlider = ({ frequency, handleSliderChange }) => (
  <Box sx={{ width: 300 }}>
    <p> Enter how often you want to do per week :)</p>
    <Slider
      aria-label="Frequency"
      defaultValue={1}
      value={frequency}
      onChange={handleSliderChange}
      step={1} // Adjusting the step to match the mark values
      marks={frequencyMarks} 
      valueLabelDisplay="on" // force numbers to show on ticks
      min={1}
      max={7}
    />
  </Box>
);

export default FrequencySlider;