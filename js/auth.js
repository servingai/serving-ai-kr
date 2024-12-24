// Firebase 인증 관련 함수들
import { auth } from './firebase-config.js';

// Google 로그인
export async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        
        // 사용자 정보 Firestore에 저장
        const userRef = firebase.firestore().collection('users').doc(result.user.uid);
        await userRef.set({
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        return result.user;
    } catch (error) {
        console.error('로그인 에러:', error);
        throw error;
    }
}

// 로그아웃
export async function signOut() {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('로그아웃 에러:', error);
        throw error;
    }
}
