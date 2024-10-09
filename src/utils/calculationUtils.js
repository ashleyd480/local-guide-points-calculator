import dayjs from 'dayjs';


export const calculateDifference = (points, goal) => {
    return goal - points;

    };


export const calculateDaysInBeteen = (goalDate) => {
    const today = dayjs();
    const selectedDate = dayjs(goalDate);

    // get difference in days
    const differenceInDays = selectedDate.diff(today, 'day');
    return differenceInDays ;
}

export const calculateFilteredPercentages = (categoriesCheckedData) => {
    const checkedCategoriesPercentages = {};
     
    console.log(categoriesCheckedData.length);
    let newPercentage = 100 / categoriesCheckedData.length;
    
  

    categoriesCheckedData.forEach((categoryData) => {
        // Use categoryData.category to access the category name
        checkedCategoriesPercentages[categoryData.category] = newPercentage;
    });
  
    
        return checkedCategoriesPercentages;
    
    }


// commenting this out for now due to edge case of say user select category(s) with % but still want to contribute
// we could potentially assign a default value to those that have 0% to allow accurate multiplication vs just returning 0 for those.. however what value could we choose leads us down a whole nother rabbit hole

// export const calculateFilteredPercentages = (percentages, checkedCategoryData) => {
//     const checkedCategoriesPercentages = {};
//     let totalOfCheckedPercentages = 0;

//     // for each category that is checked, we see its associated %
//     // we then add it up to get sum of percentages for checked

//     checkedCategoryData.forEach((category) => {
//         totalOfCheckedPercentages += percentages[category]
//     })

//     // then we divide the percentage for each checked category by that total %
//     // ^that would be the updated weight % for that category 
//     checkedCategoryData.forEach((category) => {
//         if (totalOfCheckedPercentages > 0) {
//             checkedCategoriesPercentages[category] = (percentages[category] / totalOfCheckedPercentages) * 100;
//         } else {
//             checkedCategoriesPercentages[category] = 0;
//         }
//     });

//     return checkedCategoriesPercentages;

// }