export default function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.76075247079951, 37.631826351423854],
    zoom: 14,
    controls: [],
  })

  const myPlacemark = new ymaps.Placemark([55.76932626597775, 37.64001662469352], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/placemark.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [0, 0],
  })


  myMap.geoObjects.add(myPlacemark)
  myMap.behaviors.disable(['drag', 'rightMouseButtonMagnifier', 'scrollZoom'])
}

