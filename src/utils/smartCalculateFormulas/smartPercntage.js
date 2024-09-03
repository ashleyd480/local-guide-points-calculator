// to see current user % to get behavior trend
// filter the list

const filterObject = (obj, keysToExclude) => {
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([key]) => !keysToExclude.includes(key))
    );
};


// get the sum of total number of contributions
const calculateTotal = (obj) => {
    let totalContributions = 0;
    for (const value of Object.values(obj)) {
        totalContributions += value;
        console.log("iterating value" + value + "and the running sum is " + totalContributions);
    }
    return totalContributions;
}

export const calculateUserPercentage = (obj) => {
    
    const filteredUserData = filterObject(obj, ["points", "level"]);
    console.log("Filtered User Data:", filteredUserData);

    const totalContributions = calculateTotal(filteredUserData);
    console.log("Total Contributions:", totalContributions);

    
    
    const percentages = {}; // initalize object to hold percentages 
    let  error = ""


    if (totalContributions === 0) { // we want to avoid dividing by 0
        error = "You have 0 points and you can't divide by 0"

    }

    /**
     * instead of getting % by % of points a category does- let's do it based on contributions
     * otherwise could be skewed as some contributions grant more points
     */
    
    


    for (let [key, value] of Object.entries(filteredUserData)) {
        if (value > 0) {
            percentages[key] = ((value  / totalContributions) * 100); // calculate percentage
        }
    }

    return {percentages, error} // *in order to pass the values back!
}
   
    