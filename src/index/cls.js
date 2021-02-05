export class Ball {
  constructor(radius = 20, color = '#f30', lineWidth = 0) {
    this.radius = radius
    this.color = color
    this.lineWidth = lineWidth
    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.rotation = 0
    this.scaleX = 1
    this.scaleY = 1
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    ctx.scale(this.scaleX, this.scaleY)
    ctx.lineWidth = this.lineWidth
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    if(this.lineWidth > 0) {
      ctx.stroke()
    }
    ctx.restore()
  }

  getBounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    }
  }
}