export function mouse(element) {
  var m = { x: 0, y: 0 }
  element.addEventListener('mousemove', function (e) {
    var x, y
    if (e.pageX) {
      x = e.pageX
      y = e.pageY
    } else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }
    x -= element.offsetLeft
    y -= element.offsetTop
    m.x = x
    m.y = y
  }, !1)
  return m
}

export function containPoint(rect, x, y) {
  return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y > rect.y + rect.height)
}