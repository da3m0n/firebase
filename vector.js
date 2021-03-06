class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(v) {
		return new Vector(this.x+v.x, this.y+v.y);
	}

	subtr(v){
		return new Vector(this.x-v.x, this.y-v.y);
	}

	mag(){
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	mult(n) {
		return new Vector(this.x * n, this.y * n);
	}

	unit() {
		if(this.mag() === 0) {
			return new Vector(0, 0);
		}
		return new Vector(this.x / this.mag(), this.y / this.mag());
	}

	static dot(v1, v2) {
		return v1.x * v2.x + v1.y * v2.y;
	}

	drawVec(startX, startY, n, col) {
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(startX + this.x * n, startY + this.y * n);
		ctx.strokeStyle = col;
		ctx.stroke();
		ctx.closePath();
	}

	vectorTest() {
		
		let v1 = new Vector(2,1);
		let v2 = new Vector(-1,1);
		console.log(v1, v2);
		console.log('Add:', v1.add(v2));
		console.log('Subt:', v2.subtr(v1));
		console.log('Mag:', v1.mag());
		console.log('Mult:', v1.mult(2));
		console.log('Unit:', v1.unit());
		console.log('Dot:', Vector.dot(v1, v2));

	}
}