
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
                this.pages.show('admin');
            })
            .catch((e) => {
                let errorCode = e.code;
                let errorMessage = e.message;
                alert(errorMessage);
            })
    }

    signIn() {
        let UTILS = new Utils();
        function addUsersToTable(vals, snapshot) {
            let tblId = document.getElementById('users-tbl');
            // let newRow = tblId.insertRow(-1);
            // let newCell = newRow.insertCell(0);
            let newText = document.createTextNode(name);
            let tRow = document.createElement('tr');

            let tbl = document.getElementById('test-tbl');

            for(let v in vals){
                let td = document.createElement('td');
                td.innerText = vals[v];
                tRow.appendChild(td);
            }
            tblId.appendChild(tRow);
            // newCell.appendChild(newText);
        }

        let dbRef = this.db.ref();//.limit(1);
        dbRef.child('users');
        console.log(dbRef);

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
                let ret = {
                    name: val.name,
                    email: val.email,
                    lastLogin: date};
                addUsersToTable(ret, childSnapShot);

            });
        });

        this.pages.show('admin');
    }

}
