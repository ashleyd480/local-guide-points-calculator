export const parseToInt = (str) => {
    const intAmount = str.replace(/,/g, ""); // remove all commas
    return parseInt(intAmount, 10); // parse as an integer
}


export const parseToInt2 = (str) => {
    // Extract the number part from the string before parsing
    const numberPart = str.match(/\d+/g); // Extract digits from the string

    // Join all parts in case there are multiple groups of digits
    const numberString = numberPart ? numberPart.join('') : '';

    // Remove any commas and parse the integer
    const intAmount = numberString.replace(/,/g, ""); 
    return parseInt(intAmount, 10);
};