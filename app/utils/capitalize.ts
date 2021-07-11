function capitalize(s: string): string {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
}

export default capitalize;
