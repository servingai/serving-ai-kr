// Firebase 인증 관련 함수들
import { db, auth } from './firebase-config.js';

// 네트워크 상태 모니터링
let isOffline = false;

window.addEventListener('online', () => {
    if (isOffline) {
        console.log('백엔드 연결 복구 중...');
        window.location.reload();
    }
});

window.addEventListener('offline', () => {
    isOffline = true;
    console.log('오프라인 모드로 전환됨');
});

// Google 로그인
export async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        
        console.log('Google 로그인 시도...');
        const result = await auth.signInWithPopup(provider);
        console.log('로그인 성공:', result.user.email);
        
        // 사용자 정보 Firestore에 저장
        await saveUserToFirestore(result.user);
        
        return result.user;
    } catch (error) {
        console.error('로그인 에러:', error);
        console.error('에러 코드:', error.code);
        console.error('에러 메시지:', error.message);
        throw error;
    }
}

// 로그아웃
export async function signOut() {
    try {
        await auth.signOut();
        console.log('로그아웃 성공');
    } catch (error) {
        console.error('로그아웃 에러:', error);
        throw error;
    }
}

// 사용자 정보 Firestore에 저장
async function saveUserToFirestore(user) {
    try {
        const userRef = db.collection('users').doc(user.uid);
        await userRef.set({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log('사용자 정보 저장 성공');
    } catch (error) {
        console.error('사용자 정보 저장 실패:', error);
    }
}

// 인증 상태 변경 리스너
auth.onAuthStateChanged((user) => {
    console.log('인증 상태 변경:', user ? user.email : '로그아웃');
    updateUIForAuth(user);
});

// UI 업데이트
function updateUIForAuth(user) {
    const loginButton = document.getElementById('loginButton');
    const userProfile = document.getElementById('userProfile');
    const userPhoto = document.getElementById('userPhoto');
    const userName = document.getElementById('userName');

    if (user) {
        // 로그인 상태
        loginButton.style.display = 'none';
        userProfile.style.display = 'flex';
        if (userPhoto) userPhoto.src = user.photoURL || '';
        if (userName) userName.textContent = user.displayName || user.email;
    } else {
        // 로그아웃 상태
        loginButton.style.display = 'flex';
        userProfile.style.display = 'none';
    }
}

export const checkUserInfo = async (user) => {
    if (!user?.uid) return false;

    try {
        const userDoc = await db.collection('users').doc(user.uid).get();
        return userDoc.exists && userDoc.data()?.job && userDoc.data()?.experience;
    } catch (error) {
        console.error('사용자 정보 확인 중 오류:', error);
        return false;
    }
};

export const updateUserInfo = async (user, job, experience) => {
    if (!user?.uid || !job || !experience) {
        throw new Error('유효하지 않은 데이터');
    }

    const userInfo = {
        job,
        experience,
        updatedAt: new Date().toISOString()
    };

    try {
        await db.collection('users').doc(user.uid).set(userInfo, { merge: true });
        return true;
    } catch (error) {
        console.error('사용자 정보 저장 실패:', error);
        throw error;
    }
};

export { auth, db };
