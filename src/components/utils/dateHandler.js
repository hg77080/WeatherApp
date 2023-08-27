export const dateHandler = (date) => {
  let hours = new Date(date).getUTCHours();
  let meridian = hours > 12 ? "PM" : "AM";
  let min = new Date(date).getMinutes();
  hours = hours === 0 ? "00" : hours > 12 ? hours - 12 : hours;
  return `${hours}:${min} ${meridian}`;
};
