import { toolsData } from './data.js';

// 페이지 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 초기 카테고리 설정
    changeCategory('document');
});

// 카테고리 변경 처리
function changeCategory(category) {
    // 버튼 스타일 업데이트
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    // 데이터 가져오기
    const data = toolsData[category];
    if (!data) {
        console.error('카테고리 데이터를 찾을 수 없습니다:', category);
        return;
    }

    // UI 업데이트
    updateRecommendedTools(data.recommended);
    updatePopularTools(data.popular);
    updateReviews(data.reviews);
}

// 추천 도구 UI 업데이트
function updateRecommendedTools(tools) {
    const container = document.getElementById('tool-cards');
    if (!container) return;

    container.innerHTML = tools.map(tool => `
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold">${tool.name}</h3>
                <button class="text-gray-400 hover:text-blue-500" onclick="toggleBookmark('${tool.id}')">
                    <i class="far fa-bookmark"></i>
                </button>
            </div>
            <p class="text-gray-600 mb-4">${tool.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">${tool.category}</span>
                <a href="${tool.url}" target="_blank" class="text-blue-500 hover:text-blue-600">
                    사용해보기 →
                </a>
            </div>
        </div>
    `).join('');
}

// 인기 도구 UI 업데이트
function updatePopularTools(tools) {
    const container = document.getElementById('popular-tool-list');
    if (!container) return;

    container.innerHTML = tools.map(tool => `
        <div class="bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <div>
                <h3 class="font-bold">${tool.name}</h3>
                <p class="text-sm text-gray-600">${tool.description}</p>
            </div>
            <div class="flex items-center">
                <span class="text-sm text-gray-500 mr-4">${tool.usageCount}회 사용</span>
                <a href="${tool.url}" target="_blank" class="text-blue-500 hover:text-blue-600">
                    사용하기
                </a>
            </div>
        </div>
    `).join('');
}

// 리뷰 UI 업데이트
function updateReviews(reviews) {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    container.innerHTML = reviews.map(review => `
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center mb-4">
                <img src="${review.userPhoto}" alt="${review.userName}" class="w-10 h-10 rounded-full mr-3">
                <div>
                    <h4 class="font-bold">${review.userName}</h4>
                    <p class="text-sm text-gray-500">${review.date}</p>
                </div>
            </div>
            <p class="text-gray-600 mb-4">${review.content}</p>
            <div class="flex items-center text-gray-500 text-sm">
                <span class="mr-4">
                    <i class="far fa-thumbs-up mr-1"></i>${review.likes}
                </span>
                <span>
                    <i class="far fa-comment mr-1"></i>${review.comments}
                </span>
            </div>
        </div>
    `).join('');
}

// 카테고리 버튼 이벤트 리스너
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const category = e.target.closest('button').dataset.category;
        if (category) {
            changeCategory(category);
        }
    });
});
import { signInWithGoogle, signOut, auth, checkUserInfo, updateUserInfo } from './auth.js';
import ui from './ui.js';

class App {
    constructor() {
        this.initializeAuth();
        this.initializeUI();
    }

    initializeAuth() {
        // 로그인 버튼 이벤트
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', async () => {
                try {
                    await signInWithGoogle();
                } catch (error) {
                    alert('로그인 중 오류가 발생했습니다.');
                }
            });
        }

        // 로그아웃 버튼 이벤트
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', async () => {
                try {
                    await signOut();
                } catch (error) {
                    alert('로그아웃 중 오류가 발생했습니다.');
                }
            });
        }

        // 사용자 정보 폼 제출 이벤트
        const userInfoForm = document.getElementById('userInfoForm');
        if (userInfoForm) {
            userInfoForm.addEventListener('submit', this.handleUserInfoSubmit.bind(this));
        }

        // 인증 상태 변경 감지
        auth.onAuthStateChanged(this.handleAuthStateChange.bind(this));
    }

    initializeUI() {
        ui.init();
    }

    async handleAuthStateChange(user) {
        const loginButton = document.getElementById('loginButton');
        const userProfile = document.getElementById('userProfile');
        const userPhoto = document.getElementById('userPhoto');
        const userName = document.getElementById('userName');
        const userInfoModal = document.getElementById('userInfoModal');
        
        if (user) {
            loginButton.style.display = 'none';
            userProfile.style.display = 'flex';
            if (userPhoto) userPhoto.src = user.photoURL || '';
            if (userName) userName.textContent = user.displayName || '';
            
            const hasUserInfo = await checkUserInfo(user);
            if (userInfoModal) {
                userInfoModal.style.display = hasUserInfo ? 'none' : 'flex';
            }
        } else {
            loginButton.style.display = 'flex';
            userProfile.style.display = 'none';
            if (userPhoto) userPhoto.src = '';
            if (userName) userName.textContent = '';
            if (userInfoModal) userInfoModal.style.display = 'none';
        }
    }

    async handleUserInfoSubmit(e) {
        e.preventDefault();
        
        const jobSelect = document.getElementById('jobSelect');
        const experienceSelect = document.getElementById('experienceSelect');
        
        if (!jobSelect || !experienceSelect) return;
        
        const job = jobSelect.value;
        const experience = experienceSelect.value;
        
        if (!job || !experience) {
            alert('모든 항목을 선택해주세요.');
            return;
        }

        try {
            const user = auth.currentUser;
            if (!user) return;

            await updateUserInfo(user, job, experience);
            document.getElementById('userInfoModal').style.display = 'none';
        } catch (error) {
            console.error('사용자 정보 저장 에러:', error);
            alert('정보 저장 중 오류가 발생했습니다.');
        }
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
