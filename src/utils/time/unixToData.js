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
    switch (period) {
      case 'week':
        endDate.setDate(date.getDate() + 7);
        break;
      case 'month':
        endDate.setMonth(date.getMonth() + 1);
        break;
      case 'year':
        endDate.setFullYear(date.getFullYear() + 1);
        break;
      case 'day':
      default:
        endDate.setDate(date.getDate() + 1);
        break;
    }

    const formattedStartDate = formatDate(date);
    const formattedEndDate = formatDate(endDate);

    return `${formattedStartDate} - ${formattedEndDate}`;
  }
}