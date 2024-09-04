// how many contributions user should do per category based on different
import { categoryPointsMap } from "../dataUtils/categoryPointsMap";

export const calculateNumberPerContribution = (difference, percentages) => {

    let numberContributionsMap = new Map();
    for (let [key, value] of Object.entries(percentages)) {
        if (value > 0) {
            const points = value/100 * difference;
            const number = points / categoryPointsMap.get(key);
            console.log ("the point is " + points + "they key is " + key)
            numberContributionsMap.set(key, number);
        }
    }

    return {numberContributionsMap} // *in order to pass the values back!
    

}