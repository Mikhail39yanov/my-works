export const formatDuration = (d: number) => {
  d = Math.floor(d / 1000)
  const s = d % 60
  d = Math.floor(d / 60)
  const m = d % 60
  const h = Math.floor(d / 60)
  return [h > 0 ? h : null, m, s]
    .filter((x) => x !== null)
    .map((x) => {
      if (x !== null) return (x < 10 ? '0' : '') + x
    })
    .join(':')
}
