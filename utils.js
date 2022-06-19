class UserPage {
    constructor() {
        this.userCont = document.getElementById('users-cont');

    }
    usersTable(){
        // console.log(this.userCont);
        return this.userCont;
    }
}
class Pages {
    constructor() {
        let userPage = new UserPage();
        this.pages = {
            login: {divs: [document.getElementById('login-cont')]},
            users: {divs: [userPage.usersTable()]},
            admin: {divs:[document.getElementById('admin-cont')]}
        };
    }

    show(page) {
        this.show_(page);
    }

    show_(page) {
        // hide all pages
        for(let p in this.pages) {
            let pageInfo = this.pages[p];
            pageInfo.divs.forEach((div) => {
                div.style.display = 'none';
            });
        }

        let pageInfo = this.pages[page];
        pageInfo.divs.forEach((div) => {
            div.style.display = 'flex';
        });

        if(pageInfo.initialize) {
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
        if(field === null) {
            return false;
        }
        return field.length > 0;
    }

}