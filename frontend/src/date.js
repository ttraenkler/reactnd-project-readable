export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return (
    day +
    " " +
    monthNames[monthIndex] +
    " " +
    year +
    " " +
    hours +
    ":" +
    minutes
  );
}
