export const parseToInt = (str) => {
    const intFetchedPoints = str.replace(/,/g, ""); // remove all commas
    return parseInt(intFetchedPoints, 10); // parse as an integer
}