let cnv = document.getElementById('canvas');
let ctx = cnv.getContext('2d');

let dimsEl = document.getElementById('game');
console.log('dims', dimsEl.getBoundingClientRect());
let dims = dimsEl.getBoundingClientRect()

const GAME_WIDTH = dims.width;
const GAME_HEIGHT = dims.height;

cnv.width = GAME_WIDTH;
cnv.height = GAME_HEIGHT;

let game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx);
let lastTime = 0;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
let myReq;

const startAnimation = () => {
	myReq = requestAnimationFrame(gameLoop);
}

const stopAnimation = () => {
	cancelAnimationFrame(myReq);
}

function gameLoop(timestamp) {

	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;

	ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, cnv.width, cnv.height);

	game.update(deltaTime);
	game.draw(ctx);
	myReq = requestAnimationFrame(gameLoop);
}

myReq = requestAnimationFrame(gameLoop);