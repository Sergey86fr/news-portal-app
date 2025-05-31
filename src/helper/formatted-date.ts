export function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid Date";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}, ${hours}.${minutes} ${ampm}`;
}
