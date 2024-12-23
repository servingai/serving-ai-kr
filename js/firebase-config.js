import firebase from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-compat.js';

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

const db = firebase.firestore();
const auth = firebase.auth();

// Firestore 설정
db.settings({
    merge: true
});

// 오프라인 지속성 활성화
db.enablePersistence()
    .then(() => {
        console.log('Firestore 오프라인 지속성 활성화 성공');
    })
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            console.warn('여러 탭이 열려 있어 오프라인 지속성을 활성화할 수 없습니다.');
        } else if (err.code === 'unimplemented') {
            console.warn('현재 브라우저는 오프라인 지속성을 지원하지 않습니다.');
        }
    });

export { db, auth };
