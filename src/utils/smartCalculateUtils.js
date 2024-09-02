// filter the list

const filterObject = (obj, keysToExclude) => {
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([key]) => !keysToExclude.includes(key))
    );
};


// get the sum 
const calculateTotal = (filteredUserData) => {
    let totalPointsContributed = 0;
    for (const value of Object.values(filteredUserData)) {
        totalPointsContributed += value;
    }
    return totalPointsContributed;
}

export const calculateUserPercentage = (obj) => {
    const filteredUserData = filterObject(obj, ["points", "level"]);

    const totalPointsContributed = calculateTotal(filteredUserData);
    const percentages = {};
    let  error = ""


    if (totalPointsContributed === 0) { // we want to avoid dividing by 0
        error = "You have 0 points and you can't divide by 0"

    }



    for (let [key, value] of Object.entries(filteredUserData)) {
        if (value >= 1) {
            percentages[key] = ((value / totalPointsContributed) * 100).toFixed(2); // calculate percentage
        }
    }

    return {percentages, error} // *in order to pass the values back!
}
   
    