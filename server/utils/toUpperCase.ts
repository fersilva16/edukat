export default function toUpperCase(string: string): string {
  return string.replace(/[a-z][A-Z]/g, '$1_$2').toUpperCase().replace(' ', '_');
}
