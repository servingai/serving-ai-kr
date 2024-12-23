// Firebase 인증 관련 함수들
import { GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

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
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        
        console.log('Google 로그인 시도...');
        const result = await signInWithPopup(window.auth, provider);
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
        await window.auth.signOut();
        console.log('로그아웃 성공');
    } catch (error) {
        console.error('로그아웃 에러:', error);
        throw error;
    }
}

// 사용자 정보 Firestore에 저장
async function saveUserToFirestore(user) {
    try {
        const userRef = doc(window.db, 'users', user.uid);
        await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastLogin: new Date()
        }, { merge: true });
        console.log('사용자 정보 저장 성공');
    } catch (error) {
        console.error('사용자 정보 저장 에러:', error);
        throw error;
    }
}

// 인증 상태 변경 리스너
window.auth.onAuthStateChanged((user) => {
    console.log('인증 상태 변경:', user ? user.email : '로그아웃');
    updateUIForAuth(user);
});

// UI 업데이트
function updateUIForAuth(user) {
    const loginButton = document.getElementById('loginButton');
    const userProfile = document.getElementById('userProfile');
    
    if (loginButton && userProfile) {
        if (user) {
            loginButton.style.display = 'none';
            userProfile.style.display = 'flex';
            
            const userImage = userProfile.querySelector('img');
            const userName = userProfile.querySelector('.user-name');
            
            if (userImage) userImage.src = user.photoURL || 'default-profile.png';
            if (userName) userName.textContent = user.displayName || user.email;
        } else {
            loginButton.style.display = 'block';
            userProfile.style.display = 'none';
        }
    }
}

export const checkUserInfo = async (user) => {
    if (!user?.uid) return false;

    try {
        const userDoc = await getDoc(doc(window.db, 'users', user.uid));
        return userDoc.exists() && userDoc.data()?.job && userDoc.data()?.experience;
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
        await setDoc(doc(window.db, 'users', user.uid), userInfo, { merge: true });
        return true;
    } catch (error) {
        console.error('사용자 정보 저장 실패:', error);
        throw error;
    }
};

export { window.auth as auth, window.db as db };
