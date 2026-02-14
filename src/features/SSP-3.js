```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Button Interaction</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            text-align: center;
            min-width: 300px;
        }

        h1 {
            font-size: 28px;
            color: #333;
            margin-bottom: 30px;
            font-weight: 600;
        }

        button {
            background-color: #667eea;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.1s ease;
            font-weight: 500;
        }

        button:hover {
            background-color: #5568d3;
        }

        button:active {
            transform: scale(0.98);
        }

        button:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
        }

        #message {
            margin-top: 20px;
            font-size: 24px;
            color: #764ba2;
            font-weight: 600;
            min-height: 32px;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>JavaScript Button Interaction</h1>
        <button id="clickButton">Click me</button>
        <div id="message"></div>
    </div>

    <script>
        document.getElementById('clickButton').addEventListener('click', function() {
            document.getElementById('message').textContent = 'Hello, world!';
        });
    </script>
</body>
</html>
```