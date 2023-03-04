# Python String Formatting 

# To make sure a string will display as expected, we can format the result with the format() method. 

# String format()
# The format() method allows you to format selected parts of a string. Sometimes there are parts of a text that you do not control, maybe they come from a database, or user input? 
# To control such values, add placeholders (curly brackets {}) in the text, and run the values through the format() method: 

# E.g. Add a placeholder where you want to display the price: 
"""
price = 49 
txt = "The price is {} dollars" 

print(txt.format(price))
"""

# You can add parameters inside the curly brackets to specify how to convert the value: 

# E.g. Format the price to be displayed as a number with 2 decimals: 
"""
price = 49 
txt = "The price is {:.2f} dollars" 

print(txt.format(price))
"""

# Multiple values 
# E.g. If you want to use more values, just add more values to the format() method and add more placeholders: 
"""
quantity = 3
itemno = 567
price = 49 
myorder = "I want {} pieces of item number {} for {:.2f} dollars" 

print(myorder.format(quantity,itemno,price))
"""

# Index numbers 
# E.g. You can use index numbers (a number inside the curly brackets {0}) to be sure the values are placed in the correct placeholder: 
"""
quantity = 3
itemno = 567
price = 49 
myorder = "I want {0} pieces of item number {1} for {2:.2f} dollars" 

print(myorder.format(quantity,itemno,price))
"""

# Also, if you want to refer to the same value more than once, use the index number
"""
name = "Ikenna" 
age = 36

print("His name is {1}. {1} is {0} years old".format(age,name))
"""

# Named indexes 
# E.g. You can use named indexes by entering a name inside the curly brackets {carname}, but then you must use names when pass the parameter values: 
"""
myorder = "I have a {carname}, it is a {model}." 

print(myorder.format(carname = "Ford", model = "Mustang"))
"""
