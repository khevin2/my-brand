
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDownloadURL, getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import showError from "./show_error.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhFACtgIuzjlq1-1LTii2ObUlLcFQyU1w",
    authDomain: "my-brand-894c8.firebaseapp.com",
    projectId: "my-brand-894c8",
    storageBucket: "my-brand-894c8.appspot.com",
    messagingSenderId: "990804009288",
    appId: "1:990804009288:web:8caad17ce6c835f48a937d",
    measurementId: "G-HGLL7SF6KF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export async function uploadToFirebase(file) {
    if (!file) throw "Problem with your file.."
    const storageRef = ref(storage, 'mybrand/' + `${new Date().getTime()}-${file.name}`)

    try {
        const snapshot = await uploadBytes(storageRef, file)
        const url = await getDownloadURL(snapshot.ref)
        return url

    } catch (err) {
        console.error(err)
        return err
    }
}