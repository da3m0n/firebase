// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

// firebase.initializeApp(firebaseConfig);


let cnv = document.getElementById('canvas');
let ctx = cnv.getContext('2d');


let setup = (function () {
	let db = null;
	let pages = null;
	let utils = null;

	let game = new Game(cnv);
	let lastTime = null;

	const startBtn = document.getElementById('startBtn');
	const stopBtn = document.getElementById('stopBtn');
	let myReq;

	const startAnimation = () => {
		lastTime = null;
		myReq = requestAnimationFrame(gameLoop);
	}

	const stopAnimation = () => {
		cancelAnimationFrame(myReq);
	}


	function gameLoop(timestamp) {

		let deltaTime = timestamp - lastTime;
		if(lastTime === null) {
			lastTime = timestamp;
			myReq = requestAnimationFrame(gameLoop);
			return;
		};
		lastTime = timestamp;



		game.update(deltaTime);
		game.draw(ctx);
		myReq = requestAnimationFrame(gameLoop);
	}

	myReq = requestAnimationFrame(gameLoop);

	return function setup() {
		pages = new Pages();
		db = new DB();
		utils = new Utils();

		pages.show('game');
		// pages.show('login');
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

		let backBtn = document.getElementById('backBtn');
		backBtn.addEventListener('click', (e) => {
			pages.show('game');
		});

		let signInGoogleBtn = document.getElementById('sign-in-google');
		signInGoogleBtn.addEventListener('click', (e) => {
			db.signInGoogle();
		});

		let adminBtn = document.getElementById('adminBtn');
		adminBtn.addEventListener('click', (e) => {
			let usersTblInfo = db.readTableInfo('users');
			let userPage = new UserPage();
			userPage.makeUserTable(usersTblInfo);

			pages.show('admin');
		});

		let startGameBtn = document.getElementById('startGameBtn');
		game.addStateListener((started) => {
            startGameBtn.innerText = started ? 'Stop Game':'Start Game';
				
			}
		);
		
		startGameBtn.addEventListener('click', (e) => {
			if (game.started()) {
				stopAnimation();
				game.stopGame();
	
			} else {
						startAnimation();
			// db.startGame();
			    pages.show('game');
			    game.startGame();
			}
		});

		let stopGameBtn = document.getElementById('stopGameBtn');
		stopGameBtn.addEventListener('click', (e) => {
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

