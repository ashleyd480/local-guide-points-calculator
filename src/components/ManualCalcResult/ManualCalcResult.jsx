import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import "./ManualCalcResult.css";

const ManualCalcResult = ({
  userGoal,
  difference,
  goalDate,
  frequency,
  checkedPercentages,
  categoriesCheckedData,
  numberPerContribution,
  numberPerDateFrequency,
}) => {
  return (
    <>
      <p>
        Based on your goal points of <strong>{userGoal}</strong> you have a
        difference of <strong>{difference}</strong> that you say you want to
        achieve by: <strong>{goalDate.format("MM/DD/YYYY")}</strong> at{" "}
        <strong>{frequency}</strong> times per week. Here is the plan for you
        calculated, equally weighted based on categories you checked. 
      </p>

      <TableContainer component={Paper}>
        <Table className="manual-calc-table">
          {/* <Table > */}
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>{" "}
              <TableCell>Allocated Percent</TableCell>{" "}
              <TableCell>Total Contributions Needed</TableCell>{" "}
              <TableCell>
                Contributions to contribute in a day at {frequency} per week
              </TableCell>{" "}
            </TableRow>{" "}
          </TableHead>{" "}
          <TableBody>
            {categoriesCheckedData.map((category) => (
              // use Array.from so we can call .map on Map, the categoriesCheckedData is map data structure
              // we don't need to pass index paramater in this case since category is already unique identiifer
              <TableRow key={category.category}>
                <TableCell>
                  {category.category.charAt(0).toUpperCase() +
                    category.category.slice(1)}
                  {/* this capitalize the first letter and then concatenate rest of string, also as categories checked data is filtered array with key-value pair we have to use dot notation*/}
                </TableCell>{" "}
                <TableCell>
                  {Math.ceil(checkedPercentages[category.category]) + "%"}
                </TableCell>{" "}
                <TableCell>
                  {numberPerContribution.get(category.category)}
                </TableCell>
                <TableCell>
                  {numberPerDateFrequency.get(category.category)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>{" "}
      </TableContainer>
    </>
  );
};

export default ManualCalcResult;
