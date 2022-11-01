// export function enableScroll() {
//   const body = document.body
//   let fixBlocks = document.querySelectorAll('.fix-block')

//   const pagePosition = parseInt(body.dataset.position, 10)
//   body.style.top = 'auto'
//   body.classList.remove('disable-scroll')
//   window.scroll({ top: pagePosition, left: 0 })
//   body.removeAttribute('data-position')
//   fixBlocks.forEach((el) => {
//     el.style.paddingRight = '0px'
//   })
//   body.style.paddingRight = '0px'
// }

export function enableScroll(): void {
  const body = document.body
  let fixBlocks: NodeListOf<HTMLElement> = document.querySelectorAll('.fix-block')

  const position = body.dataset.position
  if (position !== undefined) {
    const pagePosition = parseInt(position, 10)
    body.style.top = 'auto'
    // body.classList.remove('disable-scroll')
    // body.style.position = ''
    // body.style.overflow = ''
    // body.style.height = ''
    // body.style.width = ''
    // body.style.top = ''
    // body.style.left = ''
    body.removeAttribute('style')
    window.scroll({ top: pagePosition, left: 0 })
    body.removeAttribute('data-position')
    body.style.clear
    // fixBlocks.forEach((el: HTMLElement) => {
    //   el.style.paddingRight = '0px'
    // })
    body.style.paddingRight = ''
  }
}