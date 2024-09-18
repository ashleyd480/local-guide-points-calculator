import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { categoryPointsMap } from '../../utils/dataUtils/categoryPointsMap';

const SmartCalcResult = ({
  userGoal,
  goalDate,
  frequency,
  percentages,
  numberPerContribution,
  numberPerDateFrequency,
}) => {
  return (
    <>
      <p>
        {" "}
        Based on your goal points of {userGoal} that you want to acheive by:{" "}
        {goalDate.format("MM/DD/YYYY")} at {frequency} times per week, here is plan for you
        calulated, weighted based on your current percentages{" "}
      </p>

      <TableContainer component={Paper}>
        {" "}
        <Table>
          {" "}
          <TableHead>
            {" "}
            <TableRow>
              {" "}
              <TableCell>Category</TableCell>{" "}
              <TableCell>Total Contributions Needed</TableCell>{" "}
                          <TableCell>Contributions to contribute in a day at {frequency} per week</TableCell>{" "}
            </TableRow>{" "}
          </TableHead>{" "}
          <TableBody>
            {" "}
            {Array.from(categoryPointsMap.keys()).map((category) => (
              <TableRow key={category}>
                {" "}
                <TableCell>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                        {/* this capitalize the first letter and then concatenate rest of string */}
                </TableCell>{" "}
                <TableCell>
                  {numberPerContribution.get(category) || 0}
                </TableCell>{" "}
                <TableCell>{numberPerDateFrequency.get(category) || 0}</TableCell>{" "}
              </TableRow>
            ))}{" "}
          </TableBody>{" "}
        </Table>{" "}
      </TableContainer>
    </>
  );
};

export default SmartCalcResult;
