// how many contributions user should do per category based on difference
import { categoryPointsMap } from "../dataUtils/categoryPointsMap";

export const calculateNumberPerContribution = (difference, percentages) => { // receive parameters from where its called

    let numberContributionsMap = new Map();
    for (let [key, value] of Object.entries(percentages)) {
        if (value > 0) {
            const points = value/100 * difference;
            const number = Math.round (points / categoryPointsMap.get(key));
            console.log ("the point is " + points + "they key is " + key)
            numberContributionsMap.set(key, number);
        }
    }

    return numberContributionsMap // *in order to pass the values back!
    

}

export const calculateNumberPerDay = (difference, percentages, daysInBetween, frequency) => { // we need to pass parameters from above since we're calling that function and it needs to know those values 
    let numberFrequencyDatesMap = new Map();
    const numberPerContributionMap = calculateNumberPerContribution(difference, percentages);

    for (let [key, value] of numberPerContributionMap) {
        let newValuePerDateFrequency = Math.round(value / daysInBetween / frequency); // Round to nearest integer
        numberFrequencyDatesMap.set(key, newValuePerDateFrequency);
        console.log("the number per freq is " + newValuePerDateFrequency + " they key is " + key);
    }
    return  numberFrequencyDatesMap ;
}