document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const scenicId = urlParams.get('id');
    
    fetch(`./data/scenic_spots.json`)
        .then(response => response.json())
        .then(data => {
            const scenic = data.spots.find(spot => spot.id === scenicId);
            if (scenic) {
                updateScenicDetails(scenic);
            }
        });
});

function updateScenicDetails(scenic) {
    document.title = `${scenic.name} - 云南数字云旅`;
    
    document.querySelector('.scenic-detail-left').style.backgroundImage = `url(${scenic.image})`;
    
    document.querySelector('.scenic-image').src = scenic.image;
    
    document.querySelector('.scenic-name').textContent = scenic.name;
    document.querySelector('.location').textContent = scenic.location;
    document.querySelector('.opening-hours').textContent = scenic.openingHours;
    document.querySelector('.ticket-price').textContent = scenic.ticketPrice;
    document.querySelector('.visit-time').textContent = scenic.visitTime;
    document.querySelector('.scenic-description').textContent = scenic.description;
    
    loadComments(scenic.id);
}

function loadComments(scenicId) {
    const comments = [
        {
            user: "游客1",
            content: "景色非常美，值得一游！",
            date: "2024-03-20"
        },
        {
            user: "游客2",
            content: "景区服务很好，环境优美。",
            date: "2024-03-19"
        }
    ];
    
    const commentsContainer = document.querySelector('.comments-container');
    commentsContainer.innerHTML = '';
    
    if (comments.length === 0) {
        commentsContainer.innerHTML = '<p class="no-comments">暂无评论，来做第一个评论的人吧！</p>';
        return;
    }
    
    comments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsContainer.appendChild(commentElement);
    });
}

function createCommentElement(comment) {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `
        <div class="comment-header">
            <span class="comment-user">${comment.user}</span>
            <span class="comment-date">${comment.date}</span>
        </div>
        <div class="comment-content">${comment.content}</div>
    `;
    return div;
} 