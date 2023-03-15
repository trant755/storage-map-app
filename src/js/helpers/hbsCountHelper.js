export function hbsCountHelper(num) {
  const count = {
    count1: false,
    count2: false,
    count3: false,
  };

  switch (num) {
    case 1:
      count.count1 = true;
      break;

    case 2:
      count.count1 = true;
      count.count2 = true;
      break;

    default:
      count.count1 = true;
      count.count2 = true;
      count.count3 = true;
  }

  return count;
}
