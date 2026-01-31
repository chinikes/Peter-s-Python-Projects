```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .login-container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }

        h1 {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
            font-size: 24px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: bold;
            font-size: 14px;
        }

        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            transition: border-color 0.3s;
        }

        input[type="text"]:focus,
        input[type="password"]:focus {
            outline: none;
            border-color: #4CAF50;
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-bottom: 15px;
        }

        button:hover {
            background-color: #45a049;
        }

        button:active {
            background-color: #3d8b40;
        }

        .google-login {
            width: 100%;
            padding: 12px;
            background-color: #f1f1f1;
            color: #333;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .google-login:hover {
            background-color: #e8e8e8;
        }

        #message {
            margin-top: 20px;
            padding: 15px;
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 4px;
            text-align: center;
            font-weight: bold;
            display: none;
        }

        #message.error {
            background-color: #f8d7da;
            color: #721c24;
            border-color: #f5c6cb;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>Login</h1>
        <form id="loginForm">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
        <button class="google-login" id="googleBtn">🔐 Login with Google</button>
        <div id="message"></div>
    </div>

    <script>
        const loginForm = document.getElementById('loginForm');
        const messageDiv = document.getElementById('message');
        const googleBtn = document.getElementById('googleBtn');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username === '' || password === '') {
                messageDiv.textContent = 'Please fill in all fields';
                messageDiv.classList.add('error');
                messageDiv.style.display = 'block';
                return;
            }

            messageDiv.textContent = 'Login submitted';
            messageDiv.classList.remove('error');
            messageDiv.style.display = 'block';
            
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        });

        googleBtn.addEventListener('click', function(event) {
            event.preventDefault();
            messageDiv.textContent = 'Google authentication initiated';
            messageDiv.classList.remove('error');
            messageDiv.style.display = 'block';
        });
    </script>
</body>
</html>
```