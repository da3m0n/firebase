const UTILS = new Utils();
let score = 0;

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
	}

	event(e) {}
	// display(){}
}

class GameOverState {
	constructor(game) {
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
		this.game = game;
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
			ball.display();

			ball.update(deltaTime);
		}
		UTILS.detectCollisions2(this.game.balls);
		// UTILS.detectCollisions(this.game.balls);
	}

	event(e) {}
}


class Game {
	constructor(width, height, ctx) {
		this.width = width;
		this.height = height;
		this.ctx = ctx;

		let me = this;
		this.gameState = new GamePendingState(this);
		// let v1 = new Vector(2,1);
		// let v2 = new Vector(-1,1);
		// console.log(v1, v2);
		// console.log('Add:', v1.add(v2));
		// console.log('Subt:', v2.subtr(v1));
		// console.log('Mag:', v1.mag());
		// console.log('Mult:', v1.mult(2));
		// console.log('Unit:', v1.unit());
		// console.log('Dot:', Vector.dot(v1, v2));

		// UTILS.keyControl(new Ball2(100, 150, 25, 'green'));

		cnv.addEventListener('mousedown', ballClickHandler);
		// cnv.addEventListener('keydown', keyboardHandler);

		function ballClickHandler(event) {
			let clickPos = UTILS.getClickPosition(event);
			// console.log('click pos', clickPos);
			// for (let i = 0; i < me.balls.length; i++) {
			for(let i = me.balls.length - 1; i >= 0; i--) {
				let ball = me.balls[i];
				if (UTILS.pointInCircle(ball.pos.x, ball.pos.y, clickPos.x, clickPos.y, ball.radius)) {
					score += ball.getBallScore();
					me.balls.splice(i, 1);
					break;
				}
			}
			// console.log('balls length', me.balls.length);
			if (me.balls.length === 0) {
				// console.log('game over');
				me.gameState = new GameOverState(me);
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

		this.startGame();
	}

	startGame(){
		console.log('start game');
		let me = this;
		this.gameState = new GamePlayingState(this);
		this.balls= [];
		let breakout = 0;

		let ball1 = new Ball2(130, 100, 25, 'red');
		this.balls.push(ball1);
		document.addEventListener('keydown', (e) => {
			if(e.code === 'ArrowLeft') {
				ball1.moveX(false);
			}
			if(e.code === 'ArrowRight') {
				// console.log('ArrowRight');
				ball1.moveX(true);
			}
			if(e.code === 'ArrowUp') {
				// console.log('ArrowUp');
				ball1.moveY(false);
			}
			if(e.code === 'ArrowDown') {
				// console.log('ArrowDown');
				ball1.moveY(true);
			}

		})
		for (let i = 0; i < 20; i++) {
			let ballRadius = 5 + UTILS.random(5, 15);
			let x = UTILS.random(ballRadius, this.width - ballRadius);
			let y = UTILS.random(ballRadius, this.height - ballRadius);

			while (UTILS.overlaps(this.balls, x, y, ballRadius)) {
				x = UTILS.random(ballRadius, this.width - ballRadius);
				y = UTILS.random(ballRadius, this.height - ballRadius);
				breakout++;
				if(breakout === 3500) {
					break;
				}
			}

			this.balls.push(new Ball2(x, y, ballRadius, UTILS.getRandomColor()));
		}
	}

	update(deltaTime) {
		this.gameState.update(deltaTime);
	}

	drawText(ctx) {
		ctx.fillStyle = 'yellow';
		ctx.font = '12px Arial';
		ctx.fillText(
			"Score:",
			20,
			20
		);
		ctx.fillText(
			score,
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
		this.gameState.draw(ctx);
	}

}