<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple JavaScript Button Interaction</title>
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
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            padding: 40px;
            max-width: 500px;
            width: 100%;
            text-align: center;
        }

        h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 28px;
        }

        .sample-text {
            color: #666;
            margin-bottom: 30px;
            font-size: 16px;
            line-height: 1.6;
        }

        .button-group {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
            justify-content: center;
        }

        button {
            padding: 12px 24px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            min-width: 120px;
        }

        .btn-primary {
            background-color: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background-color: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:active {
            transform: translateY(0);
        }

        .btn-secondary {
            background-color: #f093fb;
            color: white;
        }

        .btn-secondary:hover {
            background-color: #e074e0;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);
        }

        .btn-secondary:active {
            transform: translateY(0);
        }

        .btn-danger {
            background-color: #ff6b6b;
            color: white;
        }

        .btn-danger:hover {
            background-color: #ee5a52;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }

        .btn-danger:active {
            transform: translateY(0);
        }

        .output-section {
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            border-radius: 5px;
            text-align: left;
            min-height: 80px;
        }

        .output-label {
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
            font-size: 14px;
            text-transform: uppercase;
        }

        #output {
            color: #666;
            font-size: 16px;
            line-height: 1.5;
            word-break: break-word;
        }

        .click-counter {
            display: inline-block;
            background-color: #667eea;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            margin-top: 15px;
            font-size: 14px;
            font-weight: 600;
        }

        .fade-in {
            animation: fadeIn 0.3s ease-in;
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

        @media (max-width: 480px) {
            .container {
                padding: 20px;
            }

            h1 {
                font-size: 24px;
            }

            button {
                min-width: 100px;
                padding: 10px 20px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Button Interaction Demo</h1>
        
        <div class="sample-text">
            This is a simple demonstration of JavaScript button interactions. Click the buttons below to see various interactions and responses.
        </div>

        <div class="button-group">
            <button class="btn-primary" id="btnHello">Say Hello</button>
            <button class="btn-secondary" id="btnToggle">Toggle Theme</button>
            <button class="btn-danger" id="btnClear">Clear</button>
        </div>

        <div class="output-section">
            <div class="output-label">Output:</div>
            <div id="output">Click a button to get started...</div>
            <div class="click-counter">
                Total Clicks: <span id="clickCount">0</span>
            </div>
        </div>
    </div>

    <script>
        // State management
        const state = {
            clickCount: 0,
            isDarkTheme: false,
            lastAction: ''
        };

        // DOM elements
        const btnHello = document.getElementById('btnHello');
        const btnToggle = document.getElementById('btnToggle');
        const btnClear = document.getElementById('btnClear');
        const output = document.getElementById('output');
        const clickCount = document.getElementById('clickCount');

        // Event listeners
        btnHello.addEventListener('click', handleHelloClick);
        btnToggle.addEventListener('click', handleToggleClick);
        btnClear.addEventListener('click', handleClearClick);

        // Event handlers
        function handleHelloClick() {
            state.clickCount++;
            const timestamp = new Date().toLocaleTimeString();
            state.lastAction = `Hello! Button clicked at ${timestamp}`;
            updateOutput();
            animateButton(btnHello);
        }

        function handleToggleClick() {
            state.clickCount++;
            state.isDarkTheme = !state.isDarkTheme;
            const theme = state.isDarkTheme ? 'Dark' : 'Light';
            state.lastAction = `Theme switched to ${theme} Mode`;
            updateOutput();
            toggleTheme();
            animateButton(btnToggle);
        }

        function handleClearClick() {
            state.clickCount++;
            state.lastAction = 'Output cleared';
            output.textContent = 'Output cleared. Click a button to get started again...';
            clickCount.textContent = state.clickCount;
            animateButton(btnClear);

            setTimeout(() => {
                output.textContent = 'Click a button to get started...';
            }, 2000);
        }

        // Helper functions
        function updateOutput() {
            output.textContent = state.lastAction;
            clickCount.textContent = state.clickCount;
            output.classList.add('fade-in');

            // Remove animation class after animation completes
            setTimeout(() => {
                output.classList.remove('fade-in');
            }, 300);
        }

        function toggleTheme() {
            const container = document.querySelector('.container');
            
            if (state.isDarkTheme) {
                document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
                container.style.background = '#0f3460';
                container.style.color = '#e0e0e0';
                document.querySelectorAll('h1, .output-label').forEach(el => {
                    el.style.color = '#e0e0e0';
                });
                output.style.color = '#b0b0b0';
                document.querySelector('.sample-text').style.color = '#b0b0b0';
            } else {
                document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                container.style.background = 'white';
                container.style.color = '#333';
                document.querySelectorAll('h1, .output-label').forEach(el => {
                    el.style.color = '#333';
                });
                output.style.color = '#666';
                document.querySelector('.sample-text').style.color = '#666';
            }
        }

        function animateButton(button) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        }

        // Initialize
        console.log('Button Interaction Demo initialized');
    </script>
</body>
</html>