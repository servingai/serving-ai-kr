// 북마크 관련 함수들
const bookmarksCollection = firebase.firestore().collection('bookmarks');

// 북마크 추가
async function addBookmark(userId, toolId, toolData) {
    try {
        const bookmarkRef = bookmarksCollection.doc(`${userId}_${toolId}`);
        await bookmarkRef.set({
            userId: userId,
            toolId: toolId,
            toolData: toolData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('북마크가 추가되었습니다.');
        return true;
    } catch (error) {
        console.error('북마크 추가 중 오류:', error);
        return false;
    }
}

// 북마크 제거
async function removeBookmark(userId, toolId) {
    try {
        const bookmarkRef = bookmarksCollection.doc(`${userId}_${toolId}`);
        await bookmarkRef.delete();
        console.log('북마크가 제거되었습니다.');
        return true;
    } catch (error) {
        console.error('북마크 제거 중 오류:', error);
        return false;
    }
}

// 북마크 상태 확인
async function isBookmarked(userId, toolId) {
    try {
        const bookmarkRef = bookmarksCollection.doc(`${userId}_${toolId}`);
        const doc = await bookmarkRef.get();
        return doc.exists;
    } catch (error) {
        console.error('북마크 상태 확인 중 오류:', error);
        return false;
    }
}

// 사용자의 모든 북마크 가져오기
async function getUserBookmarks(userId) {
    try {
        const snapshot = await bookmarksCollection
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();
        
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error('북마크 목록 가져오기 중 오류:', error);
        return [];
    }
}

// 북마크 토글 (추가/제거)
async function toggleBookmark(toolId, toolData) {
    const user = firebase.auth().currentUser;
    
    if (!user) {
        // 로그인되지 않은 경우 로그인 페이지로 이동
        window.location.href = 'login.html';
        return false;
    }

    const isCurrentlyBookmarked = await isBookmarked(user.uid, toolId);
    
    if (isCurrentlyBookmarked) {
        return await removeBookmark(user.uid, toolId);
    } else {
        return await addBookmark(user.uid, toolId, toolData);
    }
}

// 북마크 버튼 UI 업데이트
async function updateBookmarkButtonUI(buttonElement, toolId) {
    const user = firebase.auth().currentUser;
    
    if (user) {
        const isCurrentlyBookmarked = await isBookmarked(user.uid, toolId);
        buttonElement.classList.toggle('bookmarked', isCurrentlyBookmarked);
        buttonElement.innerHTML = `<i class="fas fa-bookmark${isCurrentlyBookmarked ? ' text-blue-500' : ''}"></i>`;
    }
}

export {
    addBookmark,
    removeBookmark,
    isBookmarked,
    getUserBookmarks,
    toggleBookmark,
    updateBookmarkButtonUI
};
