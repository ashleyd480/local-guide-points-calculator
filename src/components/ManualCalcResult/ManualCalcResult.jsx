import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
  } from "@mui/material";
  
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
         
                Based on your goal points of {userGoal} you have a difference of {difference} that you say you want to acheive by:{" "}
          {goalDate.format("MM/DD/YYYY")} at {frequency} times per week here is
          plan for you calulated, weighted based on your equal distribution percentages{" "}
        </p>
  
        <TableContainer component={Paper}>
        
          <Table>
            
            <TableHead>
             
              <TableRow>
               
                            <TableCell>Category</TableCell>{" "}
                            <TableCell>Current Percent</TableCell>{" "}
           
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
                    {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
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
  