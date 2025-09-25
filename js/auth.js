// 检查登录状态
function checkLoginStatus() {
    const username = localStorage.getItem('username');
    const loginBtns = document.querySelectorAll('.login-btn');
    
    loginBtns.forEach(btn => {
        const parentDiv = btn.parentElement;
        
        if (username) {
            // 用户已登录
            if (!parentDiv.querySelector('.welcome-text')) {
                btn.style.display = 'none';
                const welcomeText = document.createElement('span');
                welcomeText.className = 'welcome-text';
                welcomeText.innerHTML = `
                    欢迎您, <span class="username">${username}</span>
                    <a href="javascript:void(0)" onclick="logout()" class="logout-link">退出</a>
                `;
                parentDiv.appendChild(welcomeText);
            }
        } else {
            // 用户未登录
            btn.style.display = 'inline-block';
            const welcomeText = parentDiv.querySelector('.welcome-text');
            if (welcomeText) {
                welcomeText.remove();
            }
        }
    });
}

// 退出登录
function logout() {
    localStorage.removeItem('username');
    window.location.reload();
}

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', checkLoginStatus); 