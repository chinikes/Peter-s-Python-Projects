# Python Modules 

# What is a module? 
# Consider a module to be the same as a code library 
# A file containing a set of functions you want to include in your application 

# Create a module 
# To a create a module just save the code you want in a file with the file extension .py: 

# E.g. Save code for greeting function in mymodule.py 
# import the module mymodule, and call the greeting function
"""
import mymodule 

mymodule.greeting("Ikenna")
"""

# Variables in Module 
# The module can contain functions, but also variables of all types (arrays, dictionaries, objects etc): 

# E.g. Import the module name mymodule, and access the person1 dictionary: 
"""
import mymodule

a = mymodule.person1["age"]
print(a)
"""

# Naming a module 
# You can name the module file whatever you like, but it must have the file extension .py 

# Re-naming a module 
# You can create an alias when you import a module, by using the "as" keyword: 

# E.g. Create an alias for mymodule called mx: 
"""
import mymodule as mx

a = mx.person1["age"]
print(a)
"""

# Built-in modules 
# There are several built-in modules in Python, which you can import whenever you like 

# E.g. Import and use the platform module: 
"""
import platform 

x = platform.system()
print(x) 
"""

# Using the dir() Function
# There is a built-in function to list all the function names (or variable names) in a module. The dir() function 

# List all the defined names beloing to the platform module 
"""
import platform
import mymodule 

print (dir(mymodule))
print(dir(platform))
"""

# Import from module 
# You can choose to import only parts from a module using the "from" keyword. 

# E.g. The module name mymodule has one function and one dictionary:
# E.g. Import only the person1 dictionary from the module: 
"""
from mymodule import person1 

print(person1["age"])
""" 