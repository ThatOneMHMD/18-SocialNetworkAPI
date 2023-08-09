const dateStamp = (timestamp) => {
  const formattedDate = timestamp.toLocaleString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return formattedDate;
};

module.exports = dateStamp;
