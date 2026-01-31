```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Button Interaction</title>
    <style>
        button {
            background-color: purple;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        
        button:hover {
            background-color: darkviolet;
        }
        
        #message {
            margin-top: 20px;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <button id="clickButton">Click me</button>
    <div id="message"></div>
    
    <script>
        document.getElementById('clickButton').addEventListener('click', function() {
            document.getElementById('message').textContent = 'Hello, world!';
        });
    </script>
</body>
</html>
```