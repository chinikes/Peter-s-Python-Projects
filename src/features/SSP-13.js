<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toggle Message Visibility</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
            max-width: 500px;
            width: 100%;
        }

        h1 {
            color: #333;
            margin-bottom: 30px;
            font-size: 28px;
            text-align: center;
        }

        .button-container {
            margin-bottom: 30px;
            text-align: center;
        }

        button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 32px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        button:active {
            transform: translateY(0);
        }

        .message {
            background: #f0f4ff;
            border-left: 4px solid #667eea;
            padding: 20px;
            border-radius: 6px;
            color: #333;
            font-size: 16px;
            line-height: 1.6;
            display: none;
            animation: slideIn 0.3s ease;
        }

        .message.visible {
            display: block;
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

        .status-indicator {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        }

        .status-indicator span {
            font-weight: 600;
            color: #667eea;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Toggle Message Visibility</h1>
        
        <div class="button-container">
            <button id="toggleButton">Show Message</button>
        </div>

        <div class="message" id="message">
            Welcome to the Toggle Message Visibility feature! This message demonstrates basic JavaScript state management and DOM manipulation. Click the button to hide this message again.
        </div>

        <div class="status-indicator">
            Status: <span id="status">Hidden</span>
        </div>
    </div>

    <script>
        // Initialize state
        let isMessageVisible = false;

        // Get DOM elements
        const toggleButton = document.getElementById('toggleButton');
        const message = document.getElementById('message');
        const statusIndicator = document.getElementById('status');

        /**
         * Toggle message visibility and update button label
         */
        function toggleMessageVisibility() {
            isMessageVisible = !isMessageVisible;
            
            // Update message visibility
            if (isMessageVisible) {
                message.classList.add('visible');
                toggleButton.textContent = 'Hide Message';
                statusIndicator.textContent = 'Visible';
            } else {
                message.classList.remove('visible');
                toggleButton.textContent = 'Show Message';
                statusIndicator.textContent = 'Hidden';
            }
        }

        // Add click event listener
        toggleButton.addEventListener('click', toggleMessageVisibility);

        // Accessibility: Allow Enter key on button
        toggleButton.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                toggleMessageVisibility();
            }
        });
    </script>
</body>
</html>