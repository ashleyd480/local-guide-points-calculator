import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const SmartCalcResult = ({
  userData,
  userGoal,
  goalDate,
  frequency,
  difference,
  percentages,
  numberPerContribution,
  numberPerDateFrequency,
}) => {


  return (
    <>
      <p>
        Based on your goal points of {userGoal} you have a difference of{" "}
        {difference} that you say you want to acheive by:{" "}
        {goalDate.format("MM/DD/YYYY")} at {frequency} times per week, here is
        plan for you calulated, weighted based on your current percentages{" "}
      </p>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Current Percent</TableCell>
              <TableCell>Total Contributions Needed</TableCell>
              <TableCell>
                Contributions to contribute in a day at {frequency} per week
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(userData)
              .filter(([category, value]) => category !== "points")
              .map(
              ([category, value]) =>
                value > 0 && ( // only render if the value is greater than 0
                  <TableRow key={category}>
                    <TableCell>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </TableCell>
                    <TableCell>
                    {Math.round(percentages[category]) + "%"}
                    </TableCell>
                    <TableCell>
                      {numberPerContribution.get(category)}
                    </TableCell>
                    <TableCell>
                      {numberPerDateFrequency.get(category)}
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SmartCalcResult;
