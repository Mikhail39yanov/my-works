import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { IRootState } from "../store/reducer"

export function useComments({ subreddit, id }: { subreddit: string, id: string }) {
  const [comments, setComments] = useState([])
  const token = useSelector<IRootState, string>(state => state.token.token)

  useEffect(() => {
    if (token && token.length > 0 && token !== 'undefined') {
      let isActive = true
      axios.get(`https://oauth.reddit.com/r/${subreddit}/comments/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      })
        .then(resp => {
          if (isActive) {
            const usersComments = resp.data[1].data.children
            setComments(usersComments)
          }
        })
        .catch(console.log)

      return () => { isActive = false }
    }
  }, [token])

  return [comments]
}