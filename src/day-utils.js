import { DAYS_MAP_STR } from "./constants";

export const getDayDetails = args => {
    let date = args.index - args.firstDay;
    let day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
    }
    let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
    let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    return {
        date: _date,
        day,
        month,
        pureDate: new Date(prevYear, prevMonth + 1, date + 2).toISOString().substr(0, 10),
        dayString: DAYS_MAP_STR[day],
    }
}

export const getNumberOfDays = (month, year) => {
    return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
}

export const getMonthDetails = (year, month) => {
    let firstDay = (new Date(year, month)).getDay();
    let numberOfDays = getNumberOfDays(year, month);
    let monthArray = [];
    let rows = 6;
    let currentDay = null;
    let index = 0;
    let cols = 7;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            currentDay = getDayDetails({
                index,
                numberOfDays,
                firstDay,
                year,
                month
            });
            monthArray.push(currentDay);
            index++;
        }
    }
    return monthArray;
}