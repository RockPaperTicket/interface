import { format } from 'date-fns';

export const convertTimestamp = (timestamp: string) => {
  const date = new Date(+timestamp * 1000);
  let mins: any = date.getMinutes();
  if (mins < 10) {
    mins = '0' + mins;
  }
  return format(date, 'do MMM hh:mm aaa');
  // return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${mins}`;
};
