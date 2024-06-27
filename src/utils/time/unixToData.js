export default function unixToData(unixTime, showTime = true, period = null) {
  const date = new Date(unixTime * 1000);
  const formatDate = (d) => {
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const year = d.getUTCFullYear();
    const hours = String(d.getUTCHours()).padStart(2, '0');
    const minutes = String(d.getUTCMinutes()).padStart(2, '0');

    if (showTime) {
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    } else {
      return `${day}.${month}.${year}`;
    }
  };

  if (period === null) {
    return formatDate(date);
  } else {
    const endDate = new Date(date);

    // Calculate the end date based on the period

    if (period == 'week') {
      endDate.setDate(date.getDate() + 7);
    }
    else if (period == 'month') {
      endDate.setMonth(date.getMonth() + 1);
    }
    else if (period == 'year') {
      endDate.setFullYear(date.getFullYear() + 1);
    }
    else {
      endDate.setDate(date.getDate() + 1);
    }
    console.log(period);
    console.log(period);
    console.log(period);
    console.log(period);

    const formattedStartDate = formatDate(date);
    const formattedEndDate = formatDate(endDate);

    return `${formattedStartDate} - ${formattedEndDate}`;
  }
}