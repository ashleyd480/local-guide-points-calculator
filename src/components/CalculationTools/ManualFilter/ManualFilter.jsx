import { useState, useContext, useEffect } from "react";
import {
  List,
  ListItem,
  Checkbox,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { categoryPointsMap } from "../../../utils/dataUtils/categoryPointsMap";

const ManualFilter = ({onCategoriesChange}) => {
    // to keep track of checks, and we pass this back to parent component with callback
    // #learning #refresher 
  const [categories, setCategories] = useState([
    { category: "reviews", checked: false },
    { category: "ratings", checked: false },
    { category: "photos", checked: false },
    { category: "videos", checked: false },
    { category: "captions", checked: false },
    { category: "answers", checked: false },
    { category: "questionsAndAnswers", checked: false },
    { category: "edits", checked: false },
    { category: "reportedIncorrect", checked: false },
    { category: "placesAdded", checked: false },
    { category: "roadsAdded", checked: false },
    { category: "factsChecked", checked: false },
  ]);

    // react works on reference equality- so we make copy of the item so we can comparativley see if the checked status changed 
  const handleCheckboxChange = (category) => {
    setCategories((prevCategories) =>
      prevCategories.map((item) =>
        item.category === category // for each item see if the category matches the category checked 
          ? { ...item, checked: !item.checked } // if it does, then we want to flip the checked status
          : item // if it doesn't match, then we want to keep the item as it is
      )
    );
  };
    
    // send the checked categories back
    useEffect(() => {
        // call the parent's callback function with the checked categories
        onCategoriesChange(categories.filter(category=>category.checked));
    }, [categories, onCategoriesChange]);
  // if function is prop passed down from parent, then we want to make sure we include it in the dependency array
  // this could be an issue if parent uses that function with data that changes over time, and if we don't include it in dependency- this can mean outdated data 
  // but in our case we are not using that function with data that changes over time, so we can safely exclude it if we wanted 
    

  return (
    <div>
      <p>Check which one(s) you want to contribute to</p>
      <List>
        {Array.from(categoryPointsMap.entries()).map(
          (
            [category, points],
            index //create array of key-value pairs to map
          ) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={category.checked}
                  onChange={() => handleCheckboxChange(category)}
                  inputProps={{
                    "aria-labelledby": `checkbox-list-label-${index}`,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={`${category} : ${points} points`}
                // secondary={`Points: ${points}`}
              />
            </ListItem>
          )
        )}
      </List>
    </div>
  );
};

export default ManualFilter;
