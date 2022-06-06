export function isWebp() {
  // Поддержка карт инок webp
  function testWebP(callback: { (support: any): void; (arg0: boolean): void }) {
    let webP = new Image()
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }

  testWebP(function (support: boolean) {
    let className = support === true ? 'webp' : 'no-webp'
    document.documentElement.classList.add(className)
  })
}
