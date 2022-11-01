import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ICard } from '../shared/CardsList/Card'
import { IRootState } from '../store/reducer'
import { postsRequestAsync, postsUpdateCounter } from '../store/posts/postsActions'

export interface IPostsData {
  kind?: string
  data: ICard
}

type TPostsData = [IPostsData[], boolean, string, React.RefObject<HTMLDivElement>, number, () => void]

export function usePostsData(): TPostsData {
  const token = useSelector<IRootState, string>(state => state.token.token)
  const posts = useSelector<IRootState, IPostsData[]>(state => state.posts.data)
  const loading = useSelector<IRootState, boolean>(state => state.posts.loading)
  const nextAfter = useSelector<IRootState, string>(state => state.posts.nextAfter)
  const prevAfter = useSelector<IRootState, string>(state => state.posts.prevAfter)
  const errorLoading = useSelector<IRootState, string>(state => state.posts.error)
  const counter = useSelector<IRootState, number>(state => state.counter)
  const dispatch = useDispatch<any>()

  const bottomOffListRef = useRef<HTMLDivElement>(null)

  async function load() {
    dispatch(postsRequestAsync())
  }

  function handleLoadMore() {
    load()
    dispatch(postsUpdateCounter(1))
  }

  useEffect(() => {
    if (token && token.length > 0 && token !== 'undefined') {

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && counter < 3) {
          load()
          dispatch(postsUpdateCounter(counter + 1))
        }
      }, {
        rootMargin: '100px'
      })

      if (bottomOffListRef.current) {
        observer.observe(bottomOffListRef.current)
      }

      return () => {
        if (bottomOffListRef.current) {
          observer.unobserve(bottomOffListRef.current)
        }
      }
    }
  }, [bottomOffListRef.current, nextAfter, token])

  return [posts, loading, errorLoading, bottomOffListRef, counter, handleLoadMore]
}