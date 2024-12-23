import { auth, db } from './firebase-config.js';

// 사용자 정보 로드
auth.onAuthStateChanged(async (user) => {
    if (user) {
        // 기본 프로필 정보 표시
        document.getElementById('userPhoto').src = user.photoURL || 'https://via.placeholder.com/60';
        document.getElementById('userName').textContent = user.displayName || '사용자';
        document.getElementById('userEmail').textContent = user.email;

        try {
            // Firestore에서 추가 정보 로드
            const userDoc = await db.collection('users').doc(user.uid).get();
            const userData = userDoc.data();
            
            if (userData) {
                document.getElementById('userJob').textContent = userData.job || '-';
                document.getElementById('userExperience').textContent = 
                    userData.experience ? `${userData.experience}년차` : '-';
            }
        } catch (error) {
            console.error('사용자 정보 로드 실패:', error);
        }
    } else {
        // 로그인하지 않은 경우 메인 페이지로 리다이렉트
        window.location.href = 'index.html';
    }
});
