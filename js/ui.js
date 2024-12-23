import { toolsData, categories } from './data.js';

export class UI {
    constructor() {
        this.toolCards = document.getElementById('tool-cards');
        this.reviewsContainer = document.getElementById('reviews-container');
        this.categoryNav = document.querySelector('.category-nav');
        this.currentCategory = 'document';
    }

    init() {
        this.initializeCategories();
        this.displayContent('document');
    }

    initializeCategories() {
        const categoryButtons = categories.map(category => `
            <button data-category="${category.id}" 
                    class="category-btn ${category.id === 'document' ? 'active' : ''} px-4 py-2">
                ${category.name}
            </button>
        `).join('');

        this.categoryNav.innerHTML = categoryButtons;

        // 카테고리 버튼 이벤트 리스너
        this.categoryNav.addEventListener('click', (e) => {
            const btn = e.target.closest('.category-btn');
            if (!btn) return;

            const category = btn.dataset.category;
            this.updateActiveCategory(btn);
            this.displayContent(category);
        });
    }

    updateActiveCategory(activeButton) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    displayContent(category) {
        const data = toolsData[category];
        if (!data) return;

        this.displayTools(data.recommended);
        this.displayReviews(data.reviews);
    }

    displayTools(tools) {
        this.toolCards.innerHTML = tools.map(tool => this.createToolCard(tool)).join('');
    }

    createToolCard(tool) {
        return `
            <div class="tool-card p-4">
                <img src="${tool.image}" alt="${tool.name}" class="w-32 h-32 object-contain rounded-lg mb-3">
                <h3 class="font-bold mb-1">${tool.name}</h3>
                <div class="flex items-center text-sm text-gray-600 mb-2">
                    <i class="fas fa-star text-yellow-400 mr-1"></i>
                    <span>${tool.rating}</span>
                    <span class="mx-2">|</span>
                    <span>사용자 ${tool.users}</span>
                </div>
                <p class="text-sm text-gray-500">${tool.description}</p>
            </div>
        `;
    }

    displayReviews(reviews) {
        this.reviewsContainer.innerHTML = reviews.map(review => this.createReviewCard(review)).join('');
    }

    createReviewCard(review) {
        return `
            <div class="review-card">
                <div class="flex items-center mb-3">
                    <img src="${review.image}" alt="${review.name}" class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <div class="font-bold">${review.name}</div>
                        <div class="text-sm text-gray-500">${review.role}</div>
                    </div>
                    <div class="ml-auto">
                        <i class="fab fa-${review.platform} text-gray-400"></i>
                    </div>
                </div>
                <p class="text-gray-700">${review.content}</p>
                <div class="text-sm text-gray-500 mt-2">${review.time}</div>
            </div>
        `;
    }
}

export default new UI();
