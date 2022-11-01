import React from "react"
import ReactDOM from "react-dom"

export const NotFound = () => {
  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return ReactDOM.createPortal((
    <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>404 — страница не найдена</h1>
  ), modalRoot)
}