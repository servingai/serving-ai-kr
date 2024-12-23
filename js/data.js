// AI 도구 데이터
const aiTools = {
    document: {
        recommended: [
            {
                id: 1,
                name: 'ChatGPT',
                description: '다목적 AI 어시스턴트로, 자연스러운 대화를 통해 다양한 작업을 수행할 수 있습니다.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
                rating: 4.8,
                users: '1억+',
                category: '문서작성'
            },
            {
                id: 2,
                name: 'Notion AI',
                description: '노션에 통합된 AI 기능으로 문서 작성과 편집을 효율적으로 도와줍니다.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
                rating: 4.6,
                users: '3천만+',
                category: '문서작성'
            }
        ],
        reviews: [
            {
                name: '김지현',
                role: '콘텐츠 크리에이터',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
                content: 'Notion AI로 블로그 글 작성이 훨씬 수월해졌어요. 특히 글의 구조를 잡는 데 큰 도움이 됩니다.',
                platform: 'instagram',
                time: '3시간 전'
            },
            {
                name: '이승우',
                role: '프리랜서 작가',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
                content: 'ChatGPT의 브레인스토밍 기능이 정말 좋아요. 다양한 아이디어를 빠르게 얻을 수 있습니다.',
                platform: 'twitter',
                time: '4시간 전'
            }
        ]
    },
    analysis: {
        recommended: [
            {
                id: 3,
                name: 'Excel Copilot',
                description: 'AI가 엑셀 작업을 도와주어 복잡한 데이터 분석을 쉽게 할 수 있습니다.',
                image: 'https://img.icons8.com/color/480/microsoft-excel-2019--v1.png',
                rating: 4.5,
                users: '2천만+',
                category: '데이터분석'
            },
            {
                id: 4,
                name: 'Power BI',
                description: '직관적인 인터페이스로 전문적인 데이터 시각화를 만들 수 있습니다.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
                rating: 4.7,
                users: '1천만+',
                category: '데이터분석'
            }
        ],
        reviews: [
            {
                name: '박준영',
                role: '데이터 애널리스트',
                image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
                content: 'Excel Copilot 덕분에 복잡한 데이터 분석이 훨씬 쉬워졌어요. 자동 피벗 테이블 생성이 특히 유용합니다.',
                platform: 'linkedin',
                time: '2시간 전'
            }
        ]
    },
    uiux: {
        recommended: [
            {
                id: 5,
                name: 'Galileo AI',
                description: '종이에 손으로 직접그린 UI 사진을 입력하면 순식간에 app디자인으로 뽑아줍니다!',
                image: 'https://cdn-1.webcatalog.io/catalog/galileo-ai/galileo-ai-icon-filled-256.png?v=1714782968140',
                rating: 4.9,
                users: '50만+',
                category: 'UI/UX디자인'
            },
            {
                id: 6,
                name: 'Creatie.ai',
                description: 'AI 기반의 디자인 자동화 도구로, 브랜드 아이덴티티에 맞는 디자인을 빠르게 생성합니다.',
                image: 'https://framerusercontent.com/images/92oPb2FnxFPaRsACv1aFbgc4bE.png?scale-down-to=512',
                rating: 4.7,
                users: '30만+',
                category: 'UI/UX디자인'
            }
        ]
    }
};

const categories = [
    { id: 'document', name: '문서작성' },
    { id: 'analysis', name: '데이터분석' },
    { id: 'uiux', name: 'UI/UX디자인' },
    { id: 'presentation', name: '프레젠테이션' }
];

export { aiTools, categories };
export const toolsData = {
    document: {
        recommended: [
            {
                name: 'ChatGPT',
                description: '다목적 AI 어시스턴트로, 자연스러운 대화를 통해 다양한 작업을 수행할 수 있습니다.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
                rating: 4.8,
                users: '1억+'
            },
            {
                name: 'Notion AI',
                description: '노션에 통합된 AI 기능으로 문서 작성과 편집을 효율적으로 도와줍니다.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
                rating: 4.6,
                users: '3천만+'
            }
        ],
        reviews: [
            {
                name: '김지현',
                role: '콘텐츠 크리에이터',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
                content: 'Notion AI로 블로그 글 작성이 훨씬 수월해졌어요. 특히 글의 구조를 잡는 데 큰 도움이 됩니다.',
                platform: 'instagram',
                time: '3시간 전'
            },
            {
                name: '이승우',
                role: '프리랜서 작가',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
                content: 'ChatGPT의 브레인스토밍 기능이 정말 좋아요. 다양한 아이디어를 빠르게 얻을 수 있습니다.',
                platform: 'twitter',
                time: '4시간 전'
            }
        ]
    },
    analysis: {
        recommended: [
            {
                name: 'Excel Copilot',
                description: 'AI가 엑셀 작업을 도와주어 복잡한 데이터 분석을 쉽게 할 수 있습니다.',
                image: 'https://img.icons8.com/color/480/microsoft-excel-2019--v1.png',
                rating: 4.5,
                users: '2천만+'
            },
            {
                name: 'Power BI',
                description: '직관적인 인터페이스로 전문적인 데이터 시각화를 만들 수 있습니다.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
                rating: 4.7,
                users: '1천만+'
            }
        ],
        reviews: [
            {
                name: '박준영',
                role: '데이터 애널리스트',
                image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
                content: 'Excel Copilot 덕분에 복잡한 데이터 분석이 훨씬 쉬워졌어요. 자동 피벗 테이블 생성이 특히 유용합니다.',
                platform: 'linkedin',
                time: '2시간 전'
            }
        ]
    },
    // ... 다른 카테고리 데이터 ...
};

export const jobTypes = [
    { id: 'developer', name: '개발자' },
    { id: 'designer', name: '디자이너' },
    { id: 'pm-po', name: 'PM/PO/기획자' },
    { id: 'data-analyst', name: '데이터 분석가' },
    { id: 'researcher', name: '연구원' },
    { id: 'marketer', name: '마케터' }
];

export const categories = [
    { id: 'document', name: '문서작성' },
    { id: 'analysis', name: '데이터분석' },
    { id: 'uiux', name: 'UI/UX디자인' },
    { id: 'presentation', name: '프레젠테이션' }
];
