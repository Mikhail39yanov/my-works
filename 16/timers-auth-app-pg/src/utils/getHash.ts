const { createHash } = await import('node:crypto')

export const getHash = (data: string) => createHash('sha256').update(data).digest('hex')
