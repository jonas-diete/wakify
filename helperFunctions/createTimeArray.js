// creates array of minutes and hours
const createTimeArray = (length) => {
  array = []
  for (let i = 0; i < length; i++) {
    if (i < 10) {
      array.push("0" + String(i));
    } else array.push(String(i));
  }
  return array;
}

export default createTimeArray;