import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { meRequestAsync } from '../store/me/meActions'
import { IRootState } from '../store/reducer'

export interface IUserData {
  name?: string
  iconImg?: string
}

export function useUserData() {
  const data = useSelector<IRootState, IUserData>(state => state.me.data)
  const loading = useSelector<IRootState, boolean>(state => state.me.loading)
  const token = useSelector<IRootState, string>(state => state.token.token)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    if (token && token.length > 0 && token !== 'undefined') {
      dispatch(meRequestAsync())
    }
  }, [token])

  return {
    data, loading
  }
}