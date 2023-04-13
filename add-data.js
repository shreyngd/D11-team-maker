const {initializeApp} = require("firebase/app");
// Required for side-effects
const {getFirestore,collection,addDoc} = require("firebase/firestore");
const fs = require('fs')
const data = require('./players.json')
console.log(JSON.stringify(data));

const app = initializeApp({
    apiKey: "AIzaSyA5Zm8y3E29We0qc-c_x1slayWvjPSNCGE",
    authDomain: "d11-teams.firebaseapp.com",
    projectId: "d11-teams",
    storageBucket: "d11-teams.appspot.com",
    messagingSenderId: "514097225808",
    appId: "1:514097225808:web:3486d6fc9cdf60ccb1f155",
    measurementId: "G-MCEX0CX80S"
  });
  
const db = getFirestore(app);

const matchesCollectionRef = collection(db, 'players');

data.forEach(async function(doc) {
    const res = await addDoc(matchesCollectionRef, doc)
    console.log(res.id);
});