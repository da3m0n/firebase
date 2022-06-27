class DB {
    constructor() {
        this.pages = new Pages();
        this.firebaseConfig = {
            apiKey: "AIzaSyD9TRZ-j1mRIJ0-26hWf2hBL9PDujwQ03Y",
            authDomain: "logindemo-65674.firebaseapp.com",
            projectId: "logindemo-65674",
            storageBucket: "logindemo-65674.appspot.com",
            messagingSenderId: "134121763700",
            appId: "1:134121763700:web:fe3f7982c081d84af3f221"
        };
        this.app = firebase.initializeApp(this.firebaseConfig);

        this.auth = firebase.auth();
        this.db = firebase.database();
        this.UTILS = new Utils();
        rowan = 'rowan';
    }

    register() {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        // let passwordConf = document.getElementById('confPassword');
        let UTILS = new Utils();

        // if(validateEmail(email) === false ||
        //     validatePassword(password) === false ||
        //     validatePassword(passwordConf === false)) {
        //     alert('Email or password invalid');
        //     return;
        // }

        // if(UTILS.validateField(name) === false) {
        //     alert('Name invalid')
        //     return;
        // }

        this.auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                let dbRef = this.db.ref();

                let userData = {
                    name: name,
                    email: email,
                    password: password,
                    // passwordConf: passwordConf,
                    lastLogin: Date.now()
                }

                dbRef.child('users/' + user.uid).set(userData);
                UTILS.makeGameControlScreen(userData);

                this.pages.show('game');
                // this.pages.show('admin');
            })
            .catch((e) => {
                let errorCode = e.code;
                let errorMessage = e.message;
                alert(errorMessage);
            })
    }

    readTable(table) {
        this.db.ref(table).once('value', (snapshot) => {

            snapshot.forEach(function (childSnapShot){
                let val = childSnapShot.val();

                console.log('val', childSnapShot);
                // return userData;
            });
        });
    }

    signIn() {
        let UTILS = new Utils();

        function addUsersToTable(vals, snapshot) {
            // remove delete button

            let tblId = document.getElementById('users-tbl');
            // let newRow = tblId.insertRow(-1);
            // let newCell = newRow.insertCell(0);
            let newText = document.createTextNode(name);
            let tRow = document.createElement('tr');

            let tbl = document.getElementById('test-tbl');

            for(let v in vals){
                let td = document.createElement('td');
                td.innerText = vals[v];
                tRow.append(td);
            }

            let delCol = document.createElement('td');
            let delBtn = document.createElement('button');
            let delText = document.createTextNode('Delete');
            delBtn.append(delText);
            delBtn.setAttribute('type', 'button');
            delBtn.setAttribute('value', snapshot.key);
            delBtn.setAttribute('id', 'del-btn');

            delCol.append(delBtn);
            tRow.append(delCol);
            tblId.appendChild(tRow);
        }


        function updateUsersTable(childSnapShot) {
            console.log('snapshot', childSnapShot.val());
        }

        this.db.ref('users').once('value', (snapshot) => {

            snapshot.forEach(function (childSnapShot){
                let val = childSnapShot.val();

                // console.log('name', childSnapShot);
                let options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                };

                let date = new Date(val.lastLogin).toLocaleDateString('en-US', options);
                let userData = {
                    name: val.name,
                    email: val.email,
                    lastLogin: date};
                addUsersToTable(userData, childSnapShot);
                updateUsersTable(childSnapShot);
                // return userData;
            });
        });

        // console.log('userData', userData);
        // this.pages.show('admin');


        this.pages.show('game');

    }

    startGame() {
        this.pages.show('game');
        console.log('start game');
    }

    deleteUser(id) {
        this.db.ref('users/' + id).remove();
        let users = this.db.ref('users/');
        users.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log('data', data);
        });
    }

    signInGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                let credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                let token = credential.accessToken;
                // The signed-in user info.
                let user = result.user;

                this.pages.show('admin');
                // ...
            }).catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            console.log(errorCode, errorMessage);
        });
    }

}
