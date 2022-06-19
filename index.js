// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

// firebase.initializeApp(firebaseConfig);


let setup = (function () {
    let db = null;
    let pages = null;

    return function setup() {
        pages = new Pages();
        db = new DB();

        pages.show('login');
        // pages.show('admin');

        let signInBtn = document.getElementById('sign-in');
        signInBtn.addEventListener('click', (e) => {
            db.signIn();
        });

        let registerBtn = document.getElementById('register-user');
        registerBtn.addEventListener('click', (e) => {
            db.register();
        })

        let backBtn = document.getElementById('back-btn');
        backBtn.addEventListener('click', (e) => {
            console.log('xxxxxxxx');
            pages.show('login');
        })

    }
})();

