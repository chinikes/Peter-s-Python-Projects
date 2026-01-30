```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Button Interaction Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            text-align: center;
        }

        h1 {
            color: #333;
            margin: 0 0 30px 0;
            font-size: 28px;
        }

        button {
            background-color: #667eea;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #764ba2;
        }

        button:active {
            transform: scale(0.98);
        }

        #message {
            margin-top: 30px;
            font-size: 24px;
            color: #667eea;
            font-weight: bold;
            min-height: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Button Interaction Test</h1>
        <button id="clickButton">Click me</button>
        <div id="message"></div>
    </div>

    <script>
        const clickButton = document.getElementById('clickButton');
        const messageDiv = document.getElementById('message');

        clickButton.addEventListener('click', function() {
            messageDiv.textContent = 'Hello, world!';
        });
    </script>
</body>
</html>
```