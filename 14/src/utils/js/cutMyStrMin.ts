export function cutMyStrMin(str: string, char: string): string {
  return str.replace(new RegExp(`(.*?${char}).*`), '$1')
}