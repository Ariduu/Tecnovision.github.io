const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');
canvas.width = 1519;
canvas.height = 650;
let particleArray = [];

// Mouse
const mouse = {
  x: null,
  y: null,
  radius: 30
}

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y - 70;
});

//ctx.strokeRect(0, 0, 840, 100);
ctx.fillStyle = 'white';
ctx.font = '100px Quantico';
ctx.fillText('B I E N V E N I D O', 15, 420)
const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random()*300) + 10;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    let forceDirectionX = dx/distance;
    let forceDirectionY = dy/distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx/10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy/10;
      }
    }
  }
}

function init() {
  particleArray = [];
  for (let y=0, y2=textCoordinates.height; y<y2; y++) {
    for (let x=0, x2=textCoordinates.width; x<x2; x++) {
      if (textCoordinates.data[(y*4*textCoordinates.width) + (x*4) +3] > 30) {
        let positionX = x;
        let positionY = y;
        particleArray.push(new Particle(positionX, positionY));
      }
    }
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i=0; i<particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update()
  }
  requestAnimationFrame(animate);
}
animate();