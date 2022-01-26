export default function differenceInDays(date) {
    const currentDate = new Date(new Date().toISOString().split('T')[0]);
    const handOutDate = new Date(date.split('T')[0]);
    const diff = currentDate.getTime() - handOutDate.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
}