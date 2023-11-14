const calculateHoursDifferenceInUTC = (startDate) => {
  const formattedStartDate = `${startDate}Z`;
  const startDateObj = new Date(formattedStartDate);
  const endDateObj = new Date();

  const timeDifferenceMs = endDateObj - startDateObj;
  const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);
  const minutesDifference = Math.floor(hoursDifference * 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  //if over 48 hours, return days
  if (daysDifference >= 2) {
    return `${daysDifference} days ago`;
  }
  //if under an hour, return minutes
  if (hoursDifference < 1) {
    if (minutesDifference === 0) {
      return "just now!";
    }
    return `${minutesDifference} minutes ago`;
  }
  //else return hours
  return `${Math.floor(hoursDifference)} hours ago`;
};

export default calculateHoursDifferenceInUTC;
