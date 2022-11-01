import { useEffect, useState } from "react"

export function useCommentForm(authorComment: any) {
  const [name, setName] = useState('')

  useEffect(() => {
    if (authorComment) {
      setName(`${authorComment} , `)
    }
  }, [authorComment])

  return { name, onChangeAuthorComment: setName }
}