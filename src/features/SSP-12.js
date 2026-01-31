```html
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            padding: 40px;
            width: 100%;
            max-width: 400px;
        }

        h1 {
            font-size: 28px;
            color: #333;
            margin-bottom: 30px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #555;
            margin-bottom: 8px;
        }

        input[type="email"] {
            width: 100%;
            padding: 12px 14px;
            font-size: 16px;
            border: 2px solid #e0e0e0;
            border-radius: 4px;
            transition: border-color 0.3s ease;
            font-family: inherit;
        }

        input[type="email"]:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        input[type="email"]::placeholder {
            color: #999;
        }

        button {
            width: 100%;
            padding: 12px 20px;
            font-size: 16px;
            font-weight: 600;
            color: white;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            font-family: inherit;
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        button:active {
            transform: translateY(0);
        }

        .message {
            margin-top: 20px;
            padding: 12px 16px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            display: none;
            animation: slideIn 0.3s ease;
        }

        .message.show {
            display: block;
        }

        .message.error {
            background-color: #fee;
            color: #c33;
            border: 1px solid #fcc;
        }

        .message.success {
            background-color: #efe;
            color: #3c3;
            border: 1px solid #cfc;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 30px 20px;
            }

            h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Email Validation</h1>
        <form id="emailForm">
            <div class="form-group">
                <label for="emailInput">Email Address</label>
                <input
                    type="email"
                    id="emailInput"
                    name="email"
                    placeholder="Enter your email address"
                    autocomplete="email"
                >
            </div>
            <button type="submit">Submit</button>
            <div id="message" class="message"></div>
        </form>
    </div>

    <script>
        const emailForm = document.getElementById('emailForm');
        const emailInput = document.getElementById('emailInput');
        const messageElement = document.getElementById('message');

        emailForm.addEventListener('submit', function(event) {
            event.preventDefault();
            validateEmail();
        });

        function validateEmail() {
            const email = emailInput.value.trim();

            messageElement.classList.remove('show', 'error', 'success');

            if (email === '') {
                displayMessage('Please enter an email address', 'error');
            } else {
                displayMessage('Email submitted successfully', 'success');
            }
        }

        function displayMessage(text, type) {
            messageElement.textContent = text;
            messageElement.classList.add('show', type);
        }

        emailInput.addEventListener('focus', function() {
            messageElement.classList.remove('show');
        });
    </script>
</body>
</html>
```