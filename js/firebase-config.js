// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyAkGS-4rZyuRjYJcdkpTHMX-jH-ODWQsU4",
    authDomain: "servingai-af0b7.firebaseapp.com",
    projectId: "servingai-af0b7",
    storageBucket: "servingai-af0b7.firebasestorage.app",
    messagingSenderId: "961797414957",
    appId: "1:961797414957:web:0ee940703bc2cc4e9158a4",
    measurementId: "G-8611SBRZW0"
};

// Firebase 초기화
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Firebase 서비스 인스턴스
const auth = firebase.auth();
const db = firebase.firestore();

// 오프라인 지속성 설정
const PERSISTENCE_ENABLED = false;  // 일단 비활성화

if (PERSISTENCE_ENABLED) {
    db.enablePersistence()
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
            } else if (err.code == 'unimplemented') {
                console.log('The current browser does not support all of the features required to enable persistence');
            }
        });
}

export { auth, db };
