function dayOftheWeek() {
    const date = new Date();
    const day = date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
}
module.exports = {
    dayOftheWeek
}
