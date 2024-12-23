import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, enableIndexedDbPersistence } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase 구성
const firebaseConfig = {
    apiKey: "AIzaSyAkGS-4rZyuRjYJcdkpTHMX-jH-ODWQsU4",
    authDomain: "servingai-af0b7.firebaseapp.com",
    projectId: "servingai-af0b7",
    storageBucket: "servingai-af0b7.appspot.com",
    messagingSenderId: "961797414957",
    appId: "1:961797414957:web:0ee940703bc2cc4e9158a4",
    measurementId: "G-8611SBRZW0"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 초기화
const auth = getAuth(app);
const db = getFirestore(app);

// Firestore 오프라인 지원 설정
try {
    enableIndexedDbPersistence(db, {
        cacheSizeBytes: 50000000  // 약 50MB
    });
    console.log('Firestore 오프라인 지원이 활성화되었습니다.');
} catch (err) {
    if (err.code == 'failed-precondition') {
        console.warn('여러 탭이 열려있어 오프라인 지원을 활성화할 수 없습니다.');
    } else if (err.code == 'unimplemented') {
        console.warn('현재 브라우저는 오프라인 지원을 지원하지 않습니다.');
    }
}

export { app, auth, db };
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

// Firebase 초기화 전에 기존 앱이 있는지 확인
let app;
try {
    app = firebase.app();
    console.log('기존 Firebase 앱 사용');
} catch (error) {
    app = firebase.initializeApp(firebaseConfig);
    console.log('새 Firebase 앱 초기화');
}

const db = firebase.firestore();
const auth = firebase.auth();

// Firestore 설정
const ENABLE_PERSISTENCE = true;

if (ENABLE_PERSISTENCE) {
    db.enablePersistence()
        .then(() => {
            console.log('Firestore 오프라인 지속성 활성화 성공');
        })
        .catch((err) => {
            console.error('Firestore 오프라인 지속성 활성화 실패:', err);
            if (err.code === 'failed-precondition') {
                console.warn('여러 탭이 열려 있어 오프라인 지속성을 활성화할 수 없습니다.');
            } else if (err.code === 'unimplemented') {
                console.warn('현재 브라우저는 오프라인 지속성을 지원하지 않습니다.');
            }
        });
}

// 네트워크 상태 모니터링
db.enableNetwork()
    .then(() => {
        console.log('Firestore 네트워크 활성화됨');
    })
    .catch(err => {
        console.error('Firestore 네트워크 활성화 실패:', err);
    });

export { db, auth, app };
