// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

// firebase.initializeApp(firebaseConfig);


let cnv = document.getElementById('canvas');
let ctx = cnv.getContext('2d');


let setup = (function () {
	let db = null;
	let pages = null;
	let utils = null;


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

	return function setup() {
		pages = new Pages();
		db = new DB();
		utils = new Utils();

		pages.show('login');
		stopAnimation();

		let signInBtn = document.getElementById('sign-in');
		signInBtn.addEventListener('click', (e) => {
			db.signIn();
			// let userPage = new UserPage();
		});

		let registerBtn = document.getElementById('register-user');
		registerBtn.addEventListener('click', (e) => {
			db.register();
		});

		let backBtn = document.getElementById('back-btn');
		backBtn.addEventListener('click', (e) => {
			pages.show('game');
		});

		let signInGoogleBtn = document.getElementById('sign-in-google');
		signInGoogleBtn.addEventListener('click', (e) => {
			db.signInGoogle();
		});

		let adminBtn = document.getElementById('admin-btn');
		adminBtn.addEventListener('click', (e) => {
			let usersTblInfo = db.readTableInfo('users');
			let userPage = new UserPage();
			userPage.makeUserTable(usersTblInfo);

			pages.show('admin');
		});

		let startGameBtn = document.getElementById('start-game-btn');
		startGameBtn.addEventListener('click', (e) => {
			startAnimation();
			// db.startGame();
			pages.show('game');
			game.startGame();
		});

		document.addEventListener('click', (e) => {
			if (e.target && e.target.id === 'del-btn') {
				console.log('del-btn clicked', this);
				db.deleteUser(e.target.value);
				let userPage = new UserPage();
				userPage.removeRow(e.target);
			}
		});
	};

})();

