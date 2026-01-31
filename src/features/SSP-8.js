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
            background-color: #f5f5f5;
        }
        
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        
        h2 {
            color: #333;
            margin-bottom: 30px;
        }
        
        button {
            padding: 12px 30px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        button:hover {
            background-color: #0056b3;
        }
        
        button:active {
            background-color: #004085;
        }
        
        #message {
            margin-top: 20px;
            min-height: 24px;
            color: #28a745;
            font-size: 18px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Button Interaction Test</h2>
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