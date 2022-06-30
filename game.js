// const UTILS = new Utils();
// let score = 0;

// how to do base class?
// class GameBase {
//     constructor(game) {}
//     draw() {
//         // ctx.fillStyle = 'black';
//         ctx.fillRect(0, 0, cnv.width, cnv.height);
//     }
// }
class GamePendingState /*extends GameBase*/ {
	constructor(game) {
		console.log('GamePendingState');
		// super(game);
		this.game = game;
	}

	draw(ctx) {
		this.game.drawText(ctx);
		ctx.font = "30px Arial";
		ctx.fillStyle = "yellow";
		ctx.textAlign = "center";

		ctx.fillText(
			"Pending",
			this.game.width / 2,
			this.game.height / 2
		);
	}

	update(deltaTime) {
		console.log('Update state from GamePendingState');
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, cnv.width, cnv.height);
	}

	event(e) {}
	// display(){}
}

class GameOverState {
	constructor(game) {
		console.log('Game Over State');
		this.game = game;
	}

	draw(ctx) {
		console.log("end");
		this.game.drawText(ctx);
		ctx.font = "30px Arial";
		ctx.fillStyle = "green";
		ctx.textAlign = "center";

		ctx.fillText(
			"Game Over",
			this.game.width / 2,
			this.game.height / 2
		);
		ctx.font = "14px Arial";
		ctx.fillText('Press Spacebar to restart',
			this.game.width / 2,
			this.game.height / 2 + 20);
	}

	update(deltaTime) {
	}

	event(e) {
		if(e.key === ' ' || e.code === 'space' || e.keyCode === 32) {
			this.game.startGame();
		}
	}
	// display(){}
}

class GamePlayingState /* extends GameBase*/ {
	constructor(game) {
		// super();
		console.log('Game playing state');
		this.game = game;
		this.utils = new Utils();
		// let gameEl = document.getElementById('game');
		// gameEl.style.display = 'inline-flex';
	}

	draw(ctx) {
		// console.log('game2 gamePlayingState -> draw()');
		for (let i = 0; i < this.game.balls.length; i++) {
			const ball = this.game.balls[i];
			ball.drawBall(this.game.ctx);
			// ball.drawLines(this.game.ctx);
		}
		this.game.drawText(ctx)
	}

	update(deltaTime) {
		// console.log('game2 -> update()');
		for (let i = 0; i < this.game.balls.length; i++) {
			const ball = this.game.balls[i];
			// ball.display();

			ball.update(deltaTime);
		}
		this.utils.detectCollisions2(this.game.balls);
		// UTILS.detectCollisions(this.game.balls);
	}

	event(e) {}
}


class Game {
	constructor(cnv) {
		this.cnv = cnv;
		this.ctx = cnv.getContext('2d');
		this.score = 0;
		let me = this;
		this.gameState = new GamePendingState(this);
		this.utils = new Utils();
		this.listeners = [];
		

		cnv.addEventListener('mousedown', ballClickHandler);
		// cnv.addEventListener('keydown', keyboardHandler);

		let scoreEl = document.getElementById('pScore');

		function ballClickHandler(event) {
			let clickPos = me.utils.getClickPosition(event);
			// console.log('click pos', clickPos);
			// for (let i = 0; i < me.balls.length; i++) {
			for (let i = me.balls.length - 1; i >= 0; i--) {
				let ball = me.balls[i];
				if (me.utils.pointInCircle(ball.pos.x, ball.pos.y, clickPos.x, clickPos.y, ball.radius)) {
					me.score += ball.getBallScore();
					me.balls.splice(i, 1);
					break;
				}
			}
			scoreEl.innerHTML = 'Ball Score: ' + me.score;

			// console.log('balls length', me.balls.length);
			if (me.balls.length === 0) {
				// console.log('game over');
				me.setGameState(new GameOverState(me));
							}
		}

		// document.addEventListener('keydown', (e) => {
		//     console.log('keyboard...', e.key, e.code);
		//     if(e.code === 'ArrowLeft') {
		//         console.log('ArrowLeft');
		//     }
		//     if(e.code === 'ArrowRight') {
		//         console.log('ArrowRight');
		//     }
		//     if(e.code === 'ArrowUp') {
		//         console.log('ArrowUp');
		//     }
		//     if(e.code === 'ArrowDown') {
		//         console.log('ArrowDown');
		//     }
		//     score = 0;
		//     me.gameState.event(e);
		// });

		// this.startGame();
	}

	addStateListener(listener) {
		this.listeners.push(listener)
	}

	started() {
		return this.gameState instanceof GamePlayingState;
	}
	setGameState(gameState) {
		this.gameState = gameState;
	for (let i =0; i < this.listeners.length; i++) {
		this.listeners[i](this.started());
	}
	}
	startGame(){
		console.log('start game');
		let me = this;
		this.setGameState(new GamePlayingState(this));
		this.balls= [];
		let breakout = 0;

		let dimsEl = document.getElementById('game');
	// console.log('dims', dimsEl.getBoundingClientRect());
	let dims = dimsEl.getBoundingClientRect();
		this.width = dims.width;
		this.height = dims.height;
		// UTILS.keyControl(new Ball2(100, 150, 25, 'green'));

		this.cnv.width = dims.width
		this.cnv.height = dims.height;
	
		this.ctx.width = dims.width
		this.ctx.height = dims.height;

		// let ball1 = new Ball2(130, 100, 25, 'red');
		// this.balls.push(ball1);
		// document.addEventListener('keydown', (e) => {
		// 	if(e.code === 'ArrowLeft') {
		// 		ball1.moveX(false);
		// 	}
		// 	if(e.code === 'ArrowRight') {
		// 		// console.log('ArrowRight');
		// 		ball1.moveX(true);
		// 	}
		// 	if (e.code === 'ArrowUp') {
		// 		// console.log('ArrowUp');
		// 		ball1.moveY(false);
		// 	}
		// 	if (e.code === 'ArrowDown') {
		// 		// console.log('ArrowDown');
		// 		ball1.moveY(true);
		// 	}

		// })
		for (let i = 0; i < 1; i++) {
			let ballRadius = 5 + this.utils.random(5, 15);

			let x = this.utils.random(ballRadius, this.width - ballRadius);
			let y = this.utils.random(ballRadius, this.height - ballRadius);

			while (this.utils.overlaps(this.balls, x, y, ballRadius)) {
				x = this.utils.random(ballRadius, this.width - ballRadius);
				y = this.utils.random(ballRadius, this.height - ballRadius);
				breakout++;
				if (breakout === 3500) {
					break;
				}

			}
			this.balls.push(new Ball2(x, y, ballRadius, this.utils.getRandomColor()));
		}
	}

	stopGame() {
		console.log('Stopping game');
		this.balls = [];
		this.setGameState(new GamePendingState(this));
	}

	update(deltaTime) {
		this.gameState.update(deltaTime);
	}

	drawText(ctx) {
		ctx.fillStyle = 'yellow';
		ctx.font = '12px Arial';
		ctx.fillText(
			'Score:',
			20,
			20
		);
		ctx.fillText(
			this.score,
			50,
			20
		);

		ctx.fillText(
			"Total Time:",
			32,
			34
		);
	}

	draw(ctx) {
		
		ctx.clearRect(0, 0, this.width, this.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, this.width, this.height);
		this.gameState.draw(ctx);
	}

}