function formatDate(s: string): string {
  const date = s.split('T');
  const [, month, day] = date[0].split('-');
  const [hour, minute] = date[1].split(':');

  return `${hour}:${minute} ${day}/${month}`;
}

export default formatDate;
