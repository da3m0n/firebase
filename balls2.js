class Ball2 {
	constructor(posX, posY, radius, col) {
		let UTILS = new Utils();
		this.radius = radius;
		this.pos = new Vector(posX, posY);
		// this.vel = new Vector(0.25 / 5, 0.20 / 5); 
		this.acc = new Vector(0, 0);
		// let cnv = document.getElementById('canvas');
		this.cnvWidth = cnv.width;
		this.cnvHeight = cnv.height;
		// this.vel = new Vector(Math.random() / 5, Math.random() / 5);
		this.vel = new Vector(0.25, 0.25);
		this.col = col;
		this.mass = 1;
		this.player = false;
	}

	getBallScore() {
		return Math.ceil(this.radius / 10) * 10;
	}

	update(deltaTime) {
		
		if (!deltaTime) return;
	
		let nextX = this.pos.x + this.vel.x * deltaTime;

		// this.pos.x += this.vel.x * deltaTime;
		this.pos.y += this.vel.y * deltaTime;

		// if (nextX > (this.cnvWidth - this.radius)) {
		// 	let xDist = nextX - this.pos.x;
		// 	let borderDist = (this.cnvWidth - this.radius) - this.pos.x;

		// 	this.pos.x = this.cnvWidth - this.radius;
		// 	this.vel.x = -Math.abs(this.vel.x)
		// 	this.pos.x += this.vel.x * deltaTime * (1 - borderDist / xDist);

		// } else if (nextX < this.radius) {
		// 	let xDist = Math.abs(nextX - this.pos.x);
		// 	let borderDist = this.pos.x - this.radius;

		// 	this.vel.x = Math.abs(this.vel.x);
		// 	this.pos.x = this.radius + this.vel.x * deltaTime * (1 - borderDist / xDist);
		// } else {
		// 	this.pos.x += this.vel.x * deltaTime;
		// }

		// if (this.pos.y > (this.cnvHeight - this.radius)) {
		// 	this.vel.y = -Math.abs(this.vel.y);
		// 	this.pos.y += this.vel.y * deltaTime;
		// } else if (this.pos.y < this.radius) {
		// 	this.vel.y = Math.abs(this.vel.y);
		// 	this.pos.y += this.vel.y * deltaTime;
		// } else {
		// 	this.pos.y += this.vel.y * deltaTime;
		// }
	}

	collides(obj, deltaTime) {
			
		if(obj instanceof Wall) {
			if(obj.x !== null) {
				// obj.x = t * this.vel.x + this.pos.x + this.radius;
				// obj.x + obj.dir * this.radius = t * this.vel.x + this.pos.x
				// obj.x + obj.dir * this.radius - this.pos.x = t * this.vel.x
				// (obj.x + obj.dir * this.radius  - this.pos.x )/this.vel.x = t

				let t = (obj.x + obj.dir * this.radius - this.pos.x)/this.vel.x;
				if(t >= 0 && t <= deltaTime && isFinite(t)) {	
					console.log('collision width a vertical wall');
					return t;
				}				
			}			
			if(obj.y !== null) {
				let t = (obj.y + obj.dir * this.radius - this.pos.y) / this.vel.y;
				if(t >= 0 && t <= deltaTime && isFinite(t)) {
					console.log('collission with a horizontal wall');
					return t;
				}
			}
		}
	}

	moveX(dir){
		if(dir) {
			console.log('right');
			this.pos.x += 10;
		} else {
			console.log('left');
			this.pos.x += -10;
		}

	}
	moveY(dir){
		if(dir) {
			this.pos.y += 10;
		} else {
			this.pos.y += -10;
		}
	}


	drawBall(ctx) {
		// const circle = new Path2D();
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);

		ctx.fillStyle = this.col;
		ctx.fill();
		// ctx.strokeStyle = this.col;
		// ctx.stroke();
		ctx.font = "10px Arial";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		// ctx.fillText(
		// 	"Vel: " + Math.round(this.vel.x) + ' - ' + Math.round(this.vel.y),
		// 	this.pos.x,
		// 	this.pos.y
		// );
		ctx.stroke();
	}

	display() {
		this.vel.drawVec(500, 400, 10, 'green');
		this.acc.unit().drawVec(550, 400, 50, 'blue');
		ctx.beginPath();
		ctx.arc(550, 400, 50, 0, Math.PI * 2);
		ctx.strokeStyle = 'white';
		ctx.stroke();
		ctx.closePath();
	}

	drawLines(ctx) {
		// console.log('display');
		ctx.beginPath();
		ctx.moveTo(this.pos.x, this.pos.y);
		// ctx.lineTo(100, 100);

		ctx.lineTo(this.pos.x + this.vel.x * 1000, this.pos.y + this.vel.y * 1000);
		ctx.strokeStyle = 'green';ctx.stroke();
	}
}
