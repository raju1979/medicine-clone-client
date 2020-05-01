import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyD5f8OeDRYKlOtvJ2ZpfILXmJUiA0NiZUM",
    authDomain: "fir-medicine-c2c2f.firebaseapp.com",
    databaseURL: "https://fir-medicine-c2c2f.firebaseio.com",
    projectId: "fir-medicine-c2c2f",
    storageBucket: "fir-medicine-c2c2f.appspot.com",
    messagingSenderId: "605636393130",
    appId: "1:605636393130:web:da792d53852a1b187b78d3"
};

const fire = firebase.initializeApp(config);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default fire;