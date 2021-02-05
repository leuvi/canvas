import { mouse, containPoint } from './utils'
import { Ball } from './cls'

function main() {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || function (callback) {
      return window.setTimeout(callback, 1000 / 60)
    }
  }

  demo1()
}

function demo1() {
  var input = document.getElementById('input1')
  var button = document.getElementById('button1')
  var west = document.getElementById('west')
  var east = document.getElementById('east')
  var text = document.getElementById('text1')
  var canvas = document.getElementById('demo1')
  var ctx = canvas.getContext('2d')
  var curMouse = mouse(canvas)
  var ball = new Ball()
  var vx = Math.random() * 10 - 5
  var vy = -10
  var bounce = -0.7
  var gravity = 0.5
  var friction = .99
  var wind = 0
  var isMouseDown = false
  var oldX
  var oldY
  var mx
  var my

  button.onclick = function() {
    if(!isNaN(input.value)) {
      wind = input.value / 100
      text.innerHTML = '当前西风：风速' + Math.abs(wind * 100)
    }
  }

  west.onclick = function() {
    if(wind < 0) {
      wind *= -1
      text.innerHTML = '当前西风：风速' + Math.abs(wind * 100)
    }
  }

  east.onclick = function() {
    if(wind > 0) {
      wind *= -1
      text.innerHTML = '当前东风：风速' + Math.abs(wind * 100)
    }
  }

  ball.x = canvas.width / 2
  ball.y = canvas.height / 2

  canvas.addEventListener('mousedown', () => {
    if (containPoint(ball.getBounds(), curMouse.x, curMouse.y)) {
      isMouseDown = true
      oldX = ball.x
      oldY = ball.y
      mx = curMouse.x - ball.getBounds().x - ball.radius
      my = curMouse.y - ball.getBounds().y - ball.radius

      canvas.addEventListener('mousemove', onMouseMove, !1)
      canvas.addEventListener('mouseup', onMouseUp, !1)
    }
  }, !1)

  function onMouseMove(e) {
    ball.x = curMouse.x - mx
    ball.y = curMouse.y - my
  }

  function onMouseUp() {
    isMouseDown = false
    canvas.removeEventListener('mousemove', onMouseMove, !1)
    canvas.removeEventListener('mouseup', onMouseUp, !1)
  }

  function trackVelocity() {
    vx = ball.x - oldX
    vy = ball.y - oldY
    oldX = ball.x
    oldY = ball.y
  }

  function check() {
    var left = 0
    var top = 0
    var right = canvas.width
    var bottom = canvas.height

    vy += gravity
    vx += wind
    vx *= friction
    ball.x += vx
    ball.y += vy

    if (ball.x + ball.radius > right) {
      ball.x = right - ball.radius
      vx *= bounce
    } else if (ball.x - ball.radius < left) {
      ball.x = left + ball.radius
      vx *= bounce
    }

    if (ball.y + ball.radius > bottom) {
      ball.y = bottom - ball.radius
      vy *= bounce
    } else if (ball.y - ball.radius < top) {
      ball.y = top + ball.radius
      vy *= bounce
    }
  }

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (isMouseDown) {
      trackVelocity()
    } else {
      check()
    }

    ball.draw(ctx)
  }())
}



export default main