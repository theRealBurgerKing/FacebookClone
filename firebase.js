import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlDKTjV_TCAM7_I-VtkAjl2z4C_NVMPv4",
    authDomain: "facebookclone-5e5d1.firebaseapp.com",
    projectId: "facebookclone-5e5d1",
    storageBucket: "facebookclone-5e5d1.firebasestorage.app",
    messagingSenderId: "180485022891",
    appId: "1:180485022891:web:f8da551e1f7749e2e503ee",
    measurementId: "G-6QKKC0EC04"
};

// 初始化 Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
