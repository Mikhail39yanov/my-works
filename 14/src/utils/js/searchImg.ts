export function searchImgInString(url: string): boolean {
  return /\.(jpg|png|img)$/i.test(url)
}