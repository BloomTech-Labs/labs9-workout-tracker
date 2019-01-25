export const dateStringParser = date => {
  date = date.split("T")[0].split("-");

  const newDate = date[0] + "/" + date[1] + "/" + date[2];

  return new Date(newDate);
};

export const dateFormat = d => {
  let month = d.getMonth() + 1;
  let day = d.getDate();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return `${d.getFullYear()}-${month}-${day}`;
};
