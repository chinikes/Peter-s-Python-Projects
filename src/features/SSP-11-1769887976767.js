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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .login-container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
        }

        .login-container h1 {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
            font-size: 28px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: bold;
            font-size: 14px;
        }

        .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
            transition: border-color 0.3s;
        }

        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }

        .login-btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .login-btn:active {
            transform: translateY(0);
        }

        .google-auth {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #ddd;
            text-align: center;
        }

        .google-auth p {
            color: #666;
            margin-bottom: 10px;
            font-size: 14px;
        }

        .google-btn {
            width: 100%;
            padding: 12px;
            background: white;
            color: #333;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: border-color 0.3s, background-color 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .google-btn:hover {
            border-color: #667eea;
            background-color: #f8f8f8;
        }

        .message {
            margin-top: 20px;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            display: none;
            font-weight: bold;
            animation: slideIn 0.3s ease;
        }

        .message.success {
            background-color: #d4edda;
            color: #155