// 活动数据
const eventData = {
    current: [
        {
            image: './img/tea.jpg',
            title: '云南茶艺文化体验',
            date: '2024-03-15',
            location: '普洱',
            description: '体验云南特色茶艺文化，品尝普洱茶，了解茶叶制作工艺。',
            tags: [
                { icon: 'fas fa-leaf', text: '茶文化' },
                { icon: 'fas fa-hands', text: '互动体验' }
            ],
            price: '¥288/人',
            duration: '3小时'
        },
        {
            image: './img/dance.jpg',
            title: '民族舞蹈工作坊',
            date: '2024-04-20',
            location: '西双版纳',
            description: '学习傣族、彝族等少数民族传统舞蹈，感受民族艺术魅力。',
            tags: [
                { icon: 'fas fa-music', text: '舞蹈' },
                { icon: 'fas fa-users', text: '团体活动' }
            ],
            price: '¥198/人',
            duration: '2小时'
        },
        {
            image: './img/craft.jpg',
            title: '传统手工艺制作',
            date: '2024-05-10',
            location: '大理',
            description: '学习扎染、银器制作等传统工艺，创作专属作品。',
            tags: [
                { icon: 'fas fa-paint-brush', text: '手工艺' },
                { icon: 'fas fa-star', text: '创作' }
            ],
            price: '¥368/人',
            duration: '4小时'
        },
        {
            image: './img/dongba.jpg',
            title: '东巴文化探索',
            date: '2024-04-05',
            location: '丽江',
            description: '深入了解纳西族东巴文化，学习东巴象形文字，聆听东巴祭司讲述古老传说。',
            tags: [
                { icon: 'fas fa-book', text: '文化传承' },
                { icon: 'fas fa-history', text: '古老智慧' }
            ],
            price: '¥258/人',
            duration: '3小时'
        },
        {
            image: './img/cooking.jpg',
            title: '云南特色美食制作',
            date: '2024-03-25',
            location: '昆明',
            description: '跟随大厨学习云南特色菜品制作，品尝自己的烹饪成果。',
            tags: [
                { icon: 'fas fa-utensils', text: '美食' },
                { icon: 'fas fa-chef', text: '烹饪' }
            ],
            price: '¥328/人',
            duration: '4小时'
        },
        {
            image: './img/photo.jpg',
            title: '古镇摄影之旅',
            date: '2024-05-15',
            location: '建水',
            description: '探访古镇，捕捉最美的建筑与人文景观，专业摄影师现场指导。',
            tags: [
                { icon: 'fas fa-camera', text: '摄影' },
                { icon: 'fas fa-landmark', text: '古镇' }
            ],
            price: '¥428/人',
            duration: '6小时'
        }
    ],
    featured: {
        image: './img/featured.jpg',
        title: '云南文化探索之旅',
        description: '深入云南各地，探访少数民族村寨，体验独特的民族文化。通过实地考察、文化交流、艺术创作等形式，让参与者深入了解云南多元文化的魅力。活动包括传统工艺学习、民族音乐欣赏、美食制作等丰富内容。',
        duration: '3天',
        price: '¥2988/人',
        highlights: [
            '少数民族村寨深度游',
            '传统工艺制作体验',
            '民族音乐欣赏与学习',
            '特色美食制作课程',
            '文化交流互动环节'
        ]
    },
    stats: [
        { number: '26', label: '民族文化' },
        { number: '100+', label: '文化活动' },
        { number: '5000+', label: '活动参与者' },
        { number: '50+', label: '合作机构' }
    ]
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 更新活动卡片
    const eventsGrid = document.querySelector('.events-grid');
    if (eventsGrid) {
        eventsGrid.innerHTML = eventData.current.map(event => `
            <div class="event-card">
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-content">
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-info">
                        <span><i class="far fa-calendar"></i>${event.date}</span>
                        <span><i class="fas fa-map-marker-alt"></i>${event.location}</span>
                        <span><i class="far fa-clock"></i>${event.duration}</span>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-price">${event.price}</div>
                    <div class="event-tags">
                        ${event.tags.map(tag => `
                            <span class="event-tag"><i class="${tag.icon}"></i>${tag.text}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 更新特色活动
    const featuredContent = document.querySelector('.featured-content');
    if (featuredContent) {
        const featured = eventData.featured;
        featuredContent.querySelector('.featured-description').textContent = featured.description;
        
        // 添加亮点列表
        const highlightsList = document.createElement('ul');
        highlightsList.className = 'featured-highlights';
        highlightsList.innerHTML = featured.highlights.map(highlight => `
            <li><i class="fas fa-check"></i>${highlight}</li>
        `).join('');
        
        const featuredText = featuredContent.querySelector('.featured-text');
        featuredText.insertBefore(highlightsList, featuredText.querySelector('.join-button'));
    }

    // 更新统计数据
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsSection.innerHTML = eventData.stats.map(stat => `
            <div class="stat-item">
                <div class="stat-number">${stat.number}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }
}); 