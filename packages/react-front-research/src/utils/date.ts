export const getMonthData = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const monthData = [];

    let currentDate = firstDay;
    while (currentDate <= lastDay) {
        monthData.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return monthData as Date[];
}
