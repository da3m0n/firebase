class UserPage {

	constructor() {
		this.userCont = document.getElementById('usersCont');
		// this.usersTable();

	}

	removeRow = (oButton) => {
		let empTab = document.getElementById('users-tbl');
		empTab.deleteRow((oButton.parentNode.parentNode.rowIndex) - 1);
		// button -> td -> tr.
	};

	makeUserTable(tblInfo) {
		if (tblInfo === null || tblInfo === undefined) {
			return this.userCont;
		}

		function removeAllChildNodes(parent) {
			while (parent.firstChild) {
				parent.removeChild(parent.firstChild);
			}
		}

		let tblId = document.getElementById('users-tbl');

		removeAllChildNodes(tblId);
		let usersArr = [];

		tblInfo.then((childSnapShot) => {
				for (const child in childSnapShot.val()) {
					let userData = {};
					let user = {};

					let users = childSnapShot.val()[child];

					delete users.password;
					// doing this to set order. Better way???
					user.name = users.name;
					user.email = users.email;
					user.lastLogin = users.lastLogin;

					userData[child] = user;
					usersArr.push(userData);
				}

				// console.log('usersArr', usersArr);
				usersArr.forEach((user) => {
					let row = tblId.insertRow();
					for (const [key, value] of Object.entries(user)) {
						let cnt = 0;
						for (let u in value) {
							// console.log('val', cnt, value[u]);
							let td = document.createElement('td');
							td = row.insertCell(cnt);
							td.appendChild(document.createTextNode(value[u]));
							row.append(td);
							cnt++;
						}

						let delCol = document.createElement('td');
						let delBtn = document.createElement('button');
						let delText = document.createTextNode('Delete');
						delBtn.append(delText);
						delBtn.setAttribute('type', 'button');
						delBtn.setAttribute('value', key);
						delBtn.setAttribute('id', 'del-btn');
						delCol.append(delBtn);
						row.append(delCol);
					}
				});
			},
			(reject) => {
				console.log('reject', reject);
			});

		return this.userCont;
	}
}

class Pages {
	constructor() {
		let userPage = new UserPage();
		this.pages = {
			login: {divs: [document.getElementById('login-cont')]},
			users: {divs: [userPage.makeUserTable()]},
			admin: {divs: [document.getElementById('adminCont')]},
			game: {divs: [document.getElementById('gameCont')]}
		};
	}

	show(page) {
		this.show_(page);
	}

	show_(page) {
		// hide all pages
		for (let p in this.pages) {
			let pageInfo = this.pages[p];
			pageInfo.divs.forEach((div) => {
				div.style.display = 'none';
			});
		}

		let pageInfo = this.pages[page];
		pageInfo.divs.forEach((div) => {
			div.style.display = 'flex';
		});

		if (pageInfo.initialize) {
			pageInfo.initialize(pageInfo.divs);
		}
	}
}

let pages = null;

class Utils {
	constructor() {
	}

	validateEmail(email) {
		let expression = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
		return expression.test(email) === true;
	}

	validatePassword(password) {
		return password.length >= 6;
	}

	validateField(field) {
		if (field === null) {
			return false;
		}
		return field.length > 0;
	}

	makeGameControlScreen(userData) {
		// let label = document.createElement('label');
		// label.append(name);
		let title = document.getElementsByClassName('header ')[0];
		let nameTextNode = document.createTextNode(userData.name);
		let gameInfoCont = document.getElementById('game-info-cont');
		title.append(nameTextNode);

		gameInfoCont.append(title);

		return gameInfoCont;
	}

	getRandomColor() {
		let r = 255 * Math.random() | 0,
			g = 255 * Math.random() | 0,
			b = 255 * Math.random() | 0;
		return 'rgb(' + r + ',' + g + ',' + b + ')';
	}

	random(min, max) {
		return Math.random() * (max - min) + min;
	}

	distance(x1, y1, x2, y2) {
		const xDist = x2 - x1;
		const yDist = y2 - y1;
		return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
	}

	overlaps(balls, x, y, radius) {
		for (let i = 0; i < balls.length; i++) {
			let dist1 = this.distance(x, y, balls[i].pos.x, balls[i].pos.y);
			if (dist1 < radius + balls[i].radius) {
				// console.log('overlaps...');
				return true;
			}
		}
		return false;
	}

	getClickPosition(event) {
		let rect = cnv.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		return {x: x, y: y};
	}

	pointInCircle(x, y, cx, cy, radius) {
		let distanceSquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
		return distanceSquared <= radius * radius;
	}


	detectCollisions2(balls) {
		for (let i = 0; i < balls.length; i++) {
			balls[i].isColliding = false;
		}

		for (let i = 0; i < balls.length; i++) {
			const ballA = balls[i];

			if (this.overlaps(balls, ballA.pos.x, ballA.pos.y, ballA.radius)) {
				// console.log('overlapping...');
				// this.resolveColl(ballA, ballB);
			}
		}
	}

}