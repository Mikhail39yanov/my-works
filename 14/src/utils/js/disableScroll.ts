// export function disableScroll() {
//   const body = document.body
//   let fixBlocks = document.querySelectorAll('.fix-block')

//   const paddingOffset = window.innerWidth - body.offsetWidth + 'px'
//   const pagePosition = window.scrollY
//   body.classList.add('disable-scroll')
//   body.dataset.position = pagePosition.toString()
//   body.style.top = -pagePosition + 'px'
//   fixBlocks.forEach((el) => {
//     el.style.paddingRight = paddingOffset
//   })
//   body.style.paddingRight = paddingOffset
// }
export function disableScroll(): void {
  const body = document.body
  let fixBlocks: NodeListOf<HTMLElement> = document.querySelectorAll('.fix-block')

  const paddingOffset = window.innerWidth - body.offsetWidth + 'px'
  const pagePosition = window.scrollY
  // body.classList.add('disableScroll')
  body.style.position = 'fixed'
  body.style.overflow = 'hidden'
  body.style.height = '100vh'
  body.style.width = '100%'
  body.style.top = '0'
  body.style.left = '0'
  body.dataset.position = pagePosition.toString()
  body.style.top = -pagePosition + 'px'
  // fixBlocks.forEach((el: HTMLElement) => {
  //   el.style.paddingRight = paddingOffset
  // })
  body.style.paddingRight = paddingOffset
}