from flask import Flask, request, jsonify, send_from_directory, redirect, url_for
from flask_cors import CORS
import csv
import os

app = Flask(__name__)
CORS(app)

# 设置CSV文件路径
USERS_FILE = 'data/users.csv'

# 确保data目录存在
if not os.path.exists('data'):
    os.makedirs('data')

# 确保users.csv文件存在
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['username', 'email', 'password'])

# 处理根路径请求 - 重定向到登录页面
@app.route('/')
def index():
    return redirect(url_for('serve_static', filename='login.html'))

# 处理静态文件请求
@app.route('/<path:filename>')
def serve_static(filename):
    # 处理不同类型的静态文件
    if filename.endswith('.css'):
        return send_from_directory('css', filename)
    elif filename.endswith('.js'):
        return send_from_directory('js', filename)
    elif filename.endswith('.html'):
        return send_from_directory('.', filename)
    elif filename.endswith('.mp4'):
        return send_from_directory('sp', filename)
    elif filename.endswith('.jpg') or filename.endswith('.png'):
        if '/biankuang/' in filename:
            return send_from_directory('biankuang', filename.split('/')[-1])
        else:
            return send_from_directory('img', filename)
    elif filename.endswith('.ttf'):
        return send_from_directory('zit', filename)
    else:
        return send_from_directory('.', filename)

# 处理特定目录的静态文件请求
@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('css', filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('js', filename)

@app.route('/img/<path:filename>')
def serve_img(filename):
    return send_from_directory('img', filename)

@app.route('/sp/<path:filename>')
def serve_video(filename):
    return send_from_directory('sp', filename)

@app.route('/zit/<path:filename>')
def serve_font(filename):
    return send_from_directory('zit', filename)

@app.route('/biankuang/<path:filename>')
def serve_border(filename):
    return send_from_directory('biankuang', filename)

@app.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'})
        
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': '注册数据为空，请检查网络连接后重试'}), 400
            
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if not username:
            return jsonify({'success': False, 'message': '请填写用户名（不能为空）'}), 400
        if not email:
            return jsonify({'success': False, 'message': '请填写有效的电子邮箱地址'}), 400
        if not password:
            return jsonify({'success': False, 'message': '请设置账户密码，建议使用字母、数字的组合'}), 400
        
        # 检查用户是否已存在
        with open(USERS_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row['username'] == username:
                    return jsonify({'success': False, 'message': f'用户名"{username}"已被注册，请尝试其他用户名或直接登录'}), 409
                if row['email'] == email:
                    return jsonify({'success': False, 'message': f'邮箱"{email}"已被注册，您可以直接登录或使用其他邮箱注册'}), 409
        
        # 写入新用户数据
        with open(USERS_FILE, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([username, email, password])
        
        return jsonify({'success': True, 'message': f'恭喜！账号"{username}"注册成功！请返回登录页面使用该账号登录'})
        
    except Exception as e:
        print(f"注册错误: {str(e)}")
        return jsonify({'success': False, 'message': '抱歉，服务器暂时出现问题，请稍后再试。如果问题持续存在，请联系管理员'}), 500

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'})
        
    try:
        print("收到登录请求")
        data = request.get_json()
        print(f"请求数据: {data}")
        
        if not data:
            return jsonify({'success': False, 'message': '登录数据为空，请检查网络连接后重试'}), 400
            
        username = data.get('username')
        password = data.get('password')
        
        print(f"尝试登录: 用户名={username}")
        
        if not username:
            return jsonify({'success': False, 'message': '请输入您的用户名后再试'}), 400
        if not password:
            return jsonify({'success': False, 'message': '请输入您的密码后再试'}), 400
        
        # 验证用户
        try:
            with open(USERS_FILE, 'r', encoding='utf-8') as f:
                content = f.read()
                print(f"CSV文件内容: {content}")
                f.seek(0)
                reader = csv.DictReader(f)
                user_exists = False
                for row in reader:
                    print(f"检查用户行: {row}")
                    if row['username'] == username:
                        user_exists = True
                        if row['password'] == password:
                            return jsonify({'success': True, 'message': f'欢迎回来，{username}！登录成功'})
                        else:
                            return jsonify({'success': False, 'message': '密码不正确，请仔细检查后重试。如果忘记密码，请联系管理员'}), 401
                
                if not user_exists:
                    return jsonify({'success': False, 'message': f'用户名"{username}"不存在，请先注册或检查输入是否正确'}), 401
                
        except Exception as e:
            print(f"读取CSV文件错误: {str(e)}")
            raise
        
    except Exception as e:
        print(f"登录错误: {str(e)}")
        return jsonify({'success': False, 'message': '抱歉，服务器暂时出现问题，请稍后再试。如果问题持续存在，请联系管理员'}), 500

if __name__ == '__main__':
    print("服务器启动在 http://localhost:8882")  # 调试日志
    print(f"用户数据文件路径: {os.path.abspath(USERS_FILE)}")  # 调试日志
    app.run(debug=True, host='0.0.0.0', port=8882) 