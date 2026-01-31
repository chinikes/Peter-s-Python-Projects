<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Display List of Items</title>
    <style>
        body {
            background-color: red;
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        
        .container {
            max-width: 500px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 20px;
        }
        
        button:hover {
            background-color: #0056b3;
        }
        
        ul {
            list-style-type: none;
            padding: 0;
        }
        
        li {
            padding: 10px;
            background-color: #f0f0f0;
            margin-bottom: 8px;
            border-radius: 4px;
            border-left: 4px solid #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Item List</h1>
        <button id="loadButton">Load Items</button>
        <ul id="itemList"></ul>
    </div>

    <script>
        const items = ["Item 1", "Item 2", "Item 3"];
        const itemList = document.getElementById("itemList");
        const loadButton = document.getElementById("loadButton");
        let itemsLoaded = false;

        loadButton.addEventListener("click", function() {
            if (!itemsLoaded) {
                items.forEach(function(item) {
                    const li = document.createElement("li");
                    li.textContent = item;
                    itemList.appendChild(li);
                });
                itemsLoaded = true;
            }
        });
    </script>
</body>
</html>