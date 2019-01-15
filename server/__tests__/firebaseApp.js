const firebase = require('firebase');

describe('helper file', () => {
    it ('helper file', async () => {
        expect(true).toEqual(true);
    })
})

async function getToken() {
    const email = "test@test.com";
    const password = "password";

    let config = {
        apiKey: "AIzaSyAQRB_UBjCXzDmxluLuDiM-VUjEoi9HjnQ",
        authDomain: "fitmetrix-57cce.firebaseapp.com",
        databaseURL: "https://fitmetrix-57cce.firebaseio.com",
        projectId: "fitmetrix-57cce",
        storageBucket: "fitmetrix-57cce.appspot.com",
        messagingSenderId: "771224902694"
    };
    
    firebase.initializeApp(config);

    const res = await firebase.auth().signInWithEmailAndPassword(email, password);

    const token = await res.user.getIdToken();

    return token;
};


module.exports.getToken = getToken(); 
