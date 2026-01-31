<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Display a List of Items</title>
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
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
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

        .button-group {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
        }

        button {
            flex: 1;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        #loadButton {
            background-color: #667eea;
            color: white;
        }

        #loadButton:hover {
            background-color: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        #loadButton:active {
            transform: translateY(0);
        }

        #clearButton {
            background-color: #e74c3c;
            color: white;
        }

        #clearButton:hover {
            background-color: #c0392b;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
        }

        #clearButton:active {
            transform: translateY(0);
        }

        #itemsContainer {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 20px;
            min-height: 200px;
        }

        #itemsList {
            list-style: none;
        }

        #itemsList li {
            padding: 12px 16px;
            background-color: white;
            border: 1px solid #e9ecef;
            border-radius: 4px;
            margin-bottom: 10px;
            color: #333;
            font-size: 16px;
            transition: all 0.2s ease;
        }

        #itemsList li:last-child {
            margin-bottom: 0;
        }

        #itemsList li:hover {
            background-color: #f8f9fa;
            border-color: #667eea;
            transform: translateX(4px);
        }

        .empty-state {
            text-align: center;
            color: #999;
            font-style: italic;
            padding: 40px 20px;
        }

        .status-message {
            text-align: center;
            color: #667eea;
            font-size: 14px;
            margin-top: 15px;
            min-height: 20px;
            transition: all 0.3s ease;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📋 Item List Manager</h1>
        
        <div class="button-group">
            <button id="loadButton">Load Items</button>
            <button id="clearButton">Clear List</button>
        </div>

        <div id="itemsContainer">
            <ul id="itemsList"></ul>
            <div class="empty-state">No items loaded yet. Click "Load Items" to get started.</div>
        </div>

        <div class="status-message" id="statusMessage"></div>
    </div>

    <script>
        (function() {
            'use strict';

            // Configuration
            const ITEMS_DATA = [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
                'Item 5'
            ];

            // DOM Elements
            const loadButton = document.getElementById('loadButton');
            const clearButton = document.getElementById('clearButton');
            const itemsList = document.getElementById('itemsList');
            const itemsContainer = document.getElementById('itemsContainer');
            const statusMessage = document.getElementById('statusMessage');

            /**
             * Clears the list UI and shows empty state
             */
            function clearListUI() {
                itemsList.innerHTML = '';
                showEmptyState();
                statusMessage.textContent = '';
            }

            /**
             * Shows the empty state message
             */
            function showEmptyState() {
                const emptyState = itemsContainer.querySelector('.empty-state');
                if (emptyState) {
                    emptyState.style.display = 'block';
                }
            }

            /**
             * Hides the empty state message
             */
            function hideEmptyState() {
                const emptyState = itemsContainer.querySelector('.empty-state');
                if (emptyState) {
                    emptyState.style.display = 'none';
                }
            }

            /**
             * Renders items to the list
             * @param {string[]} items - Array of item strings to render
             */
            function renderItems(items) {
                if (!Array.isArray(items) || items.length === 0) {
                    return;
                }

                clearListUI();
                hideEmptyState();

                items.forEach((item, index) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item;
                    listItem.setAttribute('data-index', index);
                    itemsList.appendChild(listItem);
                });

                statusMessage.textContent = `✓ Loaded ${items.length} item(s)`;
            }

            /**
             * Loads and displays the predefined items list
             */
            function loadItems() {
                renderItems(ITEMS_DATA);
            }

            /**
             * Clears the items list
             */
            function clearItems() {
                clearListUI();
                statusMessage.textContent = '✓ List cleared';
            }

            /**
             * Initializes event listeners
             */
            function initEventListeners() {
                loadButton.addEventListener('click', loadItems);
                clearButton.addEventListener('click', clearItems);
            }

            /**
             * Initializes the application
             */
            function init() {
                initEventListeners();
            }

            // Start the application when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
            } else {
                init();
            }
        })();
    </script>
</body>
</html>