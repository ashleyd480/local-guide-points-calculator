// how many contributions user should do per category based on difference
import { categoryPointsMap } from "../dataUtils/categoryPointsMap";

export const calculateNumberPerContribution = (difference, percentages) => {
  // receive parameters from where its called

  let numberContributionsMap = new Map();
  for (let [key, value] of Object.entries(percentages)) {
    if (value > 0) {
      const points = (value / 100) * difference; // /using % to calcualate points
      const number = Math.round(points / categoryPointsMap.get(key)); // converting points to number of contributions
      console.log("the point is " + points + "they key is " + key);
      numberContributionsMap.set(key, number);
      // eseentially populates map with categories and corresponding # of contributiosn needed
    }
  }

  return numberContributionsMap; // *in order to pass the values back!
};

// takes the populated map and calculates number of contributions per day per frequncy
export const calculateNumberPerDay = (
  difference,
  percentages,
  daysInBetween,
  frequency
) => {
  // we need to pass parameters from above since we're calling that function and it needs to know those values
  let numberFrequencyDatesMap = new Map();
  const numberPerContributionMap = calculateNumberPerContribution(
    difference,
    percentages
  );

  for (let [key, value] of numberPerContributionMap) {
    let newValuePerDateFrequency = 0;
    // calculate the effective contribution days based on frequency per week
    // days in between divided by 7 means how many week(s) we have to contribution and then frequency is how many times we have to contribute per week- so we get total # of times we have to contribute
    // then we can divide the number of contributions by the number of times we have to contribute to get the number of contributions per day
    let effectiveFrequency = (frequency / 7) * daysInBetween;

    if (daysInBetween === 0) {
      // handle edge case of 0 days in between; Date Picker renders day difference as 0 otherwise which leads to infinity return
      newValuePerDateFrequency = value;
    } else if (daysInBetween <= frequency || daysInBetween <= 7) {
      newValuePerDateFrequency = Math.round(value / frequency);
    } else {
      newValuePerDateFrequency = Math.round(value / effectiveFrequency);
    }

    console.log("days in between is " + daysInBetween);
    numberFrequencyDatesMap.set(key, newValuePerDateFrequency);
    console.log(
      "the number per freq is " +
        newValuePerDateFrequency +
        " they key is " +
        key
    );
  } // Round to nearest integer

  return numberFrequencyDatesMap;
};
