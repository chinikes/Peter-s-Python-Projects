# Python JSON 

# JSON is a syntax for storing and exchanging data. 
# JSON is a text, written with JavaScript object notation. 

# JSON in Python 
# Python has a built-in package called json, which can be worked with JSON data. 

# Parse JSON - Convert from JSON to Python 
# If you have a JSON string, you can parse it by using the json.loads() method. 

# E.g. Convert from JSON to Python: 
"""
import json

# some JSON: 
x = '{ "name":"John", "age":30, "city":"New York" }'

# parse x: 
y = json.loads(x)

# the result is a Python dictionary 
print(y["age"])
"""

# Convert from Python to JSON 
# If you have a Python object, you can convert it into a JSON string by using the json.dumps() method. 

# E.g. Convert from Python to JSON: 
"""
import json 

# a Python object (dict): 

x = {
    "name": "John", 
    "age": 30, 
    "city": "New York"
}

# convert into JSON: 

y = json.dumps(x)

# the result is a JSON string 
print(x)
print(y)
"""

# E.g. Convert Python objects into JSON strings, and print the values: 
"""
import json 

print(json.dumps({"name":"John","age":30}))
print(json.dumps(["apple", "bananas"]))
print(json.dumps(("apple", "bananas")))
print(json.dumps("hello"))
print(json.dumps(42))
print(json.dumps(31.76))
print(json.dumps(True))
print(json.dumps(False))
print(json.dumps(None))
"""

# E.g. Convert a Python object containing all the legal data types: 
"""
import json 

x = {
    "name": "John", 
    "age": 30, 
    "married": True, 
    "divorced": False, 
    "children": ("Ann", "Billy"), 
    "pets": None, 
    "cars": [
        {"model": "BMW 230", "mpg": 27.5},
        {"model": "Ford Edge", "mpg": 24.1}
    ]

}

# print(json.dumps(x)) 

# Format the result 
# E.g. Use the indent parameter to define the numbers of indents: 

# print(json.dumps(x, indent=4)) 

# E.g. Use the seperators parameter to change the default separator: 
# print(json.dumps(x, indent=4, separators=(". ", " = ")))

# Order the Result 
# The json.dumps() method has parameters to order the keys in the result: 

# E.g. Use the sort_keys parameter to specify if the result should be sorted or not: 

print(json.dumps(x, indent=4, sort_keys=True))
"""