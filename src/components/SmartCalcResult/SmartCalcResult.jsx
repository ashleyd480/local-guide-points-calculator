import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { categoryPointsMap } from "../../utils/dataUtils/categoryPointsMap";

const SmartCalcResult = ({
  userGoal,
    goalDate,
    frequency,
    difference,
    percentages,
  checkedPercentages,
  numberPerContribution,
  numberPerDateFrequency,
}) => {
  return (
    <>
      <p>
        {" "}
       Based on your goal points of {userGoal} you have a difference of {difference} that you say you want to acheive by:{" "}
        {goalDate.format("MM/DD/YYYY")} at {frequency} times per week, here is
        plan for you calulated, weighted based on your current percentages{" "}
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
                          <TableCell>Current Percent</TableCell>{" "}
         
              <TableCell>Total Contributions Needed</TableCell>{" "}
              <TableCell>
                Contributions to contribute in a day at {frequency} per week
              </TableCell>{" "}
            </TableRow>{" "}
          </TableHead>{" "}
          <TableBody>
            {" "}
                      {Array.from(categoryPointsMap.keys()).map((category) => (
                          // use Array.from so we can call .map on Map
                          // we don't need to pass index paramater in this case since category is already unique identiifer 
              <TableRow key={category}>
                              {" "}
                              
                              <TableCell>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  {/* this capitalize the first letter and then concatenate rest of string */}
                              </TableCell>{" "}
                              <TableCell>
                                  {console.log("the percentages is " + percentages)}
                  {Math.round(percentages[category]) + "%"}
                </TableCell>{" "}
              
                <TableCell>
                  {numberPerContribution.get(category) || 0}
                </TableCell>{" "}
                <TableCell>
                  {numberPerDateFrequency.get(category) || 0}
                </TableCell>{" "}
              </TableRow>
            ))}{" "}
          </TableBody>{" "}
        </Table>{" "}
      </TableContainer>
    </>
  );
};

export default SmartCalcResult;
