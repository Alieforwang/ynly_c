// 美食数据
const foodData = {
    kunming: [
        {
            image: './img/guoqiaomixian.jpg',
            title: '过桥米线',
            description: '云南名菜，以鸡汤浇烫米线，配以丰富的肉片、海鲜和蔬菜，汤汁浓郁，口感鲜美。',
            price: '¥25-35',
            tags: ['昆明特色', '传统名菜']
        },
        {
            image: './img/erkuai.jpg',
            title: '昆明饵块',
            description: '昆明传统小吃，以大米为原料制成的米制品，可炒可蒸，口感独特。',
            price: '¥15-20',
            tags: ['昆明特色', '传统小吃']
        }
    ],
    dali: [
        {
            image: './img/rushan.jpg',
            title: '大理乳扇',
            description: '大理白族特色小吃，以新鲜牛奶制成，口感细腻，奶香浓郁，可烤制食用。',
            price: '¥15-25/份',
            tags: ['大理特产', '白族美食']
        },
        {
            image: './img/xizhou.jpg',
            title: '喜洲粑粑',
            description: '大理名点，外皮金黄酥脆，内馅香甜可口，是大理白族的传统美食。',
            price: '¥8-12/个',
            tags: ['大理特色', '传统糕点']
        }
    ],
    lijiang: [
        {
            image: './img/naxi.jpg',
            title: '纳西火腿',
            description: '丽江特产，以独特的腌制工艺闻名，肉质鲜美，香味浓郁，营养丰富。',
            price: '¥180起/斤',
            tags: ['丽江特产', '传统腊味']
        },
        {
            image: './img/mushroom.jpg',
            title: '野生菌火锅',
            description: '云南特色火锅，以各种珍稀野生菌为主料，汤底清淡，突出菌类原味。',
            price: '¥158起/锅',
            tags: ['季节限定', '养生美食']
        }
    ],
    xishuangbanna: [
        {
            image: './img/pineapple.jpg',
            title: '西双版纳菠萝饭',
            description: '傣族特色美食，以新鲜菠萝为容器，糯米饭配以椰奶，香甜可口。',
            price: '¥38/份',
            tags: ['傣族美食', '特色主食']
        },
        {
            image: './img/qiguo.jpg',
            title: '汽锅鸡',
            description: '云南特色蒸汽火锅，以土鸡为主料，配以菌类和时令蔬菜，蒸汽加热保持食材原汁原味。',
            price: '¥128起/锅',
            tags: ['建水名菜', '火锅']
        }
    ]
};

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.region-btn');
    const foodGrid = document.querySelector('.food-grid');

    // 添加按钮点击事件
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            buttons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            button.classList.add('active');
            
            // 获取选中的地区
            const region = button.textContent;
            updateFoodDisplay(region);
        });
    });

    // 更新食物展示
    function updateFoodDisplay(region) {
        // 清空现有内容
        foodGrid.innerHTML = '';
        
        // 确定要显示的数据
        let displayData = [];
        if (region === '全部') {
            // 合并所有地区的数据
            displayData = [
                ...foodData.kunming,
                ...foodData.dali,
                ...foodData.lijiang,
                ...foodData.xishuangbanna
            ];
        } else {
            // 根据地区选择数据
            const regionMap = {
                '昆明': 'kunming',
                '大理': 'dali',
                '丽江': 'lijiang',
                '西双版纳': 'xishuangbanna'
            };
            displayData = foodData[regionMap[region]] || [];
        }

        // 创建并添加食物卡片
        displayData.forEach(food => {
            const foodCard = createFoodCard(food);
            foodGrid.appendChild(foodCard);
        });
    }

    // 创建食物卡片
    function createFoodCard(food) {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <img src="${food.image}" alt="${food.title}" class="food-image">
            <div class="food-content">
                <h3 class="food-title">${food.title}</h3>
                <p class="food-description">${food.description}</p>
                <div class="food-price">${food.price}</div>
                <div class="food-tags">
                    ${food.tags.map(tag => `<span class="food-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        return card;
    }

    // 初始显示全部美食
    updateFoodDisplay('全部');
}); 