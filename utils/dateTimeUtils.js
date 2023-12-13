function getFormattedDateTime() {
  const currentDateTime = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Dhaka",
  };

  return currentDateTime.toLocaleString("en-US", options);
}

module.exports = {
  getFormattedDateTime,
};
