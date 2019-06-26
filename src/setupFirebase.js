import firebase from 'firebase';
// Required for side-effects
import 'firebase/firestore';

// Initialize Cloud Firestore + auth through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyBObepcBH4C2-agW8Q-46DWfas7c9GKFmQ',
    authDomain: 'uw-journal-asa.firebaseapp.com',
    projectId: 'uw-journal-asa'
});