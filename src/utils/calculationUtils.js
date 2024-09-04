import dayjs from 'dayjs';


export const calculateDifference = (points, goal) => {
    return goal - points;

    };


export const calculateDaysInBeteen = (goalDate) => {
    const today = dayjs();
    const selectedDate = dayjs(goalDate);

    // get difference in days
    const differenceInDays = selectedDate.diff(today, 'day');
    return differenceInDays;
}