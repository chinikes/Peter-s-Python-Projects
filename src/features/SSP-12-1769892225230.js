<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Validation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 30px;
            gap: 10px;
        }

        .mail-icon {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .mail-icon svg {
            width: 100%;
            height: 100%;
            stroke: #667eea;
            fill: none;
            stroke-width: 2;
        }

        h1 {
            font-size: 24px;
            color: #333;
            font-weight: 600;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 500;
            font-size: 14px;
        }

        input[type="email"] {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 5px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }

        input[type="email"]:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #5568d3;
        }

        button:active {
            transform: scale(0.98);
        }

        #message {
            margin-top: 20px;
            padding: 12px;
            border-radius: 5px;
            text-align: center;
            font-weight: 500;
            display: none;
        }

        #message.error {
            background-color: #ffebee;
            color: #c62828;
            border: 1px solid #ef5350;
            display: block;
        }

        #message.success {
            background-color: #e8f5e9;
            color: #2e7d32;
            border: 1px solid #66bb6a;
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="mail-icon">
                <svg viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            </div>
            <h1>Email Validation</h1>
        </div>

        <form id="emailForm">
            <div class="form-group">
                <label for="emailInput">Email Address</label>
                <input type="email" id="emailInput" placeholder="Enter your email address" required>
            </div>
            <button type="submit">Submit</button>
        </form>

        <div id="message"></div>
    </div>

    <script>
        const emailForm = document.getElementById('emailForm');
        const emailInput = document.getElementById('emailInput');
        const messageDiv = document.getElementById('message');

        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();

            messageDiv.classList.remove('error', 'success');

            if (emailInput.value.trim() === '') {
                messageDiv.textContent = 'Please enter an email address';
                messageDiv.classList.add('error');
            } else {
                messageDiv.textContent = 'Email Verified';
                messageDiv.classList.add('success');
                emailInput.value = '';
            }
        });
    </script>
</body>
</html>