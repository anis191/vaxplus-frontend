export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

//
export const campaignDate = (status, startDate, endDate) => {
  const formattedStart = formatDate(startDate);
  const formattedEnd = formatDate(endDate);

  let date = "";
  if (status === "Upcoming") {
    date = `Start on: ${formattedStart}`;
  } else if (status === "Ongoing") {
    date = `${formattedStart} - ${formattedEnd}`;
  } else if (status === "Ended") {
    date = `Ended on: ${formattedEnd}`;
  }
  return date;
};