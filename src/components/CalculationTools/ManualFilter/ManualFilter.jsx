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
    { category: "qa", checked: false },
    { category: "edits", checked: false },
    { category: "reportedIncorrect", checked: false },
    { category: "placesAdded", checked: false },
    { category: "roadsAdded", checked: false },
    { category: "factsChecked", checked: false },
  ]);

    // react works on reference equality- so we make copy of the item so we can comparativley see if the checked status changed 
    // false conditon of ternary is if original attribute of item.category is unchecked and new attributed is checked
  const handleCheckboxChange = (category) => {
    setCategories((prevCategories) =>
      prevCategories.map((item) =>
        item.category === category
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  };
    
    // send the checked categories back
    useEffect(() => {
        // call the parent's callback function with the checked categories
        onCategoriesChange(categories.filter(category=>category.checked));
    }, [categories, onCategoriesChange]);
    // it was reccomendmened by chatgpt to include the function in dependency array; to do- i want to search why
    

  return (
    <div>
      <p>Check which one you want to contribute to</p>
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
